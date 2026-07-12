'use client'

import { useActionState } from 'react'

import type { Locale } from '../../../../i18n/config'
import { t } from '../../../../i18n/ui'
import { sendContactMessage, type ContactFormState } from './actions'

export function ContactForm({ locale }: { locale: Locale }) {
  const dict = t(locale)
  const [state, action, pending] = useActionState<ContactFormState, FormData>(sendContactMessage, {
    status: 'idle',
  })

  return (
    <form action={action} className="form-grid">
      {state.status === 'ok' && (
        <p className="form-feedback form-feedback--ok" role="status">
          {dict.contact.formSuccess}
        </p>
      )}
      {state.status === 'error' && (
        <p className="form-feedback form-feedback--error" role="alert">
          {dict.contact.formError}
        </p>
      )}

      <div className="field">
        <label htmlFor="contact-name">{dict.contact.formName}</label>
        <input id="contact-name" name="name" type="text" required maxLength={200} autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="contact-email">{dict.contact.formEmail}</label>
        <input id="contact-email" name="email" type="email" required maxLength={200} autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="contact-message">{dict.contact.formMessage}</label>
        <textarea id="contact-message" name="message" required rows={6} maxLength={5000} />
      </div>

      {/* Honeypot — hidden from real users */}
      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="form-note">{dict.contact.formPrivacy}</p>

      <div>
        <button className="btn btn--primary" type="submit" disabled={pending}>
          {pending ? '…' : dict.contact.formSend}
        </button>
      </div>
    </form>
  )
}
