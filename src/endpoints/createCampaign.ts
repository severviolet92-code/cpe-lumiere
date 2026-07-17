import type { Endpoint, PayloadRequest } from 'payload'

/**
 * POST /api/announcements/:id/create-campaign
 * One click from a published announcement to a prefilled draft email
 * campaign (title, both languages of subject/body, audience mapped from the
 * announcement scope, back-reference set). Nothing is sent: the admin lands
 * on the draft and goes through the usual preview → confirm flow.
 */
export const createCampaignFromAnnouncement: Endpoint = {
  path: '/:id/create-campaign',
  method: 'post',
  handler: async (req: PayloadRequest) => {
    if (req.user?.collection !== 'users') {
      return Response.json({ error: 'Unauthorized' }, { status: 403 })
    }
    const id = Number(req.routeParams?.id)
    if (!id) return Response.json({ error: 'Missing id' }, { status: 400 })

    const [fr, en] = await Promise.all([
      req.payload.findByID({
        collection: 'announcements',
        id,
        locale: 'fr',
        depth: 0,
        overrideAccess: true,
      }),
      req.payload.findByID({
        collection: 'announcements',
        id,
        locale: 'en',
        depth: 0,
        overrideAccess: true,
      }),
    ])

    if (!fr || fr._status !== 'published') {
      return Response.json(
        { error: 'Publiez d’abord l’annonce. / Publish the announcement first.' },
        { status: 400 },
      )
    }

    const groupIds = (fr.groups || []).map((g) => (typeof g === 'object' ? g.id : g))

    const campaign = await req.payload.create({
      collection: 'email-campaigns',
      locale: 'fr',
      data: {
        title: `Annonce : ${fr.title}`,
        subject: fr.title,
        body: fr.body,
        audience: fr.scope === 'groups' ? 'groups' : 'all',
        groups: fr.scope === 'groups' ? groupIds : undefined,
        relatedAnnouncement: id,
        status: 'draft',
      },
      overrideAccess: true,
    })

    if (en?.title || en?.body) {
      await req.payload.update({
        collection: 'email-campaigns',
        id: campaign.id,
        locale: 'en',
        data: {
          subject: en.title || fr.title,
          body: en.body || fr.body,
        },
        overrideAccess: true,
      })
    }

    return Response.json({
      id: campaign.id,
      adminUrl: `/admin/collections/email-campaigns/${campaign.id}`,
    })
  },
}
