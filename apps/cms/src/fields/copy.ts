import type { GroupField, TextField } from 'payload'

export const textFields = (...names: string[]): TextField[] =>
  names.map((name) => ({ name, type: 'text', required: true }))

// Field names are declared by each page, so generated types have explicit keys.
export const copyGroup = (name: string, names: string[], description?: string): GroupField => ({
  name,
  type: 'group',
  required: true,
  admin: { description },
  fields: textFields(...names),
})

export const introduction = (name = 'introduction'): GroupField => ({
  name,
  type: 'group',
  required: true,
  fields: [
    ...textFields('eyebrow'),
    { name: 'heading', type: 'textarea', required: true },
    { name: 'description', type: 'textarea', required: true },
  ],
})
