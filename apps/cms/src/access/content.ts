import type { Access } from 'payload'

export const authenticated: Access = ({ req: { user } }) => Boolean(user)

// A query constraint also applies to draft queries and Global version replacement.
export const authenticatedOrPublished: Access = ({ req: { user } }) =>
  user ? true : { _status: { equals: 'published' } }

export const globalContentAccess = {
  read: authenticatedOrPublished,
  readVersions: authenticated,
  update: authenticated,
}
