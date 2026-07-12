import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container text-center" style={{ maxWidth: '560px' }}>
        <p className="eyebrow">404</p>
        <h1>
          Page introuvable / <em>Page not found</em>
        </h1>
        <Link className="btn btn--primary mt-2" href="/">
          Accueil / Home
        </Link>
      </div>
    </section>
  )
}
