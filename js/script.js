const currentYear = new Date().getFullYear();
// January February June December
// const startDateMerryChristmas = new Date(`January 15, ${currentYear}`);
// const startDateHappyBirthdayNotch = new Date(`June 1, ${currentYear}`);
// const endDateHappyBirthdayNotch = new Date(`June 2, ${currentYear}`);
const startDateHappyBirthdayNotch = new Date(`February 22, ${currentYear}`);
const endDateHappyBirthdayNotch = new Date(`February 23, ${currentYear}`);
const startDateHappyBirthdayDlemo_kun = new Date(`December 10, ${currentYear}`);
const endDateHappyBirthdayDlemo_kun = new Date(`December 11, ${currentYear}`);
const startDateMerryChristmas = new Date(`December 24, ${currentYear}`);
const endDateMerryChristmas = new Date(`January 1, ${currentYear}`);
const currentDate = new Date(); // eg Wed Dec 11 2024 07:31:41 GMT-0500 (hora estándar oriental)

let messagesHappyBirthdayNotch = [
  '¡Feliz cumpleaños, Notch!',
  'Happy Birthday, Notch!'
]
let messagesHappyBirthdayDlemo_kun = [
  '¡Feliz cumpleaños, dlemo-kun!',
  '¡Feliz cumpleaños, Diego!',
  'Happy Birthday, dlemo-kun!',
  'Happy Birthday, Diego!'
]
let messagesMerryChristmas = [
  'Feliz Navidad a todos',
  'Feliz Navidad a todos y año nuevo tambien',
  'Les deseamos una feliz Navidad',
  'Les deseamos una feliz Navidad y un próspero Año Nuevo',
  'Feliz Navidad',
  'Feliz Navidad, próspero año y felicidad',
  'Quiero desearte una feliz navidad',
  'Quiero desearte una Feliz Navidad desde el fondo de mi corazón',
  'We wish you a Merry Christmas',
  'We wish you a Merry Christmas and a Happy New Year',
  'I wanna wish you a Merry Christmas',
  'I wanna wish you a Merry Christmas from the bottom of my heart'
]

