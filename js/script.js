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
  // Pre-Footer Standar
  insertFile('/hdl/pre-footer.hdl', '[data-pre-f-hdl]');
  insertRandomFile('/hdl/pre-footer.hdl', '[data-carta-hdl]', 3);
  // Footer
  insertFile('/hdl/footer.hdl', '[data-f-hdl]');
  
  // Pone los colores de navidad
  if (currentDate >= startDate && currentDate <= endDate) {
    document.documentElement.style.setProperty('--color-1', '#554d4d'); // Rojo apagado
    document.documentElement.style.setProperty('--color-2', '#d6c5c5'); // Blanco rosado
    document.documentElement.style.setProperty('--color-3', '#c0392b'); // Rojo oscuro
    const subtitleElement = document.getElementById('id-subtitle-hero-h2');
    if (subtitleElement) {
      subtitleElement.textContent = messages[Math.floor(Math.random() * messages.length)]; // Subtitulo del hero
    } else {
      console.error('IDが "id-subtitle-hero-h2" の要素がDOMに見つかりませんでした。');
    }
  }
});