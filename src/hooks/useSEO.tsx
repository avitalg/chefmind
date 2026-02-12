import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

const defaultTitle = 'ChefMind - Your Personal Recipe Collection';
const defaultDescription = 'ChefMind is a modern recipe management application that makes it easy to collect, organize, and customize recipes from any website. Import recipes, edit ingredients, and build your perfect recipe collection.';
const defaultImage = '/chefmind.png';
const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';

export function useSEO({
  title,
  description = defaultDescription,
  keywords = 'recipes, cooking, recipe management, recipe collection, food, chef, ingredients, cooking app',
  image = defaultImage,
  url,
  type = 'website',
  structuredData,
}: SEOProps = {}) {
  useEffect(() => {
    // Update title
    const fullTitle = title ? `${title} | ChefMind` : defaultTitle;
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', image.startsWith('http') ? image : `${siteUrl}${image}`, 'property');
    updateMetaTag('og:type', type, 'property');
    if (url) {
      updateMetaTag('og:url', url.startsWith('http') ? url : `${siteUrl}${url}`, 'property');
    } else {
      updateMetaTag('og:url', siteUrl, 'property');
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image.startsWith('http') ? image : `${siteUrl}${image}`);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl);

    // Structured data (JSON-LD)
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (structuredData) {
      if (!structuredDataScript) {
        structuredDataScript = document.createElement('script');
        structuredDataScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(structuredDataScript);
      }
      structuredDataScript.textContent = JSON.stringify(structuredData);
    } else if (structuredDataScript) {
      structuredDataScript.remove();
    }

    // Cleanup function
    return () => {
      // Optionally reset to defaults on unmount
    };
  }, [title, description, keywords, image, url, type, structuredData]);
}