document.addEventListener('DOMContentLoaded', function() {
  // Busca datos dentro de los hdl 1.2
  function extractContent(fileContent, marker) {
    const startMarker = `${marker}={{`;
    const endMarker = '}}';
    
    const startIndex = fileContent.indexOf(startMarker);
    const endIndex = fileContent.indexOf(endMarker, startIndex);
    
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      const content = fileContent.substring(startIndex + startMarker.length, endIndex).trim();
      return content;
    } else {
      console.error(`No se encontró el contenido entre ${startMarker} y ${endMarker}.`);
      return null;
    }
  }
  function extractAllContents(fileContent, marker) {
    const startMarker = `${marker}={{`;
    const endMarker = '}}';
    const contents = [];
    let startIndex = 0;

    while (true) {
      const blockStart = fileContent.indexOf(startMarker, startIndex);
      if (blockStart === -1) break;

      const blockEnd = fileContent.indexOf(endMarker, blockStart);
      if (blockEnd === -1) break;

      const content = fileContent.substring(
        blockStart + startMarker.length,
        blockEnd
      ).trim();

      contents.push(content);
      startIndex = blockEnd + endMarker.length;
    }

    return contents;
  }

  // Inserta las plantillas en los html
  function insertFile(url, selector, insertFile = "insertFile", maxReplacements = 1) {
    maxReplacements = Math.max(0, Math.min(maxReplacements, 64));  // Límite de 64
    if (maxReplacements === 0) return;

    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`Error al cargar ${url}: ${response.statusText}`);
        const event = new Event('insertFileUpdated');
        document.dispatchEvent(event); 
        return response.text();
      })
      .then(fileContent => {
        const content = extractContent(fileContent, insertFile);
        if (!content) return;

        const placeholders = document.querySelectorAll(selector);
        const replacements = Math.min(maxReplacements, placeholders.length);

        if (placeholders.length < maxReplacements) {
          console.warn(`[${url}] Elementos encontrados: ${placeholders.length}/${maxReplacements}`);
        }

        Array.from(placeholders).slice(0, maxReplacements).forEach(placeholder => {
          const temp = document.createElement('div');
          temp.innerHTML = content;
          placeholder.replaceWith(...temp.childNodes);
        });
      })
      .catch(error => console.error("ERROR:", error));
  }
  function insertRandomFile(url, selector, maxReplacements = 1) {
    maxReplacements = Math.max(0, Math.min(maxReplacements, 64));  // Límite de 64
    if (maxReplacements === 0) return;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Error al cargar ${url}`);
            return response.text();
        })
        .then(fileContent => {
            const allContents = extractAllContents(fileContent, "insertRandomFile");
            if (allContents.length === 0) return;

            const placeholders = document.querySelectorAll(selector);
            const replacements = Math.min(maxReplacements, placeholders.length);

            if (placeholders.length < maxReplacements) {
                console.warn(`[${url}] Elementos encontrados: ${placeholders.length}/${maxReplacements}`);
            }

            // Registro de contenidos ya utilizados
            const usedContents = new Set();

            Array.from(placeholders).slice(0, maxReplacements).forEach(placeholder => {
                let availableContents = allContents.filter(content => !usedContents.has(content));

                if (availableContents.length === 0) {
                  const temp = document.createElement('div');
                  temp.innerHTML = "<!--  -->";
                  placeholder.replaceWith(...temp.childNodes);
                }

                const randomContent = availableContents[Math.floor(Math.random() * availableContents.length)];
                usedContents.add(randomContent); // Marcar como usado

                const temp = document.createElement('div');
                temp.innerHTML = randomContent;
                placeholder.replaceWith(...temp.childNodes);
            });
        })
        .catch(error => console.error("ERROR:", error));
}

  // Header
  insertFile('/hdl/header.hdl', '[data-h-hdl]');
  // Pre-Footer Blog
  insertFile('/hdl/pre-footer-blog.hdl', '[data-pre-f-blog-hdl]');
  insertRandomFile('/hdl/pre-footer-blog.hdl', '[data-carta-blog-hdl]', 3);
  // Pre-Footer Recommendations
  insertFile('/hdl/pre-footer-recommendations.hdl', '[data-pre-f-recommendations-hdl]');
  insertRandomFile('/hdl/pre-footer-recommendations.hdl', '[data-carta-recommendations-hdl]', 3);
  // Pre-Footer Standar
  insertFile('/hdl/pre-footer.hdl', '[data-pre-f-hdl]');
  insertRandomFile('/hdl/pre-footer.hdl', '[data-carta-hdl]', 3);
  // Footer
  insertFile('/hdl/footer.hdl', '[data-f-hdl]');
  
  // Pone el texto del cumpleaños de Notch
  if (currentDate > startDateHappyBirthdayNotch && currentDate < endDateHappyBirthdayNotch) {
    const subtitleElement = document.getElementById('id-subtitle-hero-h2');
    if (subtitleElement) {
      subtitleElement.textContent = messagesHappyBirthdayNotch[Math.floor(Math.random() * messagesHappyBirthdayNotch.length)]; // Subtitulo del hero
      subtitleElement.style.color = "#ffff55" // Subtitulo del hero
    } else {
      console.error('IDが "id-subtitle-hero-h2" の要素がDOMに見つかりませんでした。');
    }
  }
  // Pone el texto de mi cumpleaños
  if (currentDate > startDateHappyBirthdayDlemo_kun && currentDate < endDateHappyBirthdayDlemo_kun) {
    const subtitleElement = document.getElementById('id-subtitle-hero-h2');
    if (subtitleElement) {
      subtitleElement.textContent = messagesHappyBirthdayDlemo_kun[Math.floor(Math.random() * messagesHappyBirthdayDlemo_kun.length)]; // Subtitulo del hero
      subtitleElement.style.color = "var(--color-3)" // Subtitulo del hero
    } else {
      console.error('IDが "id-subtitle-hero-h2" の要素がDOMに見つかりませんでした。');
    }
  }
  // Pone los colores y texto de navidad
  if (currentDate > startDateMerryChristmas && currentDate < endDateMerryChristmas) {
    document.documentElement.style.setProperty('--color-1', '#554d4d'); // Rojo apagado
    document.documentElement.style.setProperty('--color-2', '#d6c5c5'); // Blanco rosado
    document.documentElement.style.setProperty('--color-3', '#c0392b'); // Rojo oscuro
    const subtitleElement = document.getElementById('id-subtitle-hero-h2');
    if (subtitleElement) {
      subtitleElement.textContent = messagesMerryChristmas[Math.floor(Math.random() * messagesMerryChristmas.length)]; // Subtitulo del hero
    } else {
      console.error('IDが "id-subtitle-hero-h2" の要素がDOMに見つかりませんでした。');
    }
  }
});