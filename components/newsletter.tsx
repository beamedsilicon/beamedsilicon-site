export function Newsletter() {
  return (
    <section className="nl" id="contact">
      <div className="wrap">
        <div className="nl-card">
          <div>
            <div className="nl-eye">GET IN TOUCH</div>
            <h2 className="nl-title">Contact Us</h2>
            <p className="nl-body">
              Have a tip, partnership inquiry, or question about our coverage? We&apos;d love to hear from
              you — whether you&apos;re a procurement lead, investor, engineer, or just passionate about
              semiconductors.
            </p>
          </div>
          <form
            className="nl-form"
            action="https://formspree.io/f/mdajrgwa"
            method="POST"
          >
            <div className="f-field">
              <label className="sr-only" htmlFor="ct-name">Your name</label>
              <input
                id="ct-name"
                className="f-in"
                type="text"
                name="name"
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </div>

            <div className="f-field">
              <label className="sr-only" htmlFor="ct-email">Your email address</label>
              <input
                id="ct-email"
                className="f-in"
                type="email"
                name="email"
                placeholder="Your email address"
                autoComplete="email"
                required
              />
            </div>

            <div className="f-field">
              <label className="sr-only" htmlFor="ct-message">Message</label>
              <textarea
                id="ct-message"
                className="f-in f-textarea"
                name="message"
                placeholder="Your message"
                rows={4}
                required
              />
            </div>

            <button className="f-btn" type="submit">
              SEND MESSAGE →
            </button>

            <p className="f-note">
              We typically respond within 1–2 business days.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}