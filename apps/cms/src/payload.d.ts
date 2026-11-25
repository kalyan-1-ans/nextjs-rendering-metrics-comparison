import type { Config } from '@small-bites/cms-types/generated'
import 'payload'

declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}
