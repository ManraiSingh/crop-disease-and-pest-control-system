import { cropArt, cropAccent } from '../../lib/cropArt.js'
import Icon from '../../lib/icons.jsx'
import { PANEL_SHADOW, panel } from '../surface.js'
import SectionTitle from './SectionTitle.jsx'

const TONES = {
  good: { dot: '#a3e635', icon: 'checkCircle' },
  bad: { dot: '#f26d6d', icon: 'warning' },
  next: { dot: '#7fd1e0', icon: 'arrowRight' },
}

/**
 * A block of crop suggestions. Each row leads with the crop's own picture and colour,
 * so the list can be skimmed by looking rather than read line by line.
 */
export default function CompanionList({ title, hint, items, tone = 'good' }) {
  const style = TONES[tone] ?? TONES.good

  return (
    <section className="mb-8">
      <SectionTitle accent={style.dot} sub={hint}>
        {title}
      </SectionTitle>

      <div className="flex flex-col gap-2.5">
        {items.map((item) => (
          <div
            key={item.name}
            style={panel()}
            className={`flex items-center gap-3.5 rounded-[24px] border border-solid p-4 ${PANEL_SHADOW}`}
          >
            <span
              className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-2xl text-[28px]"
              style={{
                background: item.key
                  ? `${cropAccent(item.key)}26`
                  : 'rgba(255,255,255,0.08)',
              }}
            >
              {item.key ? (
                <span aria-hidden="true">{cropArt(item.key)}</span>
              ) : (
                <Icon name={style.icon} className="h-6 w-6" style={{ color: style.dot }} />
              )}
            </span>

            <div className="min-w-0">
              <p className="text-[16.5px] leading-tight font-semibold text-white">{item.name}</p>
              <p className="mt-1 text-[12px] leading-snug text-white/60">{item.why}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
