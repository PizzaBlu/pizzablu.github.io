document.addEventListener('DOMContentLoaded', () => {
    const STARTTIME = 'background_animation_start_time';
    
    const el = document.querySelector('.hero-background');
    if (!el) return;

    // get current duration from CSS
    const style = getComputedStyle(el);
    const durationStr = style.animationDuration;
    let duration = 0;

    if (durationStr.endsWith('ms')) {
        duration = parseFloat(durationStr);
    } else if (durationStr.endsWith('s')) {
        duration = parseFloat(durationStr) * 1000;
    }

    const storedStart = parseInt(localStorage.getItem(STARTTIME), 10);
    const startTime = !isNaN(storedStart) ? storedStart : Date.now();
    localStorage.setItem(STARTTIME, startTime.toString());

    const elapsed = (Date.now() - startTime) % duration;
    el.style.animationDelay = `-${elapsed}ms`;
});