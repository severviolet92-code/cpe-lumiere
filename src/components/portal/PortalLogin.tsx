'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Locale } from '../../i18n/config'
import { t } from '../../i18n/ui'

export function PortalLogin({ locale }: { locale: Locale }) {
  const dict = t(locale)
  const router = useRouter()
  const [error, setError] = useState(false)
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBusy(true)
    setError(false)
    const form = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/parents/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.get('email'), password: form.get('password') }),
      })
      if (res.ok) router.refresh()
      else setError(true)
    } catch {
      setError(true)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="form-grid" style={{ marginInline: 'auto' }}>
      {error && (
        <p className="form-feedback form-feedback--error" role="alert">
          {dict.portal.loginError}
        </p>
      )}
      <div className="field">
        <label htmlFor="portal-email">{dict.portal.email}</label>
        <input id="portal-email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="portal-password">{dict.portal.password}</label>
        <input id="portal-password" name="password" type="password" required autoComplete="current-password" />
      </div>
      <div>
        <button className="btn btn--primary" type="submit" disabled={busy}>
          {busy ? '…' : dict.portal.signIn}
        </button>
      </div>
      <p className="form-note">{dict.portal.demoNote}</p>
    </form>
  )
}
