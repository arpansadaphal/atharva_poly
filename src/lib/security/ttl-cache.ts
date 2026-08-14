/**
 * TTLCache — a tiny in-memory, self-expiring key/value store.
 *
 * Used as the shared primitive behind rate limiting and duplicate-submission
 * detection in the contact API route.
 *
 * ⚠ IMPORTANT PRODUCTION NOTE
 * This lives in the memory of a single serverless function instance. On
 * platforms like Vercel that means:
 *   - It resets on cold start.
 *   - It is NOT shared across concurrent instances or regions.
 * That makes it a "best effort" guard, not a hard guarantee — it will stop
 * casual/burst spam and accidental double-clicks, but a determined attacker
 * distributing requests across many cold starts will not be fully blocked.
 *
 * If/when traffic or abuse justifies it, swap this for a shared store
 * (Upstash Redis, Vercel KV, etc.) — every call site in this project goes
 * through the small interface below, so that swap touches one file, not
 * the route or the form.
 */

interface Entry<V> {
  value: V
  expiresAt: number
}

export class TTLCache<V = number> {
  private store = new Map<string, Entry<V>>()
  private readonly maxEntries: number

  /** @param maxEntries hard cap so a flood of unique keys can't grow this unbounded */
  constructor(maxEntries = 5000) {
    this.maxEntries = maxEntries
  }

  private sweep() {
    if (this.store.size <= this.maxEntries) return
    const now = Date.now()
    for (const [key, entry] of this.store) {
      if (entry.expiresAt <= now) this.store.delete(key)
    }
    // Still oversized after clearing expired entries (unlikely, but be safe
    // against a memory leak under sustained abuse) — drop the oldest half.
    if (this.store.size > this.maxEntries) {
      const excess = this.store.size - this.maxEntries
      let dropped = 0
      for (const key of this.store.keys()) {
        if (dropped >= excess) break
        this.store.delete(key)
        dropped++
      }
    }
  }

  get(key: string): V | undefined {
    const entry = this.store.get(key)
    if (!entry) return undefined
    if (entry.expiresAt <= Date.now()) {
      this.store.delete(key)
      return undefined
    }
    return entry.value
  }

  set(key: string, value: V, ttlMs: number): void {
    this.store.set(key, { value, expiresAt: Date.now() + ttlMs })
    this.sweep()
  }

  has(key: string): boolean {
    return this.get(key) !== undefined
  }

  delete(key: string): void {
    this.store.delete(key)
  }
}