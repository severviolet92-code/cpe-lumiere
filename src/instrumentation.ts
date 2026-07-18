import type { Instrumentation } from 'next'

/**
 * Next.js instrumentation — the idiomatic catch-all for *unexpected* server
 * exceptions (a thrown error in a Server Component, route handler, or server
 * action that wasn't handled locally). Routes them through the same
 * centralized error capture as everything else, so they land in the
 * system-health page and (if configured) the external error reporter.
 *
 * Imported lazily inside the handler so the Payload/observability code is only
 * pulled into the Node.js runtime, never the Edge runtime.
 */
export const onRequestError: Instrumentation.onRequestError = async (err, request, context) => {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  try {
    const { captureError } = await import('./lib/observability')
    captureError(null, err, {
      scope: 'unexpected',
      detail: { path: request.path, method: request.method, routeType: context.routeType },
    })
  } catch {
    // Never let error reporting throw from the error hook itself.
  }
}
