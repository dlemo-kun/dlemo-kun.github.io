const currentYear = new Date().getFullYear();
const startDate = new Date(`December 15, ${currentYear}`);
const endDate = new Date(`December 26, ${currentYear}`);
const currentDate = new Date(); // eg Wed Dec 11 2024 07:31:41 GMT-0500 (hora estándar oriental)
let messages = [
  'We wish you a Merry Christmas',
  'We wish you a Merry Christmas',
  'We wish you a Merry Christmas and a Happy New Year',
  'I wanna wish you a Merry Christmas',
  'I wanna wish you a Merry Christmas',
  'I wanna wish you a Merry Christmas from the bottom of my heart'
];

if (currentDate >= startDate && currentDate <= endDate) {
  document.documentElement.style.setProperty('--color-1', '#554d4d'); // Rojo apagado
  document.documentElement.style.setProperty('--color-2', '#d6c5c5'); // Blanco rosado
  document.documentElement.style.setProperty('--color-3', '#c0392b'); // Rojo oscuro
  document.getElementById('id-subtitle-hero-h2').textContent = messages[Math.floor(Math.random() * messages.length)]; // Subtitulo de hero
}
