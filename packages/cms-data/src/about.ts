import { createCMSClient } from './client'

export async function getAboutContent() {
  const cms = createCMSClient()

  const [settings, about] = await Promise.all([
    cms.findGlobal({ slug: 'site-settings', depth: 0, draft: false }),
    cms.findGlobal({ slug: 'about-page', depth: 0, draft: false }),
  ])
  return { settings, about }
}
