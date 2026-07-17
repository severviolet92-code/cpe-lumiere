'use client'

import { Button, toast, useDocumentInfo } from '@payloadcms/ui'
import { useState } from 'react'

/**
 * Campaign sidebar actions: preview the branded email, send a test to
 * yourself, then send for real — always preview → explicit confirm, so
 * nothing ever leaves by accident.
 */
export function CampaignActions() {
  const { id } = useDocumentInfo()
  const [busy, setBusy] = useState(false)

  if (!id) {
    return (
      <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '1rem' }}>
        Enregistrez d’abord la campagne pour activer l’aperçu et l’envoi.
      </p>
    )
  }

  const base = `/api/email-campaigns/${id}`

  const preview = () => {
    window.open(`${base}/preview?locale=fr`, '_blank', 'noopener')
  }

  const sendTest = async () => {
    setBusy(true)
    try {
      const res = await fetch(`${base}/send`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: true }),
      })
      const info = await res.json()
      if (res.ok) toast.success(`Courriel de test envoyé à ${info.to}.`)
      else toast.error(info.error || 'Erreur')
    } finally {
      setBusy(false)
    }
  }

  const sendNow = async () => {
    setBusy(true)
    try {
      const previewRes = await fetch(`${base}/send`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
      const info = await previewRes.json()
      if (!previewRes.ok) {
        toast.error(info.error || 'Erreur')
        return
      }
      const ok = window.confirm(
        `Envoyer cette campagne à ${info.recipients} parent(s) — ${info.audience} ?\n\nSend this campaign to ${info.recipients} parent(s)?`,
      )
      if (!ok) return
      const sendRes = await fetch(`${base}/send`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirm: true }),
      })
      const result = await sendRes.json()
      if (sendRes.ok) {
        toast.success(`Campagne envoyée : ${result.delivered}/${result.recipients} livrés.`)
        window.location.reload()
      } else {
        toast.error(result.error || 'Erreur lors de l’envoi')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
      <Button onClick={preview} buttonStyle="secondary" size="medium" disabled={busy}>
        👁 Aperçu du courriel
      </Button>
      <Button onClick={sendTest} buttonStyle="secondary" size="medium" disabled={busy}>
        {busy ? 'Envoi…' : '🧪 M’envoyer un test'}
      </Button>
      <Button onClick={sendNow} buttonStyle="primary" size="medium" disabled={busy}>
        {busy ? 'Envoi…' : '✉ Envoyer maintenant'}
      </Button>
      <p style={{ fontSize: '0.75rem', margin: 0, opacity: 0.7 }}>
        Aperçu → test → envoi confirmé. Chaque envoi est consigné au journal des notifications.
      </p>
    </div>
  )
}
