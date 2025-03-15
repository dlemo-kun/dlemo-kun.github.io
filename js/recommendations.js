document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const listItems = document.querySelectorAll('.ul-list li');

    searchInput.addEventListener('input', (event) => {
        const searchText = event.target.value.toLowerCase();

        listItems.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            hideEmptySections();
            if (itemText.includes(searchText)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });

    function hideEmptySections() {
        // Selecciona todas las etiquetas <section>
        const sections = document.querySelectorAll('section');
        const visibleSections = [];
    
        sections.forEach(section => {
            // Busca <ul> con la clase 'ul-list' dentro de la sección
            const ul = section.querySelector('ul.ul-list');
    
            if (ul) {
                // Busca todos los <li> dentro del <ul>
                const lis = ul.querySelectorAll('li');
    
                // Verifica si no hay <li> o si todos los <li> tienen display: none
                const shouldHide = lis.length === 0 || Array.from(lis).every(li => {
                    const style = window.getComputedStyle(li);
                    return style.display === 'none';
                });
    
                // Aplica display: none o display: flex según la condición
                section.style.display = shouldHide ? 'none' : 'flex';
    
                // Si la sección es visible, la agregamos al array de secciones visibles
                if (section.style.display === 'flex') {
                    visibleSections.push(section);
                }
            } else {
                // Si no hay <ul> con la clase 'ul-list', muestra la sección como flex
                section.style.display = 'flex';
                visibleSections.push(section);
            }
        });
    
        // Alternar clases en las secciones visibles
        const isEven = visibleSections.length % 2 === 0;
    
        visibleSections.forEach((section, index) => {
            // Elimina las clases existentes
            section.classList.remove('class-style-white', 'class-style-black');
    
            // Alterna las clases según la posición y si la cantidad es par o impar
            if (isEven) {
                section.classList.add(index % 2 === 0 ? 'class-style-black' : 'class-style-white');
            } else {
                section.classList.add(index % 2 === 0 ? 'class-style-white' : 'class-style-black');
            }
        });
    }
    
    // Ejecuta la función
    hideEmptySections();
});