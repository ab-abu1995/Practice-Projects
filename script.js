// Sample data
const projectsData = [
    {
        id: 1,
        name: "Calculator",
        category: "react",
        description: "Fully functional calculator with keyboard support and clean UI.",
        technologies: ["React", "HTML", "CSS"],
        liveUrl: "https://practice-projects-f3u2.vercel.app/",
        codeUrl: "https://github.com/ab-abu1995/Practice-Projects/blob/main/ReactProject/practice-1/src/App.tsx"
    },
    {
        id: 2,
        name: "Weather App",
        category: "react",
        description: "Real-time weather with 5-day forecast using OpenWeather API.",
        technologies: ["React", "Axios", "CSS Modules"],
        liveUrl: "https://practice-projects-jgn7-hp8npp5uz-abraham-abunu.vercel.app/",
        codeUrl: "https://github.com/ab-abu1995/Practice-Projects/blob/main/ReactProject/Weather-App/src/Components/Weather.tsx"
    },
    {
        id: 3,
        name: "Todo List",
        category: "js",
        description: "Drag & drop todos with local storage persistence.",
        technologies: ["JavaScript", "localStorage", "CSS Grid"],
        liveUrl: "",
        codeUrl: ""
    },
    {
        id: 4,
        name: "Dashboard UI",
        category: "css",
        description: "Responsive admin dashboard with dark mode toggle.",
        technologies: ["CSS Grid", "Flexbox", "Variables"],
        liveUrl: "",
        codeUrl: ""
    },
    {
        id: 5,
        name: "Expense Tracker",
        category: "advanced",
        description: "Track expenses with charts and category filtering.",
        technologies: ["Chart.js", "ES6 Modules"],
        liveUrl: "",
        codeUrl: ""
    },
    {
        id: 6,
        name: "REST API",
        category: "node",
        description: "Simple REST API with Express and mock database.",
        technologies: ["Node.js", "Express", "LowDB"],
        liveUrl: "",
        codeUrl: ""
    },
    {
        id: 7,
        name: "Memory Game",
        category: "react",
        description: "Classic memory matching game with React hooks.",
        technologies: ["React", "Framer Motion"],
        liveUrl: "",
        codeUrl: ""
    },
    {
        id: 8,
        name: "CSS Gallery",
        category: "css",
        description: "Collection of creative CSS art and animations.",
        technologies: ["CSS", "Keyframes"],
        liveUrl: "",
        codeUrl: ""
    }
];


// State
let projects = [...projectsData];
let selectedCategory = "all";
let searchQuery = "";
let techTags = [];

// DOM elements
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const menuToggle = document.getElementById("menuToggle");
const categoryList = document.getElementById("categoryList");
const projectsContainer = document.getElementById("projectsContainer");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("projectModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelModalBtn = document.getElementById("cancelModalBtn");
const saveProjectBtn = document.getElementById("saveProjectBtn");
const projectForm = document.getElementById("projectForm");
const techInput = document.getElementById("techInput");
const addTechBtn = document.getElementById("addTechBtn");
const techTagsContainer = document.getElementById("techTagsContainer");

// Initialize
function init() {
    renderCategories();
    renderProjects();
    setupEventListeners();
    updateHeaderCount();
}

// Setup listeners
function setupEventListeners() {
    // Mobile menu
    menuToggle.addEventListener("click", toggleMobileMenu);
    overlay.addEventListener("click", closeMobileMenu);

    // Search
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderProjects();
    });

    // Modal
    openModalBtn.addEventListener("click", openModal);
    closeModalBtn.addEventListener("click", closeModal);
    cancelModalBtn.addEventListener("click", closeModal);
    window.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // Tech tags
    addTechBtn.addEventListener("click", addTechTag);
    techInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTechTag();
        }
    });

    // Save project
    saveProjectBtn.addEventListener("click", saveNewProject);
}

// Mobile menu functions
function toggleMobileMenu() {
    sidebar.classList.toggle("mobile-open");
    overlay.classList.toggle("active");
}

function closeMobileMenu() {
    sidebar.classList.remove("mobile-open");
    overlay.classList.remove("active");
}

