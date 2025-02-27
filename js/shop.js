let open_shop = true

if (open_shop === true) {
    document.documentElement.style.setProperty('--open-shop-1', 'none');
} else {
    document.documentElement.style.setProperty('--open-shop-2', 'none');
}


// Expresión regular para identificar hashtags válidos
const hashtagRegex = /#([a-zA-Z_][a-zA-Z0-9_]*)/g;

document.addEventListener('DOMContentLoaded', function() {
  // Función para buscar y envolver hashtags en <span>

  // Seleccionar todos los elementos <p> en la página
  const paragraphs = document.querySelectorAll('p');

  // Iterar sobre cada párrafo
  paragraphs.forEach((paragraph) => {
    // Reemplazar hashtags válidos con <span class="span-hashtags">
    paragraph.innerHTML = paragraph.innerHTML.replace(
      hashtagRegex,
      '<span class="span-hashtags">#$1</span>'
    );
  });
});