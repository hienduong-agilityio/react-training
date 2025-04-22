import { useEffect } from 'react';

const usePageSeo = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl
}: {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
}) => {
  useEffect(() => {
    document.title = title;

    setMetaTags('name', 'description', description);
    setMetaTags('name', 'keywords', keywords ?? '');
    setMetaTags('property', 'og:title', ogTitle ?? title);
    setMetaTags('property', 'og:description', ogDescription ?? description);
    setMetaTags('property', 'og:image', ogImage ?? '');
    setMetaTags('property', 'og:url', ogUrl ?? window.location.href);

    return () => {
      // Clean up meta tags on component unmount
    };
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl]);

  const setMetaTags = (attr: string, key: string, content: string) => {
    if (content) {
      let element = document.querySelector(`meta[${attr}="${key}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    }
  };
};

export { usePageSeo };
