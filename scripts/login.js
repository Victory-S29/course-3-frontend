// Отримуємо посилання на елементи DOM
const loginImage = document.querySelector('.login-section__login-img');
const menu = document.querySelector('.menu');

loginImage.addEventListener('click', function() {
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
});