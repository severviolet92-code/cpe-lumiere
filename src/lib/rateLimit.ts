/**
 * Small in-memory sliding-window rate limiter, same pattern as the public
 * contact form. Resets on server restart — acceptable for this scale; a real
 * multi-instance production deployment would move this to Redis or similar.
 */
const buckets = new Map<string, number[]>()

export function isRateLimited(key: string, maxPerWindow: number, windowMs: number): boolean {
  const now = Date.now()
  const recent = (buckets.get(key) || []).filter((ts) => now - ts < windowMs)
  if (recent.length >= maxPerWindow) {
    buckets.set(key, recent)
    return true
  }
  recent.push(now)
  buckets.set(key, recent)
  return false
}
