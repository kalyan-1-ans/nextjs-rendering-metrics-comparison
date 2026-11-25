import type { GlobalConfig } from 'payload'

import { globalContentAccess } from '../access/content'
import { copyGroup, introduction, textFields } from '../fields/copy'
import { revalidateContent } from '../hooks/revalidate-content'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  typescript: { interface: 'ContactPage' },
  admin: { group: 'Pages' },
  access: globalContentAccess,
  versions: { drafts: true },
  hooks: {
    afterChange: [revalidateContent('/contact'), revalidateContent('/contact/confirmation')],
  },
  fields: [
    introduction(),
    copyGroup('form', [
      'nameLabel', 'namePlaceholder', 'emailLabel', 'emailPlaceholder', 'messageLabel',
      'messagePlaceholder', 'submitLabel', 'submittingLabel', 'errorMessage', 'nameRequiredMessage',
      'emailRequiredMessage', 'invalidEmailMessage', 'messageRequiredMessage',
    ], 'Interface copy only. Visitor submissions are stored outside the CMS.'),
    { name: 'privacyCopy', type: 'textarea', required: true },
    {
      name: 'confirmation',
      type: 'group',
      required: true,
      fields: [introduction(), ...textFields('backLinkLabel')],
    },
  ],
}
