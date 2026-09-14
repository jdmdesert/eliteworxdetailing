"use client";

import { FormEvent, useState } from "react";

const packages = [
  {
    name: "Basic",
    price: "$60+",
    note: "Perfect for routine maintenance",
    features: [
      "Exterior hand wash",
      "Wheel and tire cleaning",
      "Tire shine",
      "Windows inside and out",
      "Quick interior vacuum",
      "Dashboard, console and cupholder wipe",
      "Door jamb wipe down",
    ],
  },
  {
    name: "Elite",
    price: "$120+",
    note: "A deeper clean with added protection",
    featured: true,
    features: [
      "Everything in Basic",
      "Synthetic wax protection",
      "Deep vacuum — seats and carpets",
      "Interior UV protectant",
      "Seat and floor mat cleaning",
      "Trunk detailing",
      "Bug, tar and exterior trim treatment",
    ],
  },
];

const socials = [
  ["Instagram", "https://www.instagram.com/elitee_worx?igsh=MXJvYmd5OWxudzl5aQ==", "fa-brands fa-instagram"],
  ["TikTok", "https://www.tiktok.com/@worxxiufcap", "fa-brands fa-tiktok"],
  ["Google Business", "https://share.google/121C5rF1ZcLxDsnUq", "fa-brands fa-google"],
];

export default function Home() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  async function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");
    const form = event.currentTarget;
    const fields = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/adrenersouza@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: fields.get("name"),
          email: fields.get("email"),
          phone: fields.get("phone"),
          vehicle: fields.get("vehicle"),
          package: fields.get("package"),
          message: fields.get("message"),
          _subject: "New Quote Request — Elite Worx Detailing",
          _cc: "6232567184@vtext.com",
          _template: "table",
        }),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      form.reset();
      setStatus("Quote request sent. We’ll be in touch soon.");
    } catch {
      setStatus("We couldn’t send your request. Please call or text (623) 256-7184.");
    } finally {
      setSending(false);
    }
  }

  function selectPackage(name: string) {
    const field = document.querySelector<HTMLSelectElement>("#package");
    if (field) field.value = name === "Basic" ? "Basic — $60+" : "Elite — $120+";
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Elite Worx home">
          <img src="/logo-no-lines.png" alt="Elite Worx Detailing" />
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          <span />
          <span />
        </button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Main navigation">
          <a href="#why-us" onClick={() => setMenuOpen(false)}>Why Us</a>
          <a href="#packages" onClick={() => setMenuOpen(false)}>Packages</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="header-actions">
          <div className="social-links" aria-label="Quick links">
            <a href="tel:6232567184" aria-label="Call Elite Worx"><i className="fa-solid fa-phone" /></a>
            {socials.map(([label, href, icon]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><i className={icon} /></a>
            ))}
          </div>
          <a className="button small" href="#booking">Book Now</a>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="mobile-hero-socials" aria-label="Social media and contact quick links">
            <a href="tel:6232567184" aria-label="Call Elite Worx"><i className="fa-solid fa-phone" /></a>
            {socials.map(([label, href, icon]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><i className={icon} /></a>
            ))}
          </div>
          <p className="eyebrow">Premium mobile detailing · Greater Phoenix area</p>
          <h1>We bring the<br />detail shop to you</h1>
          <span className="red-line" />
          <p className="hero-copy">A higher standard of vehicle care, delivered wherever you are.</p>
          <div className="hero-actions">
            <a className="button" href="#booking">Book Your Detail <span aria-hidden="true">→</span></a>
            <a className="phone-link" href="tel:6232567184">Call (623) 256-7184</a>
          </div>
        </div>
        <a className="scroll-cue" href="#why-us">Explore <span aria-hidden="true">↓</span></a>
      </section>

      <section className="section intro" id="why-us">
        <div className="section-heading">
          <p className="eyebrow">Why Elite Worx</p>
          <h2>We come to you.</h2>
          <p>No drop-offs. No waiting rooms. We arrive fully equipped and leave your vehicle looking its best.</p>
        </div>
        <div className="benefits">
          <article><span>01</span><h3>Fully Mobile</h3><p>At your home, office, or anywhere in the Valley.</p></article>
          <article><span>02</span><h3>Pro-Grade Results</h3><p>Premium products and refined techniques on every vehicle.</p></article>
          <article><span>03</span><h3>Local Care</h3><p>Proudly serving the Greater Phoenix area and surrounding cities.</p></article>
        </div>
      </section>

      <section className="section packages" id="packages">
        <div className="section-heading compact">
          <p className="eyebrow">Simple pricing</p>
          <h2>Choose your package.</h2>
          <p>Pricing varies by vehicle size. Request a quote for an exact total.</p>
        </div>
        <div className="package-grid">
          {packages.map((item) => (
            <article className={item.featured ? "package featured" : "package"} key={item.name}>
              <div className="package-top">
                <div>
                  {item.featured && <p className="popular">Most popular</p>}
                  <h3>{item.name}</h3>
                  <p>{item.note}</p>
                </div>
                <strong>{item.price}</strong>
              </div>
              <ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <a className={item.featured ? "button" : "text-button"} href="#booking" onClick={() => selectPackage(item.name)}>Select {item.name} <span>→</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="booking" id="booking">
        <div className="booking-copy">
          <p className="eyebrow">Get a quote</p>
          <h2>Tell us about<br />your vehicle.</h2>
          <p>Share a few details and we’ll get back to you with pricing and availability.</p>
          <div className="direct-contact">
            <a href="tel:6232567184">Call (623) 256-7184</a>
            <a href="sms:6232567184">Text us</a>
          </div>
        </div>
        <form className="quote-form" onSubmit={submitQuote}>
          <label>Full name<input name="name" placeholder="Your name" required /></label>
          <label>Email<input type="email" name="email" placeholder="you@email.com" required /></label>
          <label>Phone number<input type="tel" name="phone" placeholder="(___) ___-____" required /></label>
          <label>Vehicle<input name="vehicle" placeholder="Year / make / model" required /></label>
          <label>Package<select id="package" name="package" defaultValue="" required><option value="" disabled>Select a package</option><option value="Basic — $60+">Basic — Starting at $60</option><option value="Elite — $120+">Elite — Starting at $120</option></select></label>
          <label className="wide">Additional details<textarea name="message" placeholder="Stains, pet hair, preferred date or anything else we should know." /></label>
          <button className="button wide" type="submit" disabled={sending}>{sending ? "Sending…" : "Send Quote Request"} <span>→</span></button>
          {status && <p className="form-status wide" role="status">{status}</p>}
        </form>
      </section>

      <footer id="contact">
        <div className="footer-main">
          <div className="footer-brand"><img src="/logo-no-lines.png" alt="Elite Worx Detailing" /><p>Premium mobile auto detailing serving the Greater Phoenix area and surrounding cities.</p></div>
          <div><p className="footer-label">Contact</p><a href="tel:6232567184">(623) 256-7184</a><a href="mailto:adrenersouza@gmail.com">adrenersouza@gmail.com</a><span>Greater Phoenix area and surrounding cities</span></div>
          <div><p className="footer-label">Quick links</p><div className="footer-social-links"><a href="tel:6232567184" aria-label="Call Elite Worx"><i className="fa-solid fa-phone" /></a>{socials.map(([label, href, icon]) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><i className={icon} /></a>)}</div></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Elite Worx Detailing</span><a href="#home">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
