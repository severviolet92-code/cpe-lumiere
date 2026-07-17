'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import type { Locale } from '../../i18n/config'
import { localizedPath } from '../../i18n/config'
import { t } from '../../i18n/ui'
import { formatDateWithWeekday } from '../../lib/format'
import { RichTextBlock } from '../RichTextBlock'

type KBResult = {
  id: number
  question: string
  answer: SerializedEditorState
  category: { name: string; icon: string | null } | null
  image: { url: string; alt: string } | null
}

type KBEvent = { id: number; title: string; eventDate: string }

type ChatEntry =
  | { key: number; role: 'user'; text: string }
  | { key: number; role: 'assistant'; results: KBResult[]; events: KBEvent[] }
  | { key: number; role: 'gated'; message: string }
  | { key: number; role: 'error' }
  | { key: number; role: 'rate-limited' }

/**
 * Chat-style help assistant, shared by the public FAQ page and the parent
 * portal help centre — same component, same endpoint. The server (not this
 * component) decides audience scope from the session, so there is no
 * client-side trust involved: an anonymous visitor and a signed-in parent
 * hitting the same endpoint simply get different result sets.
 * Deterministic: every answer is an article the administration wrote and
 * published — the assistant only finds and shows it, never generates one.
 */
export function AssistantChat({
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
      if (res.status === 429) {
        setEntries((prev) => [...prev, { key: ++keyRef.current, role: 'rate-limited' }])
        return
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as {
        gated?: boolean
        message?: string
        results: KBResult[]
        events?: KBEvent[]
      }
      if (data.gated) {
        setEntries((prev) => [
          ...prev,
          { key: ++keyRef.current, role: 'gated', message: data.message || dict.portal.assistant.fallback },
        ])
        return
      }
      setEntries((prev) => [
        ...prev,
        { key: ++keyRef.current, role: 'assistant', results: data.results, events: data.events || [] },
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
          if (entry.role === 'rate-limited') {
            return (
              <div className="assistant__bubble assistant__bubble--bot" key={entry.key}>
                <p style={{ margin: 0 }}>{dict.portal.assistant.rateLimited}</p>
              </div>
            )
          }
          if (entry.role === 'gated') {
            return (
              <div className="assistant__bubble assistant__bubble--bot assistant__bubble--gated" key={entry.key}>
                <p style={{ margin: 0 }}>⚠️ {entry.message}</p>
                <p style={{ margin: '0.8rem 0 0' }}>
                  <Link className="btn btn--ghost" href={localizedPath(locale, '/contact')}>
                    {dict.portal.assistant.contactCta}
                  </Link>
                </p>
              </div>
            )
          }

          const eventsBlock = entry.events.length > 0 && (
            <div className="assistant__events">
              <p className="assistant__intro" style={{ marginTop: '0.9rem' }}>
                {dict.portal.assistant.eventsIntro}
              </p>
              <ul>
                {entry.events.map((event) => (
                  <li key={event.id}>
                    <span>🎉 {event.title}</span>
                    <span className="assistant__event-date">
                      {formatDateWithWeekday(locale, event.eventDate)}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href={localizedPath(locale, '/portail/annonces')}>
                {dict.portal.assistant.eventsLink} →
              </Link>
            </div>
          )

          if (entry.results.length === 0) {
            return (
              <div className="assistant__bubble assistant__bubble--bot" key={entry.key}>
                <p style={{ margin: 0 }}>{dict.portal.assistant.fallback}</p>
                {eventsBlock}
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
              {eventsBlock}
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