// Render category buttons
function renderCategories() {
    const categories = [
        { id: "all", label: "All projects", icon: "fa-layer-group" },
        { id: "js", label: "JavaScript", icon: "fa-js", color: "js-color" },
        { id: "react", label: "React", icon: "fa-react", color: "react-color" },
        { id: "css", label: "CSS", icon: "fa-css3", color: "css-color" },
        { id: "advanced", label: "Advanced JS", icon: "fa-rocket", color: "html-color" },
        { id: "node", label: "Node.js", icon: "fa-node", color: "node-color" }
    ];

    categoryList.innerHTML = "";
    categories.forEach(cat => {
        const count = cat.id === "all" ? projects.length : projects.filter(p => p.category === cat.id).length;
        const btn = document.createElement("button");
        btn.className = `category-btn ${selectedCategory === cat.id ? "active" : ""}`;
        btn.dataset.category = cat.id;
        btn.innerHTML = `
            <span><i class="fab ${cat.icon}"></i> ${cat.label}</span>
            <span class="count">${count}</span>
        `;
        btn.addEventListener("click", () => {
            selectedCategory = cat.id;
            renderCategories();
            renderProjects();
            if (window.innerWidth <= 768) closeMobileMenu();
        });
        categoryList.appendChild(btn);
    });
}

// Render project cards
function renderProjects() {
    let filtered = projects;
    if (selectedCategory !== "all") {
        filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (searchQuery) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchQuery) ||
            p.description.toLowerCase().includes(searchQuery) ||
            p.technologies.some(t => t.toLowerCase().includes(searchQuery))
        );
    }

    if (filtered.length === 0) {
        projectsContainer.innerHTML = `<div class="no-projects"><i class="fas fa-folder-open" style="font-size: 2.5rem; opacity: 0.5; margin-bottom: 16px;"></i><h3>No projects found</h3><p>Try another category or search term</p></div>`;
        return;
    }

    projectsContainer.innerHTML = "";
    filtered.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";

        const categoryLabel = {
            js: "JS", react: "React", css: "CSS", advanced: "Adv", node: "Node"
        }[project.category] || project.category;

        const liveBtn = project.liveUrl ? 
            `<a href="${project.liveUrl}" target="_blank" class="project-link live-link"><i class="fas fa-external-link-alt"></i> Live</a>` :
            `<span class="project-link live-link" style="opacity: 0.4; pointer-events: none;"><i class="fas fa-external-link-alt"></i> No demo</span>`;

        card.innerHTML = `
            <div class="card-header">
                <h3>${project.name}</h3>
                <span class="category-badge ${project.category}">${categoryLabel}</span>
            </div>
            <p class="project-desc">${project.description}</p>
            <div class="tech-stack">
                ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
            <div class="project-links">
                ${liveBtn}
                <a href="${project.codeUrl}" target="_blank" class="project-link code-link"><i class="fab fa-github"></i> Code</a>
            </div>
        `;
        projectsContainer.appendChild(card);
    });
}

// Update header count
function updateHeaderCount() {
    const badge = document.querySelector(".header-actions .badge");
    if (badge) {
        badge.innerHTML = `<i class="far fa-folder-open"></i> ${projects.length} projects`;
    }
}

// Modal functions
function openModal() {
    modal.style.display = "flex";
    techTags = [];
    updateTechTagsDisplay();
    projectForm.reset();
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

// Tech tags management
function addTechTag() {
    const tech = techInput.value.trim();
    if (tech && !techTags.includes(tech)) {
        techTags.push(tech);
        updateTechTagsDisplay();
        techInput.value = "";
    }
}

function updateTechTagsDisplay() {
    techTagsContainer.innerHTML = techTags.map(tag => `
        <span class="tech-tag-item">
            ${tag} <i class="fas fa-times" onclick="removeTechTag('${tag}')"></i>
        </span>
    `).join('');
}

window.removeTechTag = function(tag) {
    techTags = techTags.filter(t => t !== tag);
    updateTechTagsDisplay();
};

// Save new project
function saveNewProject() {
    const name = document.getElementById("projectName").value.trim();
    const category = document.getElementById("projectCategory").value;
    const desc = document.getElementById("projectDesc").value.trim();
    const liveUrl = document.getElementById("liveUrl").value.trim();
    const codeUrl = document.getElementById("codeUrl").value.trim();

    if (!name || !category || !desc || !codeUrl) {
        alert("Please fill all required fields");
        return;
    }

    const newProject = {
        id: projects.length + 1,
        name,
        category,
        description: desc,
        technologies: techTags.length ? techTags : ["No tags"],
        liveUrl: liveUrl || null,
        codeUrl
    };

    projects.push(newProject);
    renderCategories();
    renderProjects();
    updateHeaderCount();
    closeModal();
}

// Start
document.addEventListener("DOMContentLoaded", init);