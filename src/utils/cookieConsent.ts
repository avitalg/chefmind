const CONSENT_KEY = 'chefmind-cookie-consent';
const GA_ID = 'G-Q9CBEFR6PX';

export type CookieConsentValue = 'accepted' | 'declined';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function getCookieConsent(): CookieConsentValue | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    if (value === 'accepted' || value === 'declined') return value;
  } catch {
    // ignore storage errors
  }
  return null;
}

export function setCookieConsent(value: CookieConsentValue) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // ignore storage errors
  }
}

/** Load Google Analytics only after the user accepts cookies. */
export function enableAnalytics() {
  if (typeof window === 'undefined') return;
  if (document.getElementById('gtag-js')) return;

  window.dataLayer = window.dataLayer || [];
  // Match Google's snippet: push the Arguments object so queued commands work
  window.gtag = function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);

  const script = document.createElement('script');
  script.id = 'gtag-js';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}
