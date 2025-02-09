document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('insertFileUpdated', () => {
        console.log('Clases actualizadas, procesando enlaces...');
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/').filter(part => part !== '');
        const [_, year, currentMonthDir] = pathParts;
        const currentMonth = parseInt(currentMonthDir.split('-')[0]);

        const prev = getAdjacentMonth(currentMonth, year, -1);
        const next = getAdjacentMonth(currentMonth, year, 1);

        setupLinks('.tag0003', prev);
        setupLinks('.tag0004', next);
    });

    // Obtener el botón de compartir por su id
    // const compartirBtn = document.getElementById('compartirBtn');
    // if (navigator.share) {
        
    // }
    // compartirBtn.addEventListener('click', () => {
    //     if (navigator.share) {
    //         // Usar la API de Compartir Web si está disponible
    //         navigator.share({
    //             title: 'Blog // dlemo-kun',
    //             url: 'https://dlemo-kun.github.io/blog/2025/02-February/#02/04/2025'
    //         })
    //         .then(() => console.log('Contenido compartido exitosamente'))
    //         .catch((error) => console.error('Error al compartir:', error));
    //     }
    // });

    function getAdjacentMonth(currentMonth, currentYear, offset) {
        let month = currentMonth + offset;
        let year = parseInt(currentYear);

        if (month < 1) {
            month = 12;
            year--;
        } else if (month > 12) {
            month = 1;
            year++;
        }

        return {
            year: year,
            month: month.toString().padStart(2, '0'),
            folder: `${month.toString().padStart(2, '0')}-${getMonthName(month)}`
        };
    }

    function getMonthName(monthNumber) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[monthNumber - 1];
    }

    async function setupLinks(selector, target) {
        const url = `/blog/${target.year}/${target.folder}/index.html`;
        const url_end = `/blog/${target.year}/${target.folder}/?`;
        const links = document.querySelectorAll(selector);
        for (const link of links) {
            try {
                const response = await fetch(url, { method: 'HEAD' });
                if (response.ok) {
                    // Actualizar el atributo 'action' para <form>
                    link.action = url_end;

                    // Opcional: Si usas <a>, cambia esto:
                    // link.href = url;
                } else {
                    disableLink(link);
                }
            } catch (error) {
                console.error(`Error al verificar la URL "${url}":`, error);
                disableLink(link);
            }
        }
    }

    function disableLink(formElement) {
        if (!formElement) {
            console.error('Elemento no encontrado en disableLink.');
            return;
        }
        
        const button = formElement.querySelector('button');
        if (button) {
            button.disabled = "true";
        }
    }
});


