const themeToggle = document.querySelector('[data-theme-toggle]');
const root = document.documentElement;
const STORAGE_KEY = 'theme-preference';

// Hämta sparat tema (eller 'system' som standard)
let currentTheme = localStorage.getItem(STORAGE_KEY) || 'system';

// Tillämpa temat på <html>
function applyTheme(theme) {
  if (theme === 'system') {
    root.style.removeProperty('color-scheme'); // Faller tillbaka på CSS (:root)
  } else {
    root.style.colorScheme = theme; // Tvingar 'light' eller 'dark'
  }
  
  updateButton(theme);
}

// Uppdatera knappens text/ikon och tillgänglighets-attribut
function updateButton(theme) {
  if (!themeToggle) return;
  
  const labels = {
    system: 'Tema: System',
    light: 'Tema: Ljust',
    dark: 'Tema: Mörkt'
  };
  
  themeToggle.textContent = labels[theme];
  themeToggle.setAttribute('aria-label', `Byt färgtema (nuvarande: ${labels[theme]})`);
}

// Kör direkt vid laddning
applyTheme(currentTheme);

// Växla läge vid klick (system -> light -> dark -> system)
themeToggle?.addEventListener('click', () => {
  const order = ['system', 'light', 'dark'];
  currentTheme = order[(order.indexOf(currentTheme) + 1) % order.length];
  
  if (currentTheme === 'system') {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, currentTheme);
  }
  
  applyTheme(currentTheme);
});
