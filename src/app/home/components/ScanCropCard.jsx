import { useNavigate } from 'react-router-dom'
import { SCAN_CARD_BACKGROUND } from '../../lib/glass.js'
import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'
import { motion } from 'motion/react'
import { Breathe, Pressable } from '../../../design/motion.jsx'
import { SPRING } from '../../../design/springs.js'

/**
 * The primary call to action, and the one card allowed to be loud.
 *
 * Structure follows the shape language rather than a photo wash: a bone panel notched into
 * the green ground, display type across it, and the field photograph cropped to an orb that
 * breaks the panel's right edge. The photo becomes an object on the card instead of a
 * background behind the text, so the copy never has to fight it for contrast — which also
 * means it needs no separate light/dark treatment.
 */
export default function ScanCropCard() {
  const navigate = useNavigate()
  const t = useT()

  return (
    <Pressable
      as="button"
      type="button"
      onClick={() => navigate('/scan')}
      scale={0.975}
      className="relative block w-full overflow-visible rounded-[30px] rounded-tr-none p-5 pr-[38%] text-left"
      style={{ background: 'var(--bone-50)', boxShadow: 'var(--lift-md)' }}
    >
      {/* the corner that cuts back into the ground */}
      <span aria-hidden="true" className="notch-tr" style={{ '--notch-fill': 'var(--bone-50)' }} />

      <span
        className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.1em] uppercase"
        style={{
          background: 'color-mix(in srgb, var(--sprout-500) 20%, transparent)',
          color: 'var(--canopy-600)',
          fontFamily: 'var(--font-body)',
        }}
      >
        <Icon name="scan" className="h-3.5 w-3.5" />
        {t('home.scannerBadge')}
      </span>

      <span
        className="display mt-3 block text-[30px]"
        style={{ color: 'var(--ink-900)' }}
      >
        {t('home.scanTitle')}
      </span>

      <span
        className="mt-2 block max-w-[92%] text-[12px] leading-relaxed"
        style={{ color: 'var(--ink-500)', fontFamily: 'var(--font-body)' }}
      >
        {t('home.scanSubtitle')}
      </span>

      <Breathe className="mt-5 inline-block">
        <span
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold"
          style={{
            background: 'linear-gradient(140deg, var(--sprout-400), var(--sprout-600))',
            color: 'var(--canopy-950)',
            fontFamily: 'var(--font-body)',
            boxShadow: '0 10px 22px -6px color-mix(in srgb, var(--sprout-500) 60%, transparent)',
          }}
        >
          <Icon name="camera" className="h-[18px] w-[18px]" />
          {t('home.scanCta')}
        </span>
      </Breathe>

      {/* The field, cropped to an orb that breaks the panel edge. */}
      <motion.span
        aria-hidden="true"
        className="absolute top-1/2 right-0 block h-[152px] w-[152px] translate-x-[26%] -translate-y-1/2 rounded-full bg-cover bg-center"
        style={{
          backgroundImage: `url('${SCAN_CARD_BACKGROUND}')`,
          boxShadow: '0 18px 40px -12px rgba(6,20,10,0.5), inset 0 0 0 6px var(--bone-50)',
        }}
        initial={{ scale: 0.86, opacity: 0, rotate: -6 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ ...SPRING.settle, delay: 0.12 }}
        whileHover={{ scale: 1.04 }}
      />

      {/* a ring that echoes the orb, so it reads as a lens rather than a sticker */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-0 block h-[188px] w-[188px] translate-x-[26%] -translate-y-1/2 rounded-full"
        style={{ border: '1px dashed color-mix(in srgb, var(--canopy-500) 45%, transparent)' }}
      />
    </Pressable>
  )
}
