import type { Config } from '@rendering-metrics/cms-types/generated'
import 'payload'

declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}
