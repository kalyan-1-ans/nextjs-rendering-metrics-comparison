'use server'

import { setTimeout as delay } from 'node:timers/promises'

export interface ContactData {
  name: string
  email: string
  message: string
}

export interface ContactActionState {
  success: boolean
  data: ContactData | null
}

export async function submitContact(
  _previousState: ContactActionState,
  data: ContactData,
): Promise<ContactActionState> {
  await delay(500)
  return { success: true, data }
}
