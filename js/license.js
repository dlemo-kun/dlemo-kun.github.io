document.addEventListener('DOMContentLoaded', function() {
    async function loadLicense() {
        try {
            const response = await fetch('/LICENSE.md');
            if (!response.ok) {
                throw new Error(`Error al cargar el archivo: ${response.status} ${response.statusText}`);
            }
            const licenseText = await response.text();
            document.getElementById('license').textContent = licenseText;
        } catch (error) {
            document.getElementById('license').textContent = `Error al cargar la licencia: ${error.message}`;
        }
    }
    loadLicense();
});