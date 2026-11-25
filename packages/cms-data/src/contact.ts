import { createCMSClient } from './client'

export async function getContactContent() {
  const cms = createCMSClient()

  const [settings, contact] = await Promise.all([
    cms.findGlobal({ slug: 'site-settings', depth: 0, draft: false }),
    cms.findGlobal({ slug: 'contact-page', depth: 0, draft: false }),
  ])
  return { settings, contact }
}
