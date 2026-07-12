import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

/** Renders Lexical rich text from the CMS inside the site's typographic system. */
export function RichTextBlock({
  data,
  className = '',
}: {
  data?: SerializedEditorState | null
  className?: string
}) {
  if (!data) return null
  return <RichText data={data} className={`rich-text ${className}`} />
}
