document.querySelectorAll("button[data-mail]").forEach(btn => {
    const user = btn.dataset.user;
    const domain = btn.dataset.domain;
    const tld = btn.dataset.tld;
    const cls = btn.dataset.class;

    const email = `${user}@${domain}.${tld}`;


    btn.addEventListener("click", () => {
        const a = document.createElement('a');
        a.textContent = email;
        a.href = `mailto:${email}`;
        a.classList.add(cls);
        btn.replaceWith(a);
    });
});