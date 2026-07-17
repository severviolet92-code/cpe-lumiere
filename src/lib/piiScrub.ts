/**
 * Strip obvious personal identifiers from assistant questions before they are
 * stored in question-log. The log exists to reveal content gaps ("what are
 * parents asking that we haven't answered"), never to retain contact details.
 */
export function scrubPii(text: string): string {
  return text
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, '[courriel retiré]')
    .replace(/\b(?:\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/g, '[téléphone retiré]')
    .slice(0, 300)
}
