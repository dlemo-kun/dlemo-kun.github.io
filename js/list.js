document.addEventListener('DOMContentLoaded', function() {
    fetch('map.xml')
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => {
            const urls = Array.from(data.querySelectorAll('url'));
            const validUrls = urls.filter(url => {
                const loc = url.querySelector('loc').textContent;
                return !loc.endsWith('/');
            });
            
            validUrls.sort((a, b) => {
                const dateA = new Date(a.querySelector('lastmod').textContent);
                const dateB = new Date(b.querySelector('lastmod').textContent);
                return dateB - dateA; // Orden descendente (más reciente primero)
            });
            
            const ol = document.getElementById('list');
            ol.innerHTML = '';
            
            validUrls.forEach(url => {
                const loc = url.querySelector('loc').textContent;
                const lastmod = url.querySelector('lastmod').textContent;
                const name = loc.split('/').pop().replace(/_/g, ' ');
                
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = loc;
                a.textContent = name.charAt(0).toUpperCase() + name.slice(1);
                
                li.appendChild(a);
                ol.appendChild(li);
            });
        })
        .catch(error => console.error('Error al cargar el mapa del sitio:', error));
});