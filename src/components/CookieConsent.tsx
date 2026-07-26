import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addUtmToPath } from '../utils/utm';
import {
  enableAnalytics,
  getCookieConsent,
  isEuropeanVisitor,
  setCookieConsent,
  type CookieConsentValue,
} from '../utils/cookieConsent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const existing = getCookieConsent();
      if (existing === 'accepted') {
        enableAnalytics();
        return;
      }
      if (existing === 'declined') {
        return;
      }

      const inEurope = await isEuropeanVisitor();
      if (cancelled) return;

      if (inEurope) {
        setVisible(true);
      } else {
        // Outside Europe: no consent banner; enable analytics by default
        enableAnalytics();
      }
    }

    void init();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChoice = (value: CookieConsentValue) => {
    setCookieConsent(value);
    if (value === 'accepted') {
      enableAnalytics();
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed bottom-0 inset-x-0 z-[100] p-4 sm:p-6 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-3xl mx-auto bg-paper border border-border-warm rounded-2xl shadow-lg p-5 sm:p-6">
        <h2 id="cookie-consent-title" className="text-lg font-bold text-ink mb-2">
          We use cookies
        </h2>
        <p id="cookie-consent-desc" className="text-sm text-body leading-relaxed mb-5">
          We use cookies and similar technologies to keep you signed in and to understand how
          ChefMind is used (via Google Analytics). You can accept analytics cookies or continue
          with essential cookies only.{' '}
          <Link
            to={addUtmToPath('/about', { utm_content: 'cookie_consent' })}
            className="text-teal font-semibold hover:text-teal-dark underline underline-offset-2"
          >
            Learn more
          </Link>
        </p>
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            onClick={() => handleChoice('declined')}
            className="btn-secondary py-2.5 px-5"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className="btn-primary py-2.5 px-5"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
