document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const listItems = document.querySelectorAll('.ul-list li');

    searchInput.addEventListener('input', (event) => {
        const searchText = event.target.value.toLowerCase();

        listItems.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            if (itemText.includes(searchText)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});