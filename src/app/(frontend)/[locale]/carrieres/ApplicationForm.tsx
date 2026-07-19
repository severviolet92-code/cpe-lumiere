'use client'

import { useActionState } from 'react'

import type { Locale } from '../../../../i18n/config'
import { t } from '../../../../i18n/ui'
import { submitApplication, type ApplicationFormState } from './actions'

export type OpeningOption = { id: number; title: string }

/**
 * Public job-application form: per-posting or spontaneous, with a CV upload.
 * `defaultOpening` preselects a posting when the form is opened from its card.
 */
export function ApplicationForm({
  locale,
  openings,
  defaultOpening,
}: {
  locale: Locale
  openings: OpeningOption[]
  defaultOpening?: number
}) {
  const dict = t(locale)
  const [state, action, pending] = useActionState<ApplicationFormState, FormData>(
    submitApplication,
    { status: 'idle' },
  )

  return (
    <form action={action} className="form-grid">
      {state.status === 'ok' && (
        <p className="form-feedback form-feedback--ok" role="status">
          {dict.careers.form.success}
        </p>
      )}
      {state.status === 'error' && (
        <p className="form-feedback form-feedback--error" role="alert">
          {dict.careers.form.error}
        </p>
      )}
      {state.status === 'file-too-large' && (
        <p className="form-feedback form-feedback--error" role="alert">
          {dict.careers.form.fileTooLarge}
        </p>
      )}

      <div className="field">
        <label htmlFor="apply-name">{dict.careers.form.name}</label>
        <input id="apply-name" name="name" type="text" required maxLength={200} autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="apply-email">{dict.careers.form.email}</label>
        <input id="apply-email" name="email" type="email" required maxLength={200} autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="apply-phone">{dict.careers.form.phone}</label>
        <input id="apply-phone" name="phone" type="tel" maxLength={50} autoComplete="tel" />
      </div>
      <div className="field">
        <label htmlFor="apply-opening">{dict.careers.form.position}</label>
        <select id="apply-opening" name="jobOpening" defaultValue={defaultOpening ? String(defaultOpening) : ''}>
          <option value="">{dict.careers.form.spontaneousOption}</option>
          {openings.map((o) => (
            <option key={o.id} value={String(o.id)}>
              {o.title}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="apply-message">{dict.careers.form.message}</label>
        <textarea id="apply-message" name="message" rows={5} maxLength={5000} />
      </div>
      <div className="field">
        <label htmlFor="apply-cv">{dict.careers.form.cv}</label>
        <input
          id="apply-cv"
          name="cv"
          type="file"
          required
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        />
      </div>

      {/* Honeypot — hidden from real users */}
      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <label htmlFor="apply-website">Website</label>
        <input id="apply-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="form-note">{dict.careers.form.privacy}</p>

      <div>
        <button className="btn btn--primary" type="submit" disabled={pending}>
          {pending ? dict.careers.form.sending : dict.careers.form.submit}
        </button>
      </div>
    </form>
  )
}
