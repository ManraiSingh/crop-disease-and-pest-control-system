import Icon from '../../lib/icons.jsx'
import MonthTrack from './MonthTrack.jsx'
import RangeMeter from './RangeMeter.jsx'

/**
 * The crop's growing conditions as one continuous list rather than a stack of cards:
 * a colour-coded circle, the figure, and a small chart of where that figure sits.
 *
 * Hairline dividers instead of card borders is what keeps five rows of dense data
 * calm — boxing each one drew a border around every value and made the page shout.
 */
export default function FactList({ facts }) {
  return (
    <div className="flex flex-col">
      {facts.map((fact, index) => (
        <div
          key={fact.label}
          className={`flex items-center gap-4 py-[18px] ${
            index > 0 ? 'border-t border-solid border-white/[0.07]' : ''
          }`}
        >
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
            style={{ background: `${fact.accent}26` }}
          >
            <Icon name={fact.icon} className="h-5 w-5" style={{ color: fact.accent }} />
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-[10.5px] font-medium tracking-[0.02em] text-white/40">
              {fact.label}
            </p>
            <p className="mt-1 text-[17.5px] leading-tight font-semibold text-white">
              {fact.value}
            </p>
            {/* Some notes run long; two lines keeps every row the same height. */}
            {fact.note && (
              <p className="mt-1.5 line-clamp-2 text-[10.5px] leading-relaxed text-white/40">
                {fact.note}
              </p>
            )}
          </div>

          {fact.months ? (
            <MonthTrack months={fact.months} accent={fact.accent} />
          ) : (
            fact.range && (
              <RangeMeter
                range={fact.range}
                scale={fact.scale}
                accent={fact.accent}
                format={fact.format}
              />
            )
          )}
        </div>
      ))}
    </div>
  )
}
