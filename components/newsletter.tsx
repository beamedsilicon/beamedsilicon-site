export function Newsletter() {
  return (
    <section className="nl" id="newsletter">
      <div className="wrap">
        <div className="nl-card">
          <div>
            <div className="nl-eye">BEAMED SILICON BRIEFING</div>
            <h2 className="nl-title">The complete supply chain, in your inbox</h2>
            <p className="nl-body">
              Weekly: deep-dive analysis on fabs, equipment, materials, and policy — covering all 7 supply chain tiers
              and all 350 companies. Used by procurement leads, investors, and engineers at the world&apos;s leading
              semiconductor companies.
            </p>
          </div>
          {/* FIX: Added <label> elements for screen reader accessibility.
              Labels are visually hidden via .sr-only but present in the a11y tree. */}
          <form
            className="nl-form"
            action="https://formspree.io/f/mdajrgwa"
            method="POST"
          >
            <div className="f-field">
              <label className="sr-only" htmlFor="nl-name">Your name</label>
              <input
                id="nl-name"
                className="f-in"
                type="text"
                name="name"
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </div>

            <div className="f-field">
              <label className="sr-only" htmlFor="nl-email">Work email address</label>
              <input
                id="nl-email"
                className="f-in"
                type="email"
                name="email"
                placeholder="Work email address"
                autoComplete="email"
                required
              />
            </div>

            <button
              className="f-btn"
              type="submit"
            >
              SUBSCRIBE FREE →
            </button>

            <p className="f-note">
              No spam. Unsubscribe anytime. Read by 22,000+ semiconductor professionals.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}