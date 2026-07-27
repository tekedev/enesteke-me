import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

export default function SEO({
  title = 'Enes Teke — Full-Stack Developer & AI Systems Engineer',
  description = 'Portfolio of Enes Teke, a full-stack developer and AI systems engineer building agentic AI, automation, computer vision and scalable digital products.',
  url = 'https://enesteke.me',
  image = 'https://enesteke.me/ogp.jpg',
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    // Update meta tags
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', url);

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', image);
  }, [title, description, url, image]);

  return null;
}
