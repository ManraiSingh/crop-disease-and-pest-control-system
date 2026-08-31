import { useT } from '../../i18n/context.js'
import ComingSoon from '../lib/ComingSoon.jsx'

export default function ScanPage() {
  const t = useT()

  return (
    <ComingSoon
      icon="camera"
      title={t('scan.title')}
      description={t('scan.description')}
    />
  )
}
