export function preferredPagePath(path: string) {
  if (!path.startsWith('/') || path === '/') return path

  const match = path.match(/^([^?#]*)(.*)$/)
  const pathname = match?.[1] ?? path
  const suffix = match?.[2] ?? ''

  return `${pathname.replace(/\/$/, '')}/${suffix}`
}
