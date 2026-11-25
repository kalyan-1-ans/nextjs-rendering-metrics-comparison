import { connection } from 'next/server'

export default async function HomePage() {
  await connection()

  return <main>Request-time SSR app scaffold</main>
}
