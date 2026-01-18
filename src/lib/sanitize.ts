import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks.
 * Only allows safe HTML tags and attributes commonly used in blog content.
 */
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'h2', 'h3', 'strong', 'em', 'u', 
      'ul', 'ol', 'li', 
      'blockquote', 'code', 
      'br', 'span'
    ],
    ALLOWED_ATTR: ['class'],
  });
};
