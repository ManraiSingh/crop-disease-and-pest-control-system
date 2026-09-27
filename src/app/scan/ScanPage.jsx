import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { useT } from '../../i18n/context.js'
import Icon from '../lib/icons.jsx'
import { loadProfile } from '../lib/profile.js'
import { compressImage } from '../community/compressImage.js'
import { SPRING } from '../../design/springs.js'
import { LeafLens } from '../../design/Illustrations.jsx'

/**
 * Scan: photograph a leaf, get a diagnosis.
 *
 * Three states in one screen — empty, analysing, result — rather than three routes, so the
 * captured photo stays put underneath and only the sheet over it changes. That is what makes
 * it feel like a camera rather than a form.
 *
 * The prediction is a stand-in. `analyse()` is the single seam the real model plugs into:
 * point it at the Flask endpoint and nothing else on this screen changes. Its shape matches
 * the contract agreed with the model side — crop, disease, confidence, severity.
 */

/** Detection nodes drawn over the leaf, the way a model marks what it looked at. */
const NODES = [
  { x: 30, y: 34, d: 0 },
  { x: 62, y: 26, d: 0.4 },
  { x: 48, y: 56, d: 0.8 },
  { x: 72, y: 62, d: 1.2 },
  { x: 24, y: 66, d: 1.6 },
]

/**
 * Stand-in for the model.
 * TODO: replace the timeout with POST {VITE_API_BASE_URL}/api/scan (multipart image).
 * Keep the returned shape — the screen below reads exactly these fields.
 */
function analyse() {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve({ disease: 'home.diseaseName', confidence: 0.92, severity: 'common.medium', healthy: false }),
      2200,
    ),
  )
}

