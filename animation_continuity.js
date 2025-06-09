const el = document.querySelector('.hero-background');
if (el) {
    const elapsed = Date.now() % 240000;
    el.style.animationDelay = `-${elapsed}ms`;
}