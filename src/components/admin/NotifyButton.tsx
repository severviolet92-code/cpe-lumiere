'use client'

import { Button, toast, useDocumentInfo } from '@payloadcms/ui'
import { useState } from 'react'

/**
 * Admin sidebar action: notify the parents concerned by this document.
 * Two explicit steps (preview → confirm) so nothing ever leaves by accident.
 */
export function NotifyButton() {
  const { id, collectionSlug } = useDocumentInfo()
  const [busy, setBusy] = useState(false)

  if (!id) return null

  const run = async () => {
    setBusy(true)
    try {
      const base = `/api/${collectionSlug}/${id}/notify`
      const preview = await fetch(base, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
      const info = await preview.json()
      if (!preview.ok) {
        toast.error(info.error || 'Erreur')
        return
      }
      const ok = window.confirm(
        `Envoyer un courriel à ${info.recipients} parent(s) — ${info.audience} ?\n\nSend an email to ${info.recipients} parent(s)?`,
      )
      if (!ok) return
      const send = await fetch(base, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirm: true }),
      })
      const result = await send.json()
      if (send.ok) toast.success(`Notification envoyée à ${result.sent} parent(s).`)
      else toast.error(result.error || 'Erreur lors de l’envoi')
    } finally {
      setBusy(false)
    }
  }

  const createCampaign = async () => {
    setBusy(true)
    try {
      const res = await fetch(`/api/${collectionSlug}/${id}/create-campaign`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      const info = await res.json()
      if (!res.ok) {
        toast.error(info.error || 'Erreur')
        return
      }
      toast.success('Campagne courriel créée — vous y êtes redirigé.')
      window.location.assign(info.adminUrl)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ marginBottom: '1rem', display: 'grid', gap: '0.5rem' }}>
      <Button onClick={run} disabled={busy} buttonStyle="secondary" size="medium">
        {busy ? 'Envoi…' : '✉ Notifier les parents'}
      </Button>
      {collectionSlug === 'announcements' && (
        <Button onClick={createCampaign} disabled={busy} buttonStyle="secondary" size="medium">
          📨 Créer une campagne courriel
        </Button>
      )}
      <p style={{ fontSize: '0.75rem', margin: 0, opacity: 0.7 }}>
        Publiez d’abord, puis notifiez — ou transformez l’annonce en campagne courriel complète.
        Chaque envoi est consigné au journal des notifications.
      </p>
    </div>
  )
}
