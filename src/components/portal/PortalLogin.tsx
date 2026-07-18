'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Locale } from '../../i18n/config'
import { t } from '../../i18n/ui'

type Mode = 'password' | 'magic-link'

export function PortalLogin({ locale }: { locale: Locale }) {
  const dict = t(locale)
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('password')
  const [error, setError] = useState(false)
  const [busy, setBusy] = useState(false)
  const [linkSent, setLinkSent] = useState(false)

  const submitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const submitMagicLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBusy(true)
    setError(false)
    const form = new FormData(e.currentTarget)
    try {
      await fetch('/api/parents/magic-link/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.get('email'), locale }),
      })
      // Always shows the same generic confirmation, whether or not the email
      // matched an account — the server never reveals which emails exist.
      setLinkSent(true)
    } catch {
      setError(true)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <div className="tab-switch" role="tablist" aria-label={dict.portal.title}>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'password'}
          className={`tab-switch__btn ${mode === 'password' ? 'tab-switch__btn--active' : ''}`}
          onClick={() => {
            setMode('password')
            setError(false)
          }}
        >
          {dict.portal.tabPassword}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'magic-link'}
          className={`tab-switch__btn ${mode === 'magic-link' ? 'tab-switch__btn--active' : ''}`}
          onClick={() => {
            setMode('magic-link')
            setError(false)
          }}
        >
          {dict.portal.tabMagicLink}
        </button>
      </div>

      {mode === 'password' ? (
        <form onSubmit={submitPassword} className="form-grid" style={{ marginInline: 'auto' }}>
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
      ) : linkSent ? (
        <p className="form-feedback" role="status" style={{ marginInline: 'auto', maxWidth: '420px' }}>
          {dict.portal.magicLinkSent}
        </p>
      ) : (
        <form onSubmit={submitMagicLink} className="form-grid" style={{ marginInline: 'auto' }}>
          {error && (
            <p className="form-feedback form-feedback--error" role="alert">
              {dict.portal.loginError}
            </p>
          )}
          <p className="form-note" style={{ marginTop: 0 }}>
            {dict.portal.magicLinkLede}
          </p>
          <div className="field">
            <label htmlFor="portal-magic-email">{dict.portal.email}</label>
            <input id="portal-magic-email" name="email" type="email" required autoComplete="email" />
          </div>
          <div>
            <button className="btn btn--primary" type="submit" disabled={busy}>
              {busy ? '…' : dict.portal.magicLinkSend}
            </button>
          </div>
          <p className="form-note">{dict.portal.demoNote}</p>
        </form>
      )}
    </div>
  )
}
