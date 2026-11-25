import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  let path: unknown
  try {
    const body = await request.json()
    path = body.path
  } catch {
    return Response.json({ error: 'Send a JSON body containing path.' }, { status: 400 })
  }
  if (
    typeof path !== 'string' ||
    path.length > 1024 ||
    (path !== 'all' && !/^\/(?!\/)/.test(path))
  ) {
    return Response.json(
      { error: 'Path must be "all" or an app-relative path of at most 1024 characters.' },
      { status: 400 },
    )
  }

  if (path === 'all') {
    revalidatePath('/', 'layout')
  } else {
    revalidatePath(path)
  }

  return Response.json(
    { revalidated: true, path },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
