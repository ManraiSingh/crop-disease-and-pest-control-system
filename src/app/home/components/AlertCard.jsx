import { Link } from 'react-router-dom'
import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'
import { motion } from 'motion/react'
import { SPRING } from '../../../design/springs.js'
import { SectionLabel } from '../../../design/Surfaces.jsx'

/** Mock alert — this is what a real disease-detection result would populate. */
const AFFECTED = 18

/**
 * The one card on Home allowed to break the green palette.
 *
 * Everything else is canopy and cream; this is rust. That contrast is the whole point — a
 * farmer scrolling past should register it without reading it. The severity bar fills on
 * arrival rather than appearing full, so the figure lands as a measurement being taken.
 */
export default function AlertCard() {
  const t = useT()

  return (
    <section className="relative">
      <SectionLabel className="mb-3 px-1">{t('home.attention')}</SectionLabel>

      <div
        className="relative overflow-hidden rounded-[26px] p-4"
        style={{
          background: 'linear-gradient(150deg, color-mix(in srgb, var(--rust) 88%, #000) 0%, color-mix(in srgb, var(--rust) 58%, #1a0d08) 100%)',
          boxShadow: '0 18px 38px -14px color-mix(in srgb, var(--rust) 55%, transparent)',
        }}
      >
        {/* slow pulse behind the shield — alive, not blinking */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 -left-8 h-36 w-36 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.22), transparent 66%)' }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative flex items-start gap-3">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px]"
            style={{ background: 'rgba(255,255,255,0.18)', color: '#fff' }}
          >
            <Icon name="shield" className="h-5 w-5" />
          </span>

          <div className="min-w-0 flex-1">
            <p
              className="text-[10px] font-bold tracking-[0.1em] uppercase"
              style={{ color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-body)' }}
            >
              {t('home.diseaseDetected')}
            </p>
            <p className="display text-[22px] leading-none" style={{ color: '#fff' }}>
              {t('home.diseaseName')}
            </p>
            <p className="mt-1 text-[11px]" style={{ color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-body)' }}>
              {t('crops.tomato')} · North Field
            </p>
          </div>

          <span
            className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold"
            style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontFamily: 'var(--font-body)' }}
          >
            {t('common.medium')}
          </span>
        </div>

        <div className="relative mt-4">
          <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-body)' }}>
            <span className="text-[15px] font-bold" style={{ color: '#fff' }}>
              {AFFECTED}%
            </span>{' '}
            {t('home.fieldAffected')}
          </p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full" style={{ background: 'rgba(0,0,0,0.28)' }}>
            {/* scaleX rather than width: percentage widths do not resolve reliably
                under a spring, and a transform stays on the compositor. */}
            <motion.div
              className="h-full w-full origin-left rounded-full"
              style={{ background: 'rgba(255,255,255,0.95)' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: AFFECTED / 100 }}
              viewport={{ once: true }}
              transition={{ ...SPRING.settle, delay: 0.25 }}
            />
          </div>
        </div>

        <Link
          to="/advisory"
          className="relative mt-4 inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-xs font-bold"
          style={{ background: '#fff', color: 'color-mix(in srgb, var(--rust) 80%, #000)', fontFamily: 'var(--font-body)' }}
        >
          {t('home.viewTreatment')}
          <Icon name="chevronRight" className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  )
}
