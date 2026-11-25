import type { CollectionConfig, NumberFieldSingleValidation } from 'payload'

import { authenticated, authenticatedOrPublished } from '../access/content'

const positiveNumber: NumberFieldSingleValidation = (value) =>
  (typeof value === 'number' && Number.isFinite(value) && value > 0) ||
  'Enter a number greater than zero.'

const optionalPositiveNumber: NumberFieldSingleValidation = (value, options) =>
  value === null || value === undefined ? true : positiveNumber(value, options)

export const Recipes: CollectionConfig = {
  slug: 'recipes',
  typescript: { interface: 'Recipe' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'mealType', 'cookingMinutes', '_status', 'updatedAt'],
    group: 'Content',
  },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
    readVersions: authenticated,
  },
  versions: { drafts: true },
  defaultSort: '-publishedAt',
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        if (data._status === 'published' && !data.publishedAt && !originalDoc?.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Stable URL segment using lowercase words separated by hyphens.' },
      validate: (value: unknown) =>
        (typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) ||
        'Use lowercase letters, numbers and single hyphens between words.',
    },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'introduction', type: 'textarea', required: true },
    {
      name: 'mealType',
      type: 'select',
      required: true,
      index: true,
      options: [
        { label: 'Breakfast', value: 'breakfast' },
        { label: 'Brunch', value: 'brunch' },
        { label: 'Lunch', value: 'lunch' },
        { label: 'Dinner', value: 'dinner' },
        { label: 'Snack', value: 'snack' },
      ],
    },
    {
      name: 'dietaryTags',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Vegetarian', value: 'vegetarian' },
        { label: 'Non-vegetarian', value: 'non-vegetarian' },
        { label: 'Vegan', value: 'vegan' },
        { label: 'Pescatarian', value: 'pescatarian' },
        { label: 'Dairy-free', value: 'dairy-free' },
        { label: 'Gluten-free', value: 'gluten-free' },
      ],
      admin: { description: 'Select every applicable preference. Everything is a UI filter, not a tag.' },
    },
    { name: 'cookingMinutes', type: 'number', required: true, index: true, validate: positiveNumber },
    {
      name: 'baseServings',
      type: 'number',
      required: true,
      min: 1,
      validate: (value: unknown) =>
        (typeof value === 'number' && Number.isSafeInteger(value) && value > 0) ||
        'Enter a positive whole number of servings.',
    },
    {
      name: 'ingredients',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true },
        {
          name: 'quantity',
          type: 'number',
          validate: optionalPositiveNumber,
          admin: { description: 'Quantity for baseServings. Leave blank for ingredients such as salt to taste.' },
        },
        { name: 'unit', type: 'text' },
        { name: 'note', type: 'text' },
      ],
    },
    { name: 'whyRecommended', type: 'textarea', required: true },
    {
      name: 'instructions',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [{ name: 'instruction', type: 'textarea', required: true }],
    },
    { name: 'tip', type: 'textarea' },
    {
      name: 'publishedAt',
      type: 'date',
      index: true,
      admin: { description: 'Set automatically on first publication; can be adjusted by an administrator.' },
    },
  ],
}
