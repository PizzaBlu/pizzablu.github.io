{
    const rows = document.querySelectorAll(".plugin-row");
    const headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
    const nav = document.getElementById("nav-list");

    function getHeaderAbove(row) {
        let closest = null;
        const rowY = row.getBoundingClientRect().top + window.scrollY;

        for (const h of headings) {
            const hY = h.getBoundingClientRect().top + window.scrollY;
            if (hY <= rowY) closest = h;
        }

        return closest;
    }

    function updateActiveRow() {
        const viewportCenter = window.scrollY + window.innerHeight / 2;

        let closestRow = null;
        let minDistance = Infinity;

        for (const row of rows) {
            const rowRect = row.getBoundingClientRect();
            const rowCenter = window.scrollY + rowRect.top + rowRect.height / 2;
            const distance = Math.abs(viewportCenter - rowCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestRow = row;
            }
        }

        for (const item of nav.children) {
            item.classList.remove("active");
        }

        if (closestRow && minDistance < window.innerHeight/2) {
            const header = getHeaderAbove(closestRow);
            if (header) {
                const navItem = document.getElementById(`nav-${header.id}`);
                if (navItem) navItem.classList.add("active");
            }
        }
    }

    // throttle with requestAnimationFrame for performance
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveRow();
                ticking = false;
            });
            ticking = true;
        }
    });

    updateActiveRow();
}