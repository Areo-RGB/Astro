// ===================================
// SVG Icon Definitions (Lucide-style)
// ===================================

export const icons = {
  arrowLeft: `<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="m12 19-7-7 7-7M19 12H5"/>
  </svg>`,
  
  arrowUp: `<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="m5 12 7-7 7 7M12 19V5"/>
  </svg>`,
  
  arrowDown: `<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="m19 12-7 7-7-7M12 5v14"/>
  </svg>`,
  
  maximize: `<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <polyline points="15 3 21 3 21 9"/>
    <polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/>
    <line x1="3" y1="21" x2="10" y2="14"/>
  </svg>`,
  
  minimize: `<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <polyline points="4 14 10 14 10 20"/>
    <polyline points="20 10 14 10 14 4"/>
    <line x1="14" y1="10" x2="21" y2="3"/>
    <line x1="3" y1="21" x2="10" y2="14"/>
  </svg>`,
  
  droplet: `<svg class="icon icon-xl" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
  </svg>`,
  
  calculator: `<svg class="icon icon-xl" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="2" width="16" height="20" rx="2"/>
    <line x1="8" y1="6" x2="16" y2="6"/>
    <line x1="8" y1="10" x2="8" y2="10.01"/>
    <line x1="12" y1="10" x2="12" y2="10.01"/>
    <line x1="16" y1="10" x2="16" y2="10.01"/>
    <line x1="8" y1="14" x2="8" y2="14.01"/>
    <line x1="12" y1="14" x2="12" y2="14.01"/>
    <line x1="16" y1="14" x2="16" y2="14.01"/>
    <line x1="8" y1="18" x2="8" y2="18.01"/>
    <line x1="12" y1="18" x2="12" y2="18.01"/>
    <line x1="16" y1="18" x2="16" y2="18.01"/>
  </svg>`,
  
  mic: `<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="22"/>
  </svg>`,
  
  check: `<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <polyline points="20 6 9 17 4 12"/>
  </svg>`,
  
  x: `<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>`,
  
  rotateCcw: `<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>`,
  
  infinity: `<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>
  </svg>`
};

export function getIcon(name, className = '') {
  const icon = icons[name];
  if (!icon) return '';
  
  if (className) {
    return icon.replace('class="icon"', `class="icon ${className}"`);
  }
  return icon;
}
