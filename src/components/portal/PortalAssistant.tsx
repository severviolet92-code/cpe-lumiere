'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import type { Locale } from '../../i18n/config'
import { localizedPath } from '../../i18n/config'
import { t } from '../../i18n/ui'
import { RichTextBlock } from '../RichTextBlock'

type KBResult = {
  id: number
  question: string
  answer: SerializedEditorState
  category: { name: string; icon: string | null } | null
  image: { url: string; alt: string } | null
}

type ChatEntry =
  | { key: number; role: 'user'; text: string }
  | { key: number; role: 'assistant'; results: KBResult[] }
  | { key: number; role: 'error' }

/**
 * Chat-style help assistant. Deterministic: every answer is an article the
 * administration wrote and published — the assistant only finds and shows it.
 */
export function PortalAssistant({
  locale,
  suggestions,
}: {
  locale: Locale
  suggestions: string[]
}) {
  const dict = t(locale)
  const [entries, setEntries] = useState<ChatEntry[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const logRef = useRef<HTMLDivElement>(null)
  const keyRef = useRef(0)

  useEffect(() => {
    // Keep the latest exchange in view as the conversation grows.
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' })
  }, [entries, busy])

  const ask = async (question: string) => {
    const q = question.trim()
    if (!q || busy) return
    setInput('')
    setBusy(true)
    setEntries((prev) => [...prev, { key: ++keyRef.current, role: 'user', text: q }])
    try {
      const res = await fetch(
        `/api/kb-articles/search?q=${encodeURIComponent(q)}&locale=${locale}`,
        { credentials: 'include' },
      )
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as { results: KBResult[] }
      setEntries((prev) => [
        ...prev,
        { key: ++keyRef.current, role: 'assistant', results: data.results },
      ])
    } catch {
      setEntries((prev) => [...prev, { key: ++keyRef.current, role: 'error' }])
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="assistant">
      <div className="assistant__log" ref={logRef} role="log" aria-live="polite">
        <div className="assistant__bubble assistant__bubble--bot">
          <p style={{ margin: 0 }}>{dict.portal.assistant.greeting}</p>
        </div>

        {entries.map((entry) => {
          if (entry.role === 'user') {
            return (
              <div className="assistant__bubble assistant__bubble--user" key={entry.key}>
                {entry.text}
              </div>
            )
          }
          if (entry.role === 'error') {
            return (
              <div className="assistant__bubble assistant__bubble--bot" key={entry.key}>
                <p style={{ margin: 0 }}>{dict.portal.assistant.error}</p>
              </div>
            )
          }
          if (entry.results.length === 0) {
            return (
              <div className="assistant__bubble assistant__bubble--bot" key={entry.key}>
                <p style={{ margin: 0 }}>{dict.portal.assistant.fallback}</p>
                <p style={{ margin: '0.8rem 0 0' }}>
                  <Link className="btn btn--ghost" href={localizedPath(locale, '/contact')}>
                    {dict.portal.assistant.contactCta}
                  </Link>
                </p>
              </div>
            )
          }
          return (
            <div className="assistant__bubble assistant__bubble--bot" key={entry.key}>
              <p className="assistant__intro">{dict.portal.assistant.resultsIntro}</p>
              {entry.results.map((result) => (
                <article className="assistant__answer" key={result.id}>
                  <header className="assistant__answer-head">
                    <h3>{result.question}</h3>
                    {result.category && (
                      <span className="assistant__category">
                        {result.category.icon ? `${result.category.icon} ` : ''}
                        {result.category.name}
                      </span>
                    )}
                  </header>
                  <RichTextBlock data={result.answer} />
                  {result.image && (
                    <Image
                      src={result.image.url}
                      alt={result.image.alt}
                      width={800}
                      height={600}
                      className="assistant__image"
                    />
                  )}
                </article>
              ))}
            </div>
          )
        })}

        {busy && (
          <div className="assistant__bubble assistant__bubble--bot assistant__bubble--busy">
            {dict.portal.assistant.searching}
          </div>
        )}
      </div>

      {entries.length === 0 && suggestions.length > 0 && (
        <div className="assistant__suggestions">
          <span className="assistant__suggestions-label">
            {dict.portal.assistant.suggestionsLabel}
          </span>
          {suggestions.map((s) => (
            <button key={s} type="button" className="assistant__chip" onClick={() => ask(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        className="assistant__form"
        onSubmit={(e) => {
          e.preventDefault()
          ask(input)
        }}
      >
        <label className="visually-hidden" htmlFor="assistant-input">
          {dict.portal.assistant.inputLabel}
        </label>
        <input
          id="assistant-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={dict.portal.assistant.placeholder}
          maxLength={300}
          autoComplete="off"
        />
        <button className="btn btn--primary" type="submit" disabled={busy || !input.trim()}>
          {dict.portal.assistant.send}
        </button>
      </form>
    </div>
  )
}
