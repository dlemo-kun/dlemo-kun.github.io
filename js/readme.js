document.addEventListener('DOMContentLoaded', function() {
    async function loadReadme() {
        try {
            const response = await fetch('/README.md');
            if (!response.ok) {
                throw new Error(`Error al cargar el archivo: ${response.status} ${response.statusText}`);
            }
            const readmeText = await response.text();
            document.getElementById('readme').textContent = readmeText;
        } catch (error) {
            document.getElementById('readme').textContent = `Error al cargar la README: ${error.message}`;
        }
    }
    loadReadme();
});