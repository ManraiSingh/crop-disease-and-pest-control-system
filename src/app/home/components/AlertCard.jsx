import { Link } from 'react-router-dom'
import { GLASS_SHEEN } from '../../lib/glass.js'
import { GlassCard, SectionHeader } from '../../lib/glass.jsx'
import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'

/** Mock alert — this is what a real disease-detection result would populate. */
export default function AlertCard() {
  const t = useT()

  return (
    <GlassCard className="p-4">
      <SectionHeader
        title={t('home.attention')}
        className="mb-3"
        right={
          <span className="flex items-center gap-1 text-[11px] font-semibold text-lime-300">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-300 shadow-[0_0_8px_rgba(163,230,53,0.9)]" />
            {t('common.live')}
          </span>
        }
      />

      {/* Red, not amber: this is a confirmed disease detection, the one thing on Home that
          should read as an alarm rather than a warning. */}
      <div className="relative overflow-hidden rounded-2xl border border-solid border-red-300/30 bg-[linear-gradient(115deg,rgba(206,54,48,0.78),rgba(146,24,28,0.7))] p-3.5 backdrop-blur-md">
        <span aria-hidden="true" className={GLASS_SHEEN} />

        <div className="relative flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-solid border-white/25 bg-white/20 text-white backdrop-blur-md">
            <Icon name="shield" className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold tracking-wide text-white/70 uppercase">{t('home.diseaseDetected')}</p>
            <p className="text-sm font-bold text-white">{t('home.diseaseName')}</p>
            <p className="text-[11px] text-white/70">{t('crops.tomato')} · North Field</p>
          </div>
          <span className="shrink-0 rounded-full border border-solid border-white/25 bg-white/20 px-2.5 py-1 text-[10px] font-bold text-white">
            {t('common.medium')}
          </span>
        </div>

        <div className="relative mt-3">
          <p className="text-[11px] text-white/75">
            <span className="font-bold text-white">18%</span> {t('home.fieldAffected')}
          </p>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/25">
            <div className="h-full w-[18%] rounded-full bg-white/90" />
          </div>
        </div>

        <Link to="/advisory" className="relative mt-3 flex items-center gap-0.5 text-xs font-bold text-white">
          {t('home.viewTreatment')}
          <Icon name="chevronRight" className="h-3 w-3" />
        </Link>
      </div>
    </GlassCard>
  )
}
