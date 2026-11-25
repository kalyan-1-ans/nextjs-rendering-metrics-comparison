import type { GlobalConfig } from 'payload'

import { globalContentAccess } from '../access/content'
import { introduction, textFields } from '../fields/copy'
import { revalidateContent } from '../hooks/revalidate-content'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  typescript: { interface: 'AboutPage' },
  admin: { group: 'Pages' },
  access: globalContentAccess,
  versions: { drafts: true },
  hooks: { afterChange: [revalidateContent('/about')] },
  fields: [
    introduction(),
    {
      name: 'sections',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'heading', type: 'textarea', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    ...textFields('backLinkLabel'),
  ],
}
