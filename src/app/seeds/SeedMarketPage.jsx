import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useT } from '../../i18n/context.js'
import { cropAccent, cropArt } from '../lib/cropArt.js'
import Icon from '../lib/icons.jsx'
import { loadProfile } from '../lib/profile.js'
import SeedSheet from './SeedSheet.jsx'
import { SEEDS, formatRupees, seedsFor } from './seedCatalogue.js'
import { stockedCount } from './vendors.js'

/** Crops on the shelf, in catalogue order, so the filter row never shows an empty tab. */
const CROPS = [...new Set(SEEDS.map((seed) => seed.crop))]

/**
 * The seed market.
 *
 * Deliberately the one screen in the app that does not look like the app: its own warm
 * ground and saffron accent (app/seeds/market.css) rather than the olive glass, because
 * buying is a different activity from checking a field and should feel like one.
 *
 * The shelf is ordered by what the farmer grows, and every pack says how many dealers
 * near their taluka have it today — that, not the catalogue, is what makes it a market.
 */
export default function SeedMarketPage() {
  const t = useT()
  const navigate = useNavigate()

  // Read once: loadProfile parses localStorage afresh on every call, and a new object
  // each render would defeat the memo below.
  const profile = useMemo(() => loadProfile(), [])
  const mine = useMemo(
    () => profile?.crops ?? (profile?.crop ? [profile.crop] : []),
    [profile],
  )

  const [query, setQuery] = useState('')
  const [crop, setCrop] = useState('mine')
  const [selected, setSelected] = useState(null)

  const place = [profile?.taluka, profile?.district].filter(Boolean).join(', ')

  const seeds = useMemo(() => {
    const ordered = seedsFor(profile)
    const text = query.trim().toLowerCase()

    return ordered.filter((seed) => {
      if (crop === 'mine' && mine.length && !mine.includes(seed.crop)) return false
      if (crop !== 'mine' && crop !== 'all' && seed.crop !== crop) return false
      if (!text) return true
      return (
        seed.variety.toLowerCase().includes(text) ||
        t(`crops.${seed.crop}`).toLowerCase().includes(text)
      )
    })
    // `t` changes identity on every language switch, which is exactly when the
    // crop-name search has to be redone.
  }, [profile, query, crop, mine, t])

  /* "Your crops" only means something if we know what they grow. */
  const filters = mine.length ? ['mine', 'all', ...CROPS] : ['all', ...CROPS]

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-4 pt-3 pb-8">
        {/* MASTHEAD */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="mk-title">{t('market.title')}</h1>
            <p className="mk-t2 mt-1.5 flex items-center gap-1.5 text-[12px]">
              <Icon name="pin" className="mk-accent-text h-3.5 w-3.5 shrink-0" />
              {place ? t('market.serving', { place }) : t('market.servingUnknown')}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/home')}
            aria-label={t('common.back')}
            className="mk-btn-ghost flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          >
            <Icon name="x" className="h-4 w-4" />
          </button>
        </div>

        {/* SEARCH */}
        <label className="mk-search mt-4 flex items-center gap-2.5 rounded-2xl px-3.5 py-3">
          <Icon name="search" className="mk-t3 h-4 w-4 shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('market.searchPlaceholder')}
            className="mk-t1 min-w-0 flex-1 border-0 bg-transparent text-[13.5px] outline-none"
          />
        </label>

        {/* CROP FILTER */}
        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1">
          {filters.map((key) => (
            <button
              key={key}
              type="button"
              data-on={crop === key}
              onClick={() => setCrop(key)}
              className="mk-chip shrink-0 rounded-full px-3.5 py-2 text-[12px] font-semibold"
            >
              {key === 'mine'
                ? t('market.yourCrops')
                : key === 'all'
                  ? t('market.allSeeds')
                  : t(`crops.${key}`)}
            </button>
          ))}
        </div>

        {/* SHELF */}
        {seeds.length === 0 ? (
          <p className="mk-t2 mt-10 text-center text-[13px]">{t('market.nothingFound')}</p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {seeds.map((seed) => {
              const stocked = stockedCount(seed, profile)

              return (
                <button
                  key={seed.id}
                  type="button"
                  onClick={() => setSelected(seed)}
                  className="mk-card flex flex-col rounded-2xl p-3 text-left"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-[86px] w-full items-center justify-center rounded-xl text-[38px]"
                    style={{ background: `${cropAccent(seed.crop)}26` }}
                  >
                    {cropArt(seed.crop)}
                  </span>

                  <span className="mk-t1 mt-2.5 line-clamp-1 text-[13.5px] font-semibold">
                    {seed.variety}
                  </span>
                  <span className="mk-t3 mt-0.5 text-[10.5px]">
                    {t(`crops.${seed.crop}`)} · {t(`seeds.packs.${seed.id}`)}
                  </span>

                  <span className="mt-2 flex items-baseline gap-1.5">
                    <span className="mk-t1 text-[15.5px] font-semibold">
                      {formatRupees(seed.price)}
                    </span>
                    <span className="mk-strike text-[10.5px]">{formatRupees(seed.mrp)}</span>
                  </span>

                  <span className="mk-t2 mt-1.5 flex items-center gap-1 text-[10px]">
                    <Icon name="star" className="mk-accent-text h-2.5 w-2.5" />
                    {seed.rating}
                    <span className="mk-t3">({seed.reviews})</span>
                  </span>

                  <span className="mk-t3 mt-2 flex items-center gap-1 text-[10px] font-semibold">
                    <Icon name="store" className="h-3 w-3" />
                    {stocked > 0
                      ? t('market.dealersHaveIt', { n: String(stocked) })
                      : t('market.deliveryOnly')}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      <SeedSheet
        key={selected?.id}
        seed={selected}
        profile={profile}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}
