const fs = require('fs');

// --- EMOJI TO SVG ICONS (index.html) ---
let html = fs.readFileSync('index.html', 'utf8');

const getIcon = (paths) => `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

const iconMap = {
  '🎓': getIcon('<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>'),
  '🏆': getIcon('<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>'),
  '🦾': getIcon('<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 7.5a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M10 5.5a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M6 10a2 2 0 0 0-2 2v10a8 8 0 0 0 12.3-6.9L18 11Z"/>'),
  '🧬': getIcon('<path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.598 3-4.111 3-7.25C12 11.607 10.798 9.094 9 7.5"/><path d="M15 2c-1.798 1.598-3 4.111-3 7.25C12 12.393 13.202 14.906 15 16.5"/><path d="M7 11h10"/><path d="M7 15h10"/><path d="M7 19h10"/><path d="M7 23h10"/>'),
  '🥈': getIcon('<circle cx="12" cy="12" r="8"/><path d="M12 4v8l4 2"/>'),
  '🌍': getIcon('<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>'),
  '⚡': getIcon('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
  '🏅': getIcon('<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>'),
  '❤️': getIcon('<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>'),
  '🏥': getIcon('<rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>'),
  '⚙️': getIcon('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>'),
  '📈': getIcon('<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>'),
  '📚': getIcon('<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>'),
  '🔬': getIcon('<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1v0a1 1 0 0 0-1 1v3"/>'),
  '🛠️': getIcon('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'),
  '💻': getIcon('<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>'),
  '🤖': getIcon('<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.9 1.15l-2.07-5.11C3.33 11.38 2 8.35 2 6.5 2 4.01 4.01 2 6.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.9 1.15l2.07-5.11C20.67 11.38 22 8.35 22 6.5 22 4.01 19.99 2 17.5 2Z"/>'),
  '🌐': getIcon('<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>'),
  '🤝': getIcon('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
  '🧠': getIcon('<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.9 1.15l-2.07-5.11C3.33 11.38 2 8.35 2 6.5 2 4.01 4.01 2 6.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.9 1.15l2.07-5.11C20.67 11.38 22 8.35 22 6.5 22 4.01 19.99 2 17.5 2Z"/>'),
  '🦿': getIcon('<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 7.5a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M10 5.5a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M6 10a2 2 0 0 0-2 2v10a8 8 0 0 0 12.3-6.9L18 11Z"/>'),
  '✉️': getIcon('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'),
  '📞': getIcon('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'),
  '💼': getIcon('<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'),
  '📍': getIcon('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>')
};

for (const [emoji, iconStr] of Object.entries(iconMap)) {
  html = html.split(emoji).join(iconStr);
}
fs.writeFileSync('index.html', html);

// --- CSS COLOR PALETTE UPDATE (styles.css) ---
let css = fs.readFileSync('styles.css', 'utf8');

const newVars = `:root {
  /* Core palette - Warm Editorial Luxury */
  --navy:        #2B1F18; /* Espresso */
  --navy-mid:    #4A3428; /* Coffee */
  --steel:       #6E3F22; /* Cognac */
  --steel-light: #B9855A; /* Camel */
  --steel-xlight:#D6BEA3; /* Sand */
  --teal:        #8C5A3C; /* Caramel */
  --teal-light:  #B9855A; /* Camel */
  --teal-xlight: #D6BEA3; /* Sand */

  /* Backgrounds */
  --bg:          #F5F0E8; /* Ivory */
  --bg-section:  #E8DCCB; /* Beige */
  --bg-card:     #D6BEA3; /* Sand */

  /* Text */
  --charcoal:    #2B1F18; /* Espresso */
  --text-mid:    #4A3428; /* Coffee */
  --text-light:  #7E6551; /* Warm Grayish Brown */
  --text-xlight: #A58B75; /* Lighter Warm Brown */

  /* Borders & glass */
  --border:      rgba(185,133,90,0.18); /* Camel */
  --border-card: rgba(185,133,90,0.14); /* Camel */
  --glass-bg:    rgba(245,240,232,0.65); /* Ivory glass */

  /* Shadows */
  --shadow-xs:   0 1px 4px rgba(43,31,24,0.06);
  --shadow-sm:   0 2px 12px rgba(43,31,24,0.08);
  --shadow-md:   0 8px 30px rgba(43,31,24,0.10);
  --shadow-lg:   0 20px 60px rgba(43,31,24,0.12);`;

css = css.replace(/:root \{[\s\S]*?--shadow-lg:[^\n]*;/m, newVars);

// Replace specific RGBA hardcodes
css = css.replace(/30,42,68/g, '43,31,24');
css = css.replace(/74,144,226/g, '110,63,34');
css = css.replace(/111,183,183/g, '140,90,60');
css = css.replace(/250,251,252/g, '245,240,232');
css = css.replace(/200,223,248/g, '232,220,203');

// Update Vision Gradient values
css = css.replace(
  /linear-gradient\(135deg, #111E35 0%, #1E2A44 40%, #1a3848 70%, #152a38 100%\)/g,
  'linear-gradient(135deg, #1A130F 0%, #2B1F18 40%, #38291F 70%, #241A14 100%)'
);

// Update hero-name-accent to caramel
css = css.replace(/color: #7F9DB1;/g, 'color: #8C5A3C;');

// Update "color: #2a7a7a"
css = css.replace(/color: #2a7a7a;/g, 'color: var(--steel);');

fs.writeFileSync('styles.css', css);
console.log('Update Complete.');
