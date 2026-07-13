import type { Endpoint, PayloadRequest } from 'payload'

/**
 * Explicit, admin-triggered parent notification.
 * Two-step: POST {} returns a recipient preview; POST {confirm:true} sends.
 * The AI assistant has no code path to this endpoint — only an authenticated
 * admin action reaches it, and every send is written to the notification log.
 * Demo: no email adapter is configured, so Payload writes emails to the server
 * console; production plugs Resend into payload.config email settings.
 */
export function makeNotifyEndpoint(sourceType: 'activity' | 'announcement'): Endpoint {
  const collection = sourceType === 'activity' ? 'activities' : 'announcements'

  return {
    path: '/:id/notify',
    method: 'post',
    handler: async (req: PayloadRequest) => {
      if (req.user?.collection !== 'users') {
        return Response.json({ error: 'Unauthorized' }, { status: 403 })
      }

      const id = Number(req.routeParams?.id)
      if (!id) return Response.json({ error: 'Missing id' }, { status: 400 })

      const doc = (await req.payload.findByID({
        collection,
        id,
        depth: 1,
        draft: false,
        overrideAccess: true,
      })) as {
        title?: string
        _status?: string
        scope?: string
        groups?: (number | { id: number; name?: string })[]
      } | null

      if (!doc || doc._status !== 'published') {
        return Response.json(
          { error: 'Publiez d’abord le contenu avant de notifier. / Publish the content before notifying.' },
          { status: 400 },
        )
      }

      const cpeWide = sourceType === 'announcement' && doc.scope === 'cpe'
      const groupIds = (doc.groups || []).map((g) => (typeof g === 'object' ? g.id : g))
      const groupNames = (doc.groups || [])
        .map((g) => (typeof g === 'object' ? g.name : null))
        .filter(Boolean)
        .join(', ')

      if (!cpeWide && groupIds.length === 0) {
        return Response.json({ error: 'Aucun groupe ciblé. / No target group.' }, { status: 400 })
      }

      const parents = await req.payload.find({
        collection: 'parents',
        where: {
          and: [
            { active: { equals: true } },
            ...(cpeWide ? [] : [{ groups: { in: groupIds } }]),
          ],
        },
        limit: 1000,
        overrideAccess: true,
      })

      const body = (req.json ? await req.json().catch(() => ({})) : {}) as { confirm?: boolean }
      const audienceLabel = cpeWide ? 'Tout le CPE / Whole CPE' : groupNames || `${groupIds.length} groupe(s)`

      if (!body.confirm) {
        return Response.json({ preview: true, recipients: parents.totalDocs, audience: audienceLabel })
      }

      const subject = `[CPE] ${doc.title || 'Nouvelle information'}`
      for (const parent of parents.docs) {
        // Console transport in demo; Resend in production. Content stays minimal:
        // the email points into the portal instead of duplicating details.
        await req.payload.sendEmail({
          to: parent.email,
          subject,
          text:
            parent.language === 'en'
              ? `Hello ${parent.name},\n\nNew information has been published for you: "${doc.title}".\nSee the details in the parent portal.\n\n— CPE La Voie lactée (demo)`
              : `Bonjour ${parent.name},\n\nUne nouvelle information a été publiée pour vous : « ${doc.title} ».\nConsultez les détails dans le portail parents.\n\n— CPE La Voie lactée (démo)`,
        })
      }

      await req.payload.create({
        collection: 'notification-log',
        data: {
          title: subject,
          sourceType,
          sourceId: id,
          audience: audienceLabel,
          recipients: parents.totalDocs,
          sentBy: req.user.id,
        },
        overrideAccess: true,
      })

      return Response.json({ sent: parents.totalDocs })
    },
  }
}
