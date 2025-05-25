const weights = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];

class Font {
    constructor(name) {
        this.name = name;
    }

    sample(text, weight, caps) {
        const parent = document.createElement('div');
        parent.classList.add('font-container');

        let casetext = this.name;
        console.log(caps);
        if (caps === "lower") casetext = casetext.toLowerCase();
        if (caps === "upper") casetext = casetext.toUpperCase();

        const el = document.createElement('h3');
        el.appendChild(document.createTextNode(casetext));
        el.style.fontFamily = `"${this.name}", "Courier New"`;
        el.style.fontWeight = weight;

        if (text) {
            const alt = document.createElement('span');
            alt.classList.add('fontname-alt');
            alt.appendChild(document.createTextNode(' ' + text));
            el.appendChild(alt);
        }

        parent.appendChild(el);

        return parent;
    }

    static compare(a,b) {
        return a.name.localeCompare(b.name);
    }
}

class GoogleFont extends Font {
    constructor(name) {
        super(name);
        for (const weight of weights) {
            const link = this.link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `https://fonts.googleapis.com/css2?family=${name.replaceAll(' ', '+')}:wght@${weight}&subset=latin`;
            document.head.appendChild(link);
        }
    }
}

class FontBook {
    constructor() {
        this.groups = {};
    }

    add(group, font) {
        this.groups[group] = (this.groups[group] || [])
        this.groups[group].push(font);
    }

    render(parent, sampletext, sampleweight, samplecase) {
        const el = document.createElement('div');
        for (const [groupname, group] of Object.entries(this.groups)) {
            const header = document.createElement('h2');
            header.appendChild(document.createTextNode(groupname));
            el.appendChild(header);
            const group_parent = document.createElement('div');
            group_parent.classList.add('group');
            for (const font of group.sort(Font.compare)) {
                const sample = font.sample(sampletext, sampleweight, samplecase);
                group_parent.appendChild(sample);
            }
            el.appendChild(group_parent);
        }
        if (parent.firstChild) parent.firstChild.replaceWith(el)
        else parent.appendChild(el)
    }
}

const fontbook = new FontBook();
fontbook.add('Professional', new Font('Arial'));
fontbook.add('Professional', new GoogleFont('Source Sans 3'));
fontbook.add('Professional', new GoogleFont('Noto Sans'));
fontbook.add('Professional', new GoogleFont('Roboto'));
fontbook.add('Professional', new GoogleFont('Roboto Condensed'));
fontbook.add('Professional', new GoogleFont('Oxygen'));
fontbook.add('Professional', new GoogleFont('Encode Sans'));
fontbook.add('Professional', new GoogleFont('Encode Sans Condensed'));
fontbook.add('Professional', new GoogleFont('Archivo'));
fontbook.add('Professional', new GoogleFont('Archivo Narrow'));

fontbook.add('Tall', new GoogleFont('Anton'));
fontbook.add('Tall', new GoogleFont('Bebas Neue'));

fontbook.add('Fun', new GoogleFont('Rubik'));
fontbook.add('Fun', new GoogleFont('Passion One'));
fontbook.add('Fun', new GoogleFont('Titan One'));
fontbook.add('Fun', new GoogleFont('Wendy One'));
fontbook.add('Fun', new GoogleFont('Lilita One'));

fontbook.add('Stylized', new GoogleFont('Bowlby One'));
fontbook.add('Stylized', new GoogleFont('Bangers'));
fontbook.add('Stylized', new GoogleFont('Racing Sans One'));
fontbook.add('Stylized', new GoogleFont('Denk One'));
fontbook.add('Stylized', new GoogleFont('Contrail One'));
fontbook.add('Stylized', new GoogleFont('Fugaz One'));
fontbook.add('Stylized', new GoogleFont('Raleway'));
fontbook.add('Stylized', new GoogleFont('Tulpen One'));

fontbook.add('Mixed', new GoogleFont('Oswald'));
fontbook.add('Mixed', new GoogleFont('Anybody'));
fontbook.add('Mixed', new GoogleFont('Dosis'));
fontbook.add('Mixed', new GoogleFont('Teko'));
fontbook.add('Mixed', new GoogleFont('Fjalla One'));
fontbook.add('Mixed', new GoogleFont('Saira'));
fontbook.add('Mixed', new GoogleFont('Saira Condensed'));

fontbook.add('Code', new GoogleFont('Source Code Pro'));
fontbook.add('Code', new GoogleFont('Inconsolata'));
fontbook.add('Code', new GoogleFont('Space Mono'));
fontbook.add('Code', new GoogleFont('Ubuntu Mono'));
fontbook.add('Code', new GoogleFont('Anonymous Pro'));

window.addEventListener('load', ()=>{
    console.log('ready');

    const sampletext = document.getElementById('sampletext');
    const sampleweight = document.getElementById('sampleweight');
    const samplecase = document.getElementById('samplecase');

    sampletext.addEventListener('input', update);
    sampleweight.addEventListener('input', update);
    samplecase.addEventListener('input', update);

    function update() {
        fontbook.render(document.getElementById('render'), sampletext.value, sampleweight.value, samplecase.value);
    }

    update();
})