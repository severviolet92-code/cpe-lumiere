import Link from 'next/link'

/**
 * A small banner on the admin dashboard home linking to the system-health
 * page. Server component (no interactivity needed) rendered by Payload's
 * `beforeDashboard` slot.
 */
export function SystemHealthLink() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap',
        padding: '0.9rem 1.2rem',
        marginBottom: '1.5rem',
        borderRadius: '12px',
        background: 'var(--theme-elevation-50)',
        border: '1px solid var(--theme-elevation-100)',
      }}
    >
      <span style={{ fontSize: '0.9rem' }}>
        🩺 État du système — base de données, courriel, stockage, planificateur.
      </span>
      <Link
        href="/api/system-health"
        target="_blank"
        rel="noopener"
        style={{ fontWeight: 700, whiteSpace: 'nowrap' }}
      >
        Ouvrir le tableau de bord santé →
      </Link>
    </div>
  )
}
