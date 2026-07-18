'use client'

import { Button, useDocumentInfo } from '@payloadcms/ui'

/**
 * Admin sidebar action: open a rendered preview of this article — exactly
 * as it will appear in the parent assistant — in a new tab. Works on drafts
 * (the endpoint reads with draft:true + overrideAccess), so the
 * administration can check content before publishing.
 */
export function KBPreviewButton() {
  const { id } = useDocumentInfo()

  if (!id) {
    return (
      <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '1rem' }}>
        Enregistrez d’abord l’article pour activer l’aperçu.
      </p>
    )
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      <Button
        onClick={() => window.open(`/api/kb-articles/${id}/preview?locale=fr`, '_blank', 'noopener')}
        buttonStyle="secondary"
        size="medium"
      >
        👁 Aperçu de la réponse
      </Button>
      <p style={{ fontSize: '0.75rem', margin: '0.4rem 0 0', opacity: 0.7 }}>
        Ouvre un aperçu fidèle (question, catégorie, réponse, image) — fonctionne même en brouillon.
      </p>
    </div>
  )
}