export default function ScanPage() {
  const t = useT()
  const navigate = useNavigate()
  const profile = loadProfile()
  const fileInput = useRef(null)

  const [photo, setPhoto] = useState(null)
  const [stage, setStage] = useState('empty') // empty | analysing | result
  const [result, setResult] = useState(null)

  async function handlePick(event) {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      // Same compressor the community composer uses — a 12MP phone photo over rural
      // data is the difference between a two-second scan and a failed one.
      const dataUrl = await compressImage(file)
      setPhoto(dataUrl)
      setStage('analysing')
      setResult(await analyse())
      setStage('result')
    } catch {
      setStage('empty')
    } finally {
      if (fileInput.current) fileInput.current.value = ''
    }
  }

  function reset() {
    setPhoto(null)
    setResult(null)
    setStage('empty')
  }

  const cropName = profile?.crop ? t(`crops.${profile.crop}`) : t('crops.tomato')

  return (
    <div className="flex h-full flex-col overflow-hidden px-3 pb-4">
      {/* ---------- VIEWPORT ---------- */}
      <div
        className="relative flex-1 overflow-hidden rounded-[30px]"
        style={{ background: 'var(--pitch)' }}
      >
        {photo ? (
          <img src={photo} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
            <LeafLens className="h-32 w-32" />
            <p className="t-display text-[22px]" style={{ color: 'var(--on-pitch)' }}>
              {t('scan.title')}
            </p>
            <p className="text-[13px]" style={{ color: 'var(--on-pitch-mid)' }}>
              {t('scan.tip')}
            </p>
          </div>
        )}

        {/* reticle corners */}
        <div className="pointer-events-none absolute inset-6">
          <span className="reticle reticle-tl" />
          <span className="reticle reticle-tr" />
          <span className="reticle reticle-bl" />
          <span className="reticle reticle-br" />
        </div>

        {/* sweep + nodes, only while the model is thinking */}
        <AnimatePresence>
          {stage === 'analysing' && (
            <>
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 h-24"
                style={{
                  background:
                    'linear-gradient(180deg, transparent, color-mix(in srgb, var(--lime) 38%, transparent), transparent)',
                }}
                initial={{ top: '8%', opacity: 0 }}
                animate={{ top: ['8%', '72%', '8%'], opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ top: { duration: 2, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.2 } }}
              />

              {NODES.map((n) => (
                <motion.span
                  key={`${n.x}-${n.y}`}
                  aria-hidden="true"
                  className="pointer-events-none absolute h-2.5 w-2.5 rounded-full"
                  style={{ left: `${n.x}%`, top: `${n.y}%`, background: 'var(--lime)' }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.75] }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 1.4, delay: n.d, repeat: Infinity, repeatDelay: 0.6 }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* ---------- RESULT SHEET ---------- */}
        <AnimatePresence>
          {stage === 'result' && result && (
            <motion.div
              className="absolute inset-x-0 bottom-0 rounded-[26px] p-4"
              style={{ background: 'var(--pitch)', borderTop: '1px solid var(--on-pitch-line)' }}
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              exit={{ y: '110%' }}
              transition={SPRING.settle}
            >
              <p
                className="t-label text-[11px] uppercase"
                style={{ color: 'var(--on-pitch-soft)', letterSpacing: '0.1em' }}
              >
                {t('home.diseaseDetected')}
              </p>

              <div className="mt-0.5 flex items-end justify-between gap-3">
                <h2 className="t-display text-[27px]" style={{ color: 'var(--on-pitch)' }}>
                  {t(result.disease)}
                </h2>
                <span
                  className="t-label shrink-0 rounded-full px-2.5 py-1 text-[11px]"
                  style={{ background: 'var(--on-pitch-line)', color: 'var(--on-pitch)' }}
                >
                  {t(result.severity)}
                </span>
              </div>

              <p className="mt-1 text-[12px]" style={{ color: 'var(--on-pitch-mid)' }}>
                {cropName} · {t('scan.confidence')} {Math.round(result.confidence * 100)}%
              </p>

              {/* confidence bar — scaleX, so it cannot mis-resolve against a percentage width */}
              <div className="mt-3 h-1.5 overflow-hidden rounded-full" style={{ background: 'var(--on-pitch-line)' }}>
                <motion.div
                  className="h-full w-full origin-left rounded-full"
                  style={{ background: 'var(--lime)' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: result.confidence }}
                  transition={{ ...SPRING.settle, delay: 0.2 }}
                />
              </div>

              <div className="mt-4 flex items-center gap-2">
                <motion.button
                  type="button"
                  onClick={() => navigate('/advisory')}
                  whileTap={{ scale: 0.95 }}
                  transition={SPRING.snap}
                  className="t-title flex-1 rounded-full py-3 text-[14px]"
                  style={{ background: 'var(--lime)', color: 'var(--pitch)', border: 0 }}
                >
                  {t('scan.treat')}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={reset}
                  whileTap={{ scale: 0.95 }}
                  transition={SPRING.snap}
                  aria-label={t('scan.again')}
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: 'var(--on-pitch-line)', color: 'var(--on-pitch)', border: 0 }}
                >
                  <Icon name="scan" className="h-5 w-5" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* analysing caption */}
        {stage === 'analysing' && (
          <div className="absolute inset-x-0 bottom-6 text-center">
            <motion.p
              className="t-label text-[14px]"
              style={{ color: 'var(--on-pitch)' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              {t('scan.analysing')}
            </motion.p>
          </div>
        )}
      </div>

      {/* ---------- CAPTURE BAR ---------- */}
      {stage === 'empty' && (
        <div className="enter-rise mt-3 flex items-center gap-2">
          <motion.button
            type="button"
            onClick={() => fileInput.current?.click()}
            whileTap={{ scale: 0.96 }}
            transition={SPRING.snap}
            className="t-title flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 text-[15px]"
            style={{ background: 'var(--lime)', color: 'var(--pitch)', border: 0 }}
          >
            <Icon name="camera" className="h-[18px] w-[18px]" />
            {t('scan.capture')}
          </motion.button>

          <motion.button
            type="button"
            onClick={() => fileInput.current?.click()}
            whileTap={{ scale: 0.94 }}
            transition={SPRING.snap}
            aria-label={t('scan.choose')}
            className="flex h-[52px] w-[52px] items-center justify-center rounded-full"
            style={{ background: 'var(--paper-dim)', color: 'var(--ink)', border: '1px solid var(--paper-edge)' }}
          >
            <Icon name="field" className="h-5 w-5" />
          </motion.button>
        </div>
      )}

      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handlePick}
        className="hidden"
      />
    </div>
  )
}
