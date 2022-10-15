const toggleMenuElement = document.getElementById('menubtn');
const mainMenuElement = document.getElementById('navbar_buttons');

toggleMenuElement.addEventListener('click', () => {
    mainMenuElement.classList.toggle('menu_show');
    toggleMenuElement.classList.toggle('highlight');
    console.log('working');
});