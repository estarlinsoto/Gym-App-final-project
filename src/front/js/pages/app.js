const menu = document.querySelector('#mobile_menu');
const menuLinks = document.querySelector('.navbar__menu');



menu.addEventListener('click', () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

