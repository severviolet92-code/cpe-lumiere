import type { Locale } from '../i18n/config'

/**
 * Branded HTML email shell — the « Lumière du matin » design system rendered
 * with email-safe inline styles: warm paper background, serif display voice,
 * honey accent. Table layout keeps every major client happy.
 */
const palette = {
  paper: '#faf5ec',
  card: '#fffdf8',
  ink: '#38291a',
  inkSoft: '#6b5844',
  inkFaint: '#98836c',
  honey: '#e8a93c',
  honeyDeep: '#8a5c10',
  honeyWhisper: '#fbeed3',
  line: 'rgba(56, 41, 26, 0.12)',
}

export function renderBrandedEmail({
  locale,
  cpeName,
  title,
  bodyHtml,
  ctaUrl,
  ctaLabel,
}: {
  locale: Locale
  cpeName: string
  title: string
  bodyHtml: string
  ctaUrl?: string
  ctaLabel?: string
}): string {
  const footerNote =
    locale === 'en'
      ? 'You are receiving this email because your family attends the CPE. Never reply with personal information about a child.'
      : 'Vous recevez ce courriel parce que votre famille fréquente le CPE. Ne répondez jamais avec des renseignements personnels sur un enfant.'

  const cta =
    ctaUrl && ctaLabel
      ? `<tr><td style="padding: 8px 32px 28px;">
           <a href="${ctaUrl}"
              style="display: inline-block; background: ${palette.honey}; color: ${palette.ink};
                     font-weight: 700; text-decoration: none; padding: 12px 26px;
                     border-radius: 999px; font-family: Georgia, 'Times New Roman', serif;">
             ${ctaLabel}
           </a>
         </td></tr>`
      : ''

  return `<!DOCTYPE html>
<html lang="${locale === 'en' ? 'en-CA' : 'fr-CA'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin: 0; padding: 0; background: ${palette.paper};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: ${palette.paper}; padding: 28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0"
             style="max-width: 600px; width: 100%; background: ${palette.card};
                    border: 1px solid ${palette.line}; border-radius: 18px; overflow: hidden;">
        <tr>
          <td style="padding: 26px 32px 18px; border-bottom: 1px solid ${palette.line}; background: ${palette.honeyWhisper};">
            <span style="font-family: Georgia, 'Times New Roman', serif; font-size: 20px; font-weight: 700; color: ${palette.ink};">
              ☀️ ${escapeHtml(cpeName)}
            </span>
          </td>
        </tr>
        <tr>
          <td style="padding: 28px 32px 6px;">
            <h1 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 26px; line-height: 1.25; color: ${palette.ink};">
              ${escapeHtml(title)}
            </h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 14px 32px 24px; font-family: -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif;
                     font-size: 16px; line-height: 1.65; color: ${palette.inkSoft};">
            ${bodyHtml}
          </td>
        </tr>
        ${cta}
        <tr>
          <td style="padding: 18px 32px 24px; border-top: 1px solid ${palette.line};
                     font-family: -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif;
                     font-size: 12px; line-height: 1.6; color: ${palette.inkFaint};">
            ${escapeHtml(cpeName)}<br>${footerNote}
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Crude but reliable text version for clients that prefer plain text. */
export function htmlToText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|h[1-6]|li|tr)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
