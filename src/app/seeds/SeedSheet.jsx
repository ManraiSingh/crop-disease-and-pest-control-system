import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useT } from '../../i18n/context.js'
import { placeOrder } from '../../shared/services/orders.js'
import { cropAccent, cropArt } from '../lib/cropArt.js'
import { useFrame } from '../lib/frame.js'
import Icon from '../lib/icons.jsx'
import { formatRupees } from './seedCatalogue.js'
import VendorList from './components/VendorList.jsx'
import { vendorsFor } from './vendors.js'

/**
 * One pack, opened.
 *
 * Two ways to get it, which is the whole point of the screen: walk into a dealer that
 * has it on the shelf today, or have it delivered cash-on-delivery. The dealer list
 * comes first because it is the faster of the two.
 *
 * Rendered through a portal into the app frame — a sheet left where it is written would
 * be pinned inside, and clipped by, the card it opened from.
 *
 * Keyed by seed id at the call site, so a different pack remounts this with a fresh
 * quantity instead of inheriting the last order's confirmation.
 */
export default function SeedSheet({ seed, profile, onClose }) {
  const t = useT()
  const frame = useFrame()
  const [quantity, setQuantity] = useState(1)
  const [status, setStatus] = useState('idle')
  const [orderId, setOrderId] = useState('')

  const vendors = useMemo(() => vendorsFor(seed, profile), [seed, profile])

  if (!seed || !frame) return null

  const total = seed.price * quantity
  const place = [profile?.taluka, profile?.district].filter(Boolean).join(', ')
  const stocked = vendors.filter((vendor) => vendor.inStock).length

  async function handlePlace() {
    setStatus('placing')
    const id = await placeOrder({ seed, quantity, profile })
    if (id) {
      setOrderId(String(id).slice(-6).toUpperCase())
      setStatus('placed')
    } else {
      setStatus('failed')
    }
  }

  return createPortal(
    <>
      <button
        type="button"
        aria-label={t('seeds.close')}
        onClick={onClose}
        className="mk-scrim absolute inset-0 z-40 border-0 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        className="mk-sheet absolute inset-x-0 bottom-0 z-50 flex max-h-[88%] flex-col rounded-t-[26px]"
      >
        <span
          aria-hidden="true"
          className="mx-auto mt-3 mb-1 block h-1 w-10 shrink-0 rounded-full"
          style={{ background: 'var(--mk-line)' }}
        />

        {status === 'placed' ? (
          <div className="px-5 pt-4 pb-7 text-center">
            <span
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: 'var(--mk-accent-soft)' }}
            >
              <Icon name="checkCircle" className="mk-accent-text h-7 w-7" />
            </span>
            <p className="mk-t1 mt-3 text-[18px] font-semibold">{t('seeds.placedTitle')}</p>
            <p className="mk-t2 mt-1.5 text-[12.5px] leading-relaxed">
              {t('seeds.placedBody', { id: orderId, place: place || '—' })}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mk-btn mt-5 w-full rounded-2xl py-3.5 text-sm font-bold"
            >
              {t('seeds.done')}
            </button>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4">
              {/* WHAT IT IS */}
              <div className="flex items-start gap-3.5 pt-2">
                <span
                  aria-hidden="true"
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-[32px]"
                  style={{ background: `${cropAccent(seed.crop)}30` }}
                >
                  {cropArt(seed.crop)}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="mk-t1 text-[19px] leading-tight font-semibold">{seed.variety}</p>
                  <p className="mk-t2 mt-1 text-[12px]">
                    {t(`crops.${seed.crop}`)} · {t(`seeds.packs.${seed.id}`)}
                  </p>
                  <p className="mk-t2 mt-1.5 text-[12px] leading-relaxed">
                    {t(`seeds.notes.${seed.id}`)}
                  </p>
                </div>
              </div>

              {/* WHAT IT COSTS */}
              <div className="mt-4 flex items-center gap-2.5">
                <span className="mk-t1 text-[24px] font-semibold">{formatRupees(seed.price)}</span>
                <span className="mk-strike text-[13px]">{formatRupees(seed.mrp)}</span>
                <span className="mk-tag rounded-full px-2 py-0.5 text-[10.5px] font-bold">
                  {t('seeds.off', {
                    n: String(Math.round(((seed.mrp - seed.price) / seed.mrp) * 100)),
                  })}
                </span>
              </div>

              {/* WHERE TO GET IT TODAY */}
              <div className="mt-5">
                <p className="mk-t1 text-[15px] font-semibold">{t('market.nearYou')}</p>
                <p className="mk-t2 mt-0.5 flex items-center gap-1.5 text-[11.5px]">
                  <Icon name="pin" className="mk-accent-text h-3 w-3" />
                  {place
                    ? t('market.dealersAround', { place, n: String(stocked) })
                    : t('market.dealersUnknown')}
                </p>

                <div className="mt-1.5">
                  <VendorList vendors={vendors} />
                </div>
              </div>
            </div>

            {/* OR HAVE IT SENT */}
            <div className="mk-line-top shrink-0 px-5 pt-3.5 pb-6">
              <div className="flex items-center justify-between gap-3">
                <span className="mk-t2 text-[12px] font-semibold">{t('seeds.quantity')}</span>

                <span className="mk-inset flex items-center gap-3 rounded-full px-2 py-1">
                  <button
                    type="button"
                    aria-label={t('seeds.less')}
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((n) => Math.max(1, n - 1))}
                    className="mk-btn-ghost mk-t1 flex h-7 w-7 items-center justify-center rounded-full disabled:opacity-35"
                  >
                    −
                  </button>
                  <span className="mk-t1 min-w-5 text-center text-[14px] font-bold">{quantity}</span>
                  <button
                    type="button"
                    aria-label={t('seeds.more')}
                    disabled={quantity >= 10}
                    onClick={() => setQuantity((n) => Math.min(10, n + 1))}
                    className="mk-btn-ghost mk-t1 flex h-7 w-7 items-center justify-center rounded-full disabled:opacity-35"
                  >
                    +
                  </button>
                </span>
              </div>

              <p className="mk-t3 mt-2 text-[11px]">
                {place ? t('seeds.deliverTo', { place }) : t('seeds.deliverUnknown')} ·{' '}
                {t('seeds.cod')}
              </p>

              {status === 'failed' && (
                <p className="mt-2 text-[11.5px]" style={{ color: '#e2725b' }}>
                  {t('seeds.failed')}
                </p>
              )}

              <button
                type="button"
                onClick={handlePlace}
                disabled={status === 'placing'}
                className="mk-btn mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold"
              >
                {status === 'placing' ? t('seeds.placing') : t('market.orderFor', { total: formatRupees(total) })}
              </button>
            </div>
          </>
        )}
      </div>
    </>,
    frame,
  )
}
