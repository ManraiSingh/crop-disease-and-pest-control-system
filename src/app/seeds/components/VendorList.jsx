import { useT } from '../../../i18n/context.js'
import Icon from '../../lib/icons.jsx'
import { directionsUrl } from '../vendors.js'

/** 19 → "7", 8 → "8". The suffix comes from the locale string. */
function clockHour(hour) {
  return String(hour % 12 || 12)
}

/**
 * "Available near you" — the local-results block, the part of a search that answers
 * *where do I actually go*.
 *
 * Each row carries the four things that decide whether a farmer sets off: how far, how
 * well rated, whether it is open right now, and whether this pack is on the shelf.
 * Directions hand off to Google Maps, so the farmer lands on the real shop rather than
 * on a pin we invented.
 */
export default function VendorList({ vendors }) {
  const t = useT()

  if (!vendors.length) return null

  return (
    <ul className="m-0 list-none p-0">
      {vendors.map((vendor) => {
        const name = t(`market.dealers.${vendor.id}`, { taluka: vendor.taluka })

        return (
          <li key={vendor.id} className="mk-line-top flex items-center gap-3 py-3 first:border-t-0">
            <span
              aria-hidden="true"
              className="mk-inset flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            >
              <Icon name="store" className="mk-accent-text h-[19px] w-[19px]" />
            </span>

            <div className="min-w-0 flex-1">
              <p className="mk-t1 truncate text-[14px] font-semibold">{name}</p>

              <p className="mk-t2 mt-1 flex items-center gap-1 truncate text-[11.5px] whitespace-nowrap">
                <Icon name="star" className="mk-accent-text h-3 w-3 shrink-0" />
                {vendor.rating.toFixed(1)}
                <span className="mk-t3">({vendor.reviews})</span>
                <span className="mk-t3">·</span>
                <span className="truncate">{t(`market.kinds.${vendor.kind}`)}</span>
              </p>

              <p className="mt-0.5 truncate text-[11.5px] whitespace-nowrap">
                <span className="mk-t2">{t('market.away', { km: vendor.distanceKm.toFixed(1) })}</span>
                <span className="mk-t3"> · </span>
                {vendor.open ? (
                  <>
                    <span className="mk-open-dot font-semibold">{t('market.openNow')}</span>
                    <span className="mk-t2">
                      {' '}
                      · {t('market.closesAt', { hour: clockHour(vendor.closes) })}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="mk-shut-text font-semibold">{t('market.closed')}</span>
                    <span className="mk-t2">
                      {' '}
                      · {t('market.opensAt', { hour: clockHour(vendor.opens) })}
                    </span>
                  </>
                )}
              </p>

              <p
                className={`mt-0.5 truncate text-[11.5px] font-semibold whitespace-nowrap ${
                  vendor.inStock ? 'mk-open-dot' : 'mk-t3'
                }`}
              >
                {vendor.inStock ? t('market.inStock') : t('market.outOfStock')}
              </p>
            </div>

            {/* Stacked so the row's text keeps the width it needs. */}
            <a
              href={directionsUrl(vendor, name)}
              target="_blank"
              rel="noreferrer"
              className="mk-btn-ghost flex w-[62px] shrink-0 flex-col items-center gap-1 rounded-2xl px-1 py-2.5 text-[10px] font-semibold no-underline"
            >
              <Icon name="navigation" className="mk-accent-text h-4 w-4" />
              {t('market.directions')}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
