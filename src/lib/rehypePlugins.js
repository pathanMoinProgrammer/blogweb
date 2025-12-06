import { visit } from 'unist-util-visit';

/**
 * Rehype plugin to add target="_blank" and rel="noopener noreferrer" to ALL links
 * Also ensures links have blue color styling class
 */
export function rehypeExternalLinks() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' && node.properties?.href) {
        const href = node.properties.href;
        
        // Add target="_blank" to ALL links (external and internal)
        node.properties.target = '_blank';
        node.properties.rel = 'noopener noreferrer';
        
        // Ensure proper styling class for links
        const existingClass = node.properties.className || [];
        const classArray = Array.isArray(existingClass) ? existingClass : [existingClass];
        if (!classArray.includes('text-link')) {
          node.properties.className = [...classArray, 'text-link'];
        }
        
        // Add aria-label for accessibility
        if (!node.properties['aria-label']) {
          const linkText = node.children?.find(c => c.type === 'text')?.value || 'link';
          node.properties['aria-label'] = `${linkText} (opens in new tab)`;
        }
      }
    });
  };
}

/**
 * Rehype plugin to fix image paths
 * Converts relative image paths to absolute paths
 */
export function rehypeFixImages() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img' && node.properties?.src) {
        const src = node.properties.src;
        
        // If path starts with / but not //, it's a local path
        if (src.startsWith('/') && !src.startsWith('//')) {
          // Keep as is - Next.js will serve from public folder
        }
        // If it's a relative path without /, prepend /
        else if (!src.startsWith('http') && !src.startsWith('/')) {
          node.properties.src = '/' + src;
        }
        
        // Add loading lazy for performance
        node.properties.loading = 'lazy';
        
        // Add decoding async for performance
        node.properties.decoding = 'async';
        
        // Ensure alt text exists for accessibility
        if (!node.properties.alt) {
          node.properties.alt = 'Blog image';
        }
      }
    });
  };
}
