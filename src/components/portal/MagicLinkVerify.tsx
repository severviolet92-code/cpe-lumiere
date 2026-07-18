'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import type { Locale } from '../../i18n/config'
import { localizedPath } from '../../i18n/config'
import { t } from '../../i18n/ui'

type Status = 'verifying' | 'error'

export function MagicLinkVerify({ locale }: { locale: Locale }) {
  const dict = t(locale)
  const router = useRouter()
  const [status, setStatus] = useState<Status>('verifying')
  const attempted = useRef(false)

  useEffect(() => {
    if (attempted.current) return
    attempted.current = true

    const params = new URLSearchParams(window.location.search)
    const email = params.get('email')
    const token = params.get('token')

    if (!email || !token) {
      // Defer to a microtask so this doesn't set state synchronously inside
      // the effect body itself.
      Promise.resolve().then(() => setStatus('error'))
      return
    }

    fetch('/api/parents/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: token }),
    })
      .then((res) => {
        if (res.ok) router.replace(localizedPath(locale, '/portail'))
        else setStatus('error')
      })
      .catch(() => setStatus('error'))
  }, [locale, router])

  if (status === 'verifying') {
    return <p className="lede">{dict.portal.magicLinkVerifying}</p>
  }

  return (
    <div>
      <p className="form-feedback form-feedback--error" role="alert" style={{ marginInline: 'auto', maxWidth: '420px' }}>
        {dict.portal.magicLinkError}
      </p>
      <p style={{ marginTop: '1.4rem' }}>
        <a className="btn btn--primary" href={localizedPath(locale, '/portail')}>
          {dict.portal.magicLinkRetry}
        </a>
      </p>
    </div>
  )
}
