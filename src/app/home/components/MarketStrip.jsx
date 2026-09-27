import { useNavigate } from 'react-router-dom'
import { useT } from '../../../i18n/context.js'
import { cropAccent, cropArt } from '../../lib/cropArt.js'
import Icon from '../../lib/icons.jsx'
import { formatRupees, seedsFor } from '../../seeds/seedCatalogue.js'
import { stockedCount } from '../../seeds/vendors.js'

/**
 * The way into the seed market from Home.
 *
 * It wears the market's colours, not the app's, so it reads as a door into somewhere
 * else rather than as one more status card in the stack. Three packs — the farmer's own
 * crops first — are enough of a window; the rest is a tap away.
 */
export default function MarketStrip({ profile }) {
  const t = useT()
  const navigate = useNavigate()

  const seeds = seedsFor(profile).slice(0, 3)
  const place = profile?.taluka || profile?.district

  return (
    <section className="mk-page overflow-hidden rounded-3xl">
      <div className="flex items-start justify-between gap-3 px-4 pt-4">
        <div className="min-w-0">
          <p className="mk-accent-text flex items-center gap-1.5 text-[10.5px] font-bold tracking-[0.14em] uppercase">
            <Icon name="store" className="h-3.5 w-3.5" />
            {t('market.eyebrow')}
          </p>
          <h2 className="mk-t1 mt-1.5 text-[21px] leading-tight font-semibold">
            {t('market.stripTitle')}
          </h2>
          <p className="mk-t2 mt-1 text-[11.5px]">
            {place ? t('market.stripSub', { place }) : t('market.stripSubUnknown')}
          </p>
        </div>
      </div>

      <div className="mt-3.5 flex gap-2.5 overflow-x-auto px-4 pb-1">
        {seeds.map((seed) => {
          const stocked = stockedCount(seed, profile)

          return (
            <button
              key={seed.id}
              type="button"
              onClick={() => navigate('/seeds')}
              className="mk-card flex w-[132px] shrink-0 flex-col rounded-2xl p-2.5 text-left"
            >
              <span
                aria-hidden="true"
                className="flex h-[62px] w-full items-center justify-center rounded-xl text-[28px]"
                style={{ background: `${cropAccent(seed.crop)}26` }}
              >
                {cropArt(seed.crop)}
              </span>

              <span className="mk-t1 mt-2 line-clamp-1 text-[12.5px] font-semibold">
                {seed.variety}
              </span>
              <span className="mk-t1 mt-1 text-[13.5px] font-semibold">
                {formatRupees(seed.price)}
              </span>
              <span className="mk-t3 mt-1 flex items-center gap-1 text-[9.5px] font-semibold">
                <Icon name="store" className="h-2.5 w-2.5" />
                {stocked > 0
                  ? t('market.dealersHaveIt', { n: String(stocked) })
                  : t('market.deliveryOnly')}
              </span>
            </button>
          )
        })}
      </div>

      <div className="px-4 pt-3 pb-4">
        <button
          type="button"
          onClick={() => navigate('/seeds')}
          className="mk-btn flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-[13px] font-bold"
        >
          {t('market.browse')}
          <Icon name="arrowRight" className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}
