import { getPayload } from 'payload'

import config from '../payload.config'
import { resetContent } from './index'

const payload = await getPayload({ config, disableOnInit: true })
try {
  await resetContent(payload)
} finally {
  await payload.destroy()
}
