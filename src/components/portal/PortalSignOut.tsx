'use client'

import { useRouter } from 'next/navigation'

export function PortalSignOut({ label }: { label: string }) {
  const router = useRouter()
  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={async () => {
        await fetch('/api/parents/logout', { method: 'POST', credentials: 'include' })
        router.refresh()
      }}
    >
      {label}
    </button>
  )
}
