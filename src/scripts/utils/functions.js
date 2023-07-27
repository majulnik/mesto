export function renderLoading(button) {
    if (button.style.opacity == 0.5) {
        button.innerText = 'Сохранено';
        button.style.opacity = 1;
    } else {
        button.innerText = 'Сохранение...';
        button.style.opacity = 0.5;
    }
}