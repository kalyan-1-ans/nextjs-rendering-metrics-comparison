import { createCMSClient } from './client'

export async function getHomeContent() {
  const cms = createCMSClient()

  const [settings, home] = await Promise.all([
    cms.findGlobal({ slug: 'site-settings', depth: 0, draft: false }),
    cms.findGlobal({ slug: 'home-page', depth: 0, draft: false }),
  ])
  return { settings, home }
}
