import { getPayload } from 'payload'

import config from '../payload.config'
import { seedContent } from './index'

// The explicit command uses the same seed once; initialization must not recurse.
const payload = await getPayload({ config, disableOnInit: true })
try {
  await seedContent(payload)
} finally {
  await payload.destroy()
}
