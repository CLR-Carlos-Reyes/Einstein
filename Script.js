// ===== Papers data =====
// To add a new paper, add one object to this list. The page builds the cards
// automatically, so the website grows without touching the HTML or CSS.
const papers = [
    {
        title: "On a Heuristic Point of View Concerning the Production and Transformation of Light",
        journal: "Annalen der Physik",
        year: 1905,
        summary: "Proposes that light is made of discrete packets of energy, explaining the photoelectric effect.",
        link: "https://en.wikipedia.org/wiki/Annus_mirabilis_papers"
    },
    {
        title: "On the Motion of Small Particles Suspended in Liquids at Rest",
        journal: "Annalen der Physik",
        year: 1905,
        summary: "Explains Brownian motion and offers strong evidence that atoms and molecules exist.",
        link: "https://en.wikipedia.org/wiki/Annus_mirabilis_papers"
    },
    {
        title: "On the Electrodynamics of Moving Bodies",
        journal: "Annalen der Physik",
        year: 1905,
        summary: "Introduces special relativity: the speed of light is the same for every observer.",
        link: "https://en.wikipedia.org/wiki/Annus_mirabilis_papers"
    },
    {
        title: "Does the Inertia of a Body Depend Upon Its Energy Content?",
        journal: "Annalen der Physik",
        year: 1905,
        summary: "Shows that mass and energy are equivalent, the idea behind E = mc².",
        link: "https://en.wikipedia.org/wiki/Mass%E2%80%93energy_equivalence"
    },
    {
        title: "The Field Equations of Gravitation",
        journal: "Prussian Academy of Sciences",
        year: 1915,
        summary: "Presents the final field equations of general relativity.",
        link: "https://en.wikipedia.org/wiki/Einstein_field_equations"
    },
    {
        title: "The Foundation of the General Theory of Relativity",
        journal: "Annalen der Physik",
        year: 1916,
        summary: "A complete account of general relativity: gravity as the curvature of space and time.",
        link: "https://en.wikipedia.org/wiki/General_relativity"
    },
    {
        title: "On the Quantum Theory of Radiation",
        journal: "Physikalische Zeitschrift",
        year: 1917,
        summary: "Describes stimulated emission, the principle that later made the laser possible.",
        link: "https://en.wikipedia.org/wiki/Stimulated_emission"
    },
    {
        title: "Cosmological Considerations in the General Theory of Relativity",
        journal: "Prussian Academy of Sciences",
        year: 1917,
        summary: "Applies general relativity to the whole universe and introduces the cosmological constant.",
        link: "https://en.wikipedia.org/wiki/Cosmological_constant"
    },
    {
        title: "Can Quantum-Mechanical Description of Physical Reality Be Considered Complete?",
        journal: "Physical Review",
        year: 1935,
        summary: "The EPR paper, written with Podolsky and Rosen, questioning the completeness of quantum mechanics.",
        link: "https://en.wikipedia.org/wiki/EPR_paradox"
    }
];

const grid = document.getElementById("paper-grid");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const emptyMessage = document.getElementById("empty-message");

// Build one card (block) for a paper
function createCard(paper) {
    const card = document.createElement("article");
    card.className = "paper-card";

    const icon = document.createElement("img");
    icon.src = "images/paper-icon.svg";
    icon.alt = "";

    const meta = document.createElement("div");
    meta.className = "paper-meta";
    const year = document.createElement("strong");
    year.textContent = paper.year;
    meta.append(year, paper.journal);

    const title = document.createElement("h3");
    title.textContent = paper.title;

    const summary = document.createElement("p");
    summary.textContent = paper.summary;

    const link = document.createElement("a");
    link.href = paper.link;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Read more →";

    card.append(icon, meta, title, summary, link);
    return card;
}

// Filter, sort and draw the cards
function renderPapers() {
    const query = searchInput.value.trim().toLowerCase();

    const visible = papers
        .filter(p => (p.title + " " + p.journal + " " + p.year).toLowerCase().includes(query))
        .sort((a, b) => sortSelect.value === "newest" ? b.year - a.year : a.year - b.year);

    grid.replaceChildren(...visible.map(createCard));
    emptyMessage.hidden = visible.length > 0;
}

// Mobile menu (Q4)
const menuButton = document.querySelector(".menu-toggle");
const nav = document.getElementById("site-nav");
menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
});
nav.addEventListener("click", e => {
    if (e.target.tagName === "A") {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
    }
});

searchInput.addEventListener("input", renderPapers);
sortSelect.addEventListener("change", renderPapers);

document.getElementById("paper-count").textContent = papers.length;
document.getElementById("year").textContent = new Date().getFullYear();
renderPapers();