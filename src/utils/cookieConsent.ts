const CONSENT_KEY = 'chefmind-cookie-consent';
const REGION_KEY = 'chefmind-cookie-region';
const GA_ID = 'G-Q9CBEFR6PX';

export type CookieConsentValue = 'accepted' | 'declined';

/** EU + EEA + UK + Switzerland (common GDPR cookie-consent scope) */
const EUROPE_COUNTRY_CODES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  'IS', 'LI', 'NO', // EEA
  'GB', 'UK', // UK
  'CH', // Switzerland
]);

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

function cacheRegion(isEurope: boolean) {
  try {
    localStorage.setItem(REGION_KEY, isEurope ? 'eu' : 'other');
  } catch {
    // ignore
  }
}

function getCachedRegion(): boolean | null {
  try {
    const value = localStorage.getItem(REGION_KEY);
    if (value === 'eu') return true;
    if (value === 'other') return false;
  } catch {
    // ignore
  }
  return null;
}

function isEuropeTimezone(): boolean {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    return (
      tz.startsWith('Europe/') ||
      tz === 'Atlantic/Reykjavik' ||
      tz === 'Atlantic/Faroe' ||
      tz === 'Atlantic/Canary' ||
      tz === 'Atlantic/Madeira' ||
      tz === 'Atlantic/Azores'
    );
  } catch {
    return false;
  }
}

/**
 * Detect whether the visitor is in Europe.
 * Uses a lightweight geo IP lookup, with timezone as fallback.
 */
export async function isEuropeanVisitor(): Promise<boolean> {
  const cached = getCachedRegion();
  if (cached !== null) return cached;

  try {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 2500);
    const response = await fetch('https://ipapi.co/country/', {
      signal: controller.signal,
    });
    window.clearTimeout(timeout);

    if (response.ok) {
      const country = (await response.text()).trim().toUpperCase();
      const inEurope = EUROPE_COUNTRY_CODES.has(country);
      cacheRegion(inEurope);
      return inEurope;
    }
  } catch {
    // fall through to timezone heuristic
  }

  const inEurope = isEuropeTimezone();
  cacheRegion(inEurope);
  return inEurope;
}

/** Load Google Analytics only after the user accepts cookies (or outside Europe). */
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
