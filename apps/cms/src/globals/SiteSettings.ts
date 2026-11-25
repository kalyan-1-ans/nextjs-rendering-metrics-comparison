import type { GlobalConfig } from 'payload'

import { globalContentAccess } from '../access/content'
import { copyGroup, textFields } from '../fields/copy'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  typescript: { interface: 'SiteSettings' },
  admin: { group: 'Site' },
  access: globalContentAccess,
  versions: { drafts: true },
  fields: [
    copyGroup('branding', ['siteName']),
    {
      name: 'navigation',
      type: 'group',
      required: true,
      fields: [
        ...textFields('label'),
        {
          name: 'links',
          type: 'array',
          required: true,
          minRows: 1,
          fields: [
            ...textFields('label'),
            {
              name: 'href',
              type: 'text',
              required: true,
              admin: { description: 'App-relative path, such as /about, shared by every consumer.' },
              validate: (value: unknown) =>
                (typeof value === 'string' && /^\/(?!\/)[^\s\\]*$/.test(value)) ||
                'Enter an app-relative path beginning with a single slash.',
            },
          ],
        },
      ],
    },
    copyGroup('footer', ['tagline', 'description']),
    copyGroup('timestamps', ['createdLabel', 'updatedLabel', 'renderedLabel']),
  ],
}
