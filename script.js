        // Current year for footer
        document.getElementById('current-year').textContent = new Date().getFullYear();
        
        // Sample projects data
        const projectsData = [
            {
                id: 1,
                name: "Calculator",
                category: "js",
                description: "A fully functional calculator with basic arithmetic operations, keyboard support, and responsive design.",
                technologies: ["JavaScript", "HTML", "CSS", "DOM"],
                liveUrl: "js-basics/calculator/index.html",
                codeUrl: "js-basics/calculator/"
            },
            {
                id: 3,
                name: "Weather App",
                category: "react",
                description: "React application that displays current weather and forecast using a weather API with search functionality.",
                technologies: ["React", "API Integration", "Axios"],
                liveUrl: "react/weather-app/build/index.html",
                codeUrl: "react/weather-app/"
            },
            {
                id: 5,
                name: "Dashboard UI",
                category: "css",
                description: "A fully responsive admin dashboard built with CSS Grid and Flexbox with dark/light theme toggle.",
                technologies: ["CSS Grid", "Flexbox", "CSS Variables"],
                liveUrl: "css/dashboard/index.html",
                codeUrl: "css/dashboard/"
            },
            {
                id: 7,
                name: "Expense Tracker",
                category: "advanced",
                description: "Advanced JavaScript application for tracking expenses with charts, filtering, and data visualization.",
                technologies: ["Chart.js", "ES6 Modules", "Local Storage"],
                liveUrl: "advanced-js/expense-tracker/index.html",
                codeUrl: "advanced-js/expense-tracker/"
            },
            {
                id: 9,
                name: "Blog Platform",
                category: "react",
                description: "A full-featured blog platform with markdown support, comments, and user authentication simulation.",
                technologies: ["React", "Markdown", "React Hooks"],
                liveUrl: "react/blog-platform/build/index.html",
                codeUrl: "react/blog-platform/"
            },
            {
                id: 11,
                name: "API Data Fetcher",
                category: "advanced",
                description: "Application demonstrating various techniques for fetching and displaying data from REST APIs.",
                technologies: ["Fetch API", "Async/Await", "Error Handling"],
                liveUrl: "advanced-js/api-fetcher/index.html",
                codeUrl: "advanced-js/api-fetcher/"
            },
            {
                id: 12,
                name: "Simple REST API",
                category: "node",
                description: "A Node.js REST API with Express, MongoDB simulation, and CRUD operations for a sample resource.",
                technologies: ["Node.js", "Express", "REST API"],
                liveUrl: "vvvvv",
                codeUrl: "nodejs/simple-api/"
            }
        ];

        // State
        let projects = [...projectsData];
        let selectedCategory = 'all';
        let techTags = [];
        
        // DOM Elements
        const projectsContainer = document.getElementById('projects-container');
        const categoryButtons = document.querySelectorAll('.category-btn');
        const searchInput = document.getElementById('search-input');
        const projectModal = document.getElementById('project-modal');
        const openModalBtn = document.getElementById('open-modal');
        const closeModalBtn = document.getElementById('close-modal');
        const cancelBtn = document.getElementById('cancel-btn');
        const saveProjectBtn = document.getElementById('save-project-btn');
        const projectForm = document.getElementById('project-form');
        const addTechBtn = document.getElementById('add-tech-btn');
        const techInput = document.getElementById('tech-input');
        const techTagsContainer = document.getElementById('tech-tags-container');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const totalProjectsEl = document.getElementById('total-projects');
        const jsProjectsEl = document.getElementById('js-projects');
        const reactProjectsEl = document.getElementById('react-projects');
        const cssProjectsEl = document.getElementById('css-projects');
        
        // Initialize
        function init() {
            updateProjectCounts();
            renderProjects();
            setupEventListeners();
            setupMobileMenu();
        }
        
        // Setup mobile menu functionality
        function setupMobileMenu() {
            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
            overlay.addEventListener('click', closeMobileMenu);
            
            // Close sidebar when clicking a category on mobile
            categoryButtons.forEach(button => {
                button.addEventListener('click', () => {
                    if (window.innerWidth <= 1024) {
                        closeMobileMenu();
                    }
                });
            });
        }
        
        function toggleMobileMenu() {
            sidebar.classList.toggle('mobile-open');
            overlay.classList.toggle('active');
        }
        
        function closeMobileMenu() {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
        }
        
        // Update project counts
        function updateProjectCounts() {
            const total = projects.length;
            const jsCount = projects.filter(p => p.category === 'js').length;
            const reactCount = projects.filter(p => p.category === 'react').length;
            const cssCount = projects.filter(p => p.category === 'css').length;
            const advancedCount = projects.filter(p => p.category === 'advanced').length;
            const nodeCount = projects.filter(p => p.category === 'node').length;
            
            totalProjectsEl.textContent = total;
            jsProjectsEl.textContent = jsCount;
            reactProjectsEl.textContent = reactCount;
            cssProjectsEl.textContent = cssCount;
            
            // Update category counts in sidebar
            document.querySelector('[data-category="all"] .category-count').textContent = total;
            document.querySelector('[data-category="js"] .category-count').textContent = jsCount;
            document.querySelector('[data-category="react"] .category-count').textContent = reactCount;
            document.querySelector('[data-category="css"] .category-count').textContent = cssCount;
            document.querySelector('[data-category="advanced"] .category-count').textContent = advancedCount;
            document.querySelector('[data-category="node"] .category-count').textContent = nodeCount;
        }
        
        // Render projects based on current filter
        function renderProjects() {
            let filteredProjects = projects;
            
            // Filter by category
            if (selectedCategory !== 'all') {
                filteredProjects = projects.filter(project => project.category === selectedCategory);
            }
            
            // Filter by search query
            const searchQuery = searchInput.value.toLowerCase();
            if (searchQuery) {
                filteredProjects = filteredProjects.filter(project => 
                    project.name.toLowerCase().includes(searchQuery) ||
                    project.description.toLowerCase().includes(searchQuery) ||
                    project.technologies.some(tech => tech.toLowerCase().includes(searchQuery))
                );
            }
            
            // Clear container
            projectsContainer.innerHTML = '';
            
            // Show message if no projects
            if (filteredProjects.length === 0) {
                projectsContainer.innerHTML = `
                    <div class="no-projects">
                        <i class="fas fa-folder-open"></i>
                        <h3>No projects found</h3>
                        <p>Try selecting a different category or adjusting your search query.</p>
                    </div>
                `;
                return;
            }
            
            // Render project cards
            filteredProjects.forEach(project => {
                const projectCard = createProjectCard(project);
                projectsContainer.appendChild(projectCard);
            });
        }
        
        // Create a project card element
        function createProjectCard(project) {
            const card = document.createElement('div');
            card.className = 'project-card';
            
            // Get category name and color
            const categoryInfo = getCategoryInfo(project.category);
            
            // Create tech tags HTML
            const techTagsHTML = project.technologies.map(tech => 
                `<span class="tech-tag">${tech}</span>`
            ).join('');
            
            card.innerHTML = `
                <div class="project-header">
                    <h3 class="project-title">${project.name}</h3>
                    <span class="project-category" style="background-color: ${categoryInfo.color}20; color: ${categoryInfo.color}; border: 1px solid ${categoryInfo.color}40;">
                        ${categoryInfo.name}
                    </span>
                </div>
                <div class="project-body">
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${techTagsHTML}
                    </div>
                    <div class="project-links">
                        ${project.liveUrl ? 
                            `<a href="${project.liveUrl}" target="_blank" class="project-link live-link">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>` : 
                            `<span class="project-link live-link" style="opacity: 0.6; cursor: not-allowed;">
                                <i class="fas fa-external-link-alt"></i> No Live Demo
                            </span>`
                        }
                        <a href="${project.codeUrl}" target="_blank" class="project-link code-link">
                            <i class="fab fa-github"></i> View Code
                        </a>
                    </div>
                </div>
            `;
            
            return card;
        }
        
        // Get category info by category key
        function getCategoryInfo(categoryKey) {
            const categories = {
                js: { name: 'JavaScript', color: 'var(--js-color)' },
                react: { name: 'React', color: 'var(--react-color)' },
                css: { name: 'CSS', color: 'var(--css-color)' },
                advanced: { name: 'Advanced JS', color: 'var(--html-color)' },
                node: { name: 'Node.js', color: 'var(--node-color)' }
            };
            
            return categories[categoryKey] || { name: 'Unknown', color: 'var(--github-text-secondary)' };
        }
        
        // Setup event listeners
        function setupEventListeners() {
            // Category filter buttons
            categoryButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    button.classList.add('active');
                    // Update selected category
                    selectedCategory = button.getAttribute('data-category');
                    // Re-render projects
                    renderProjects();
                });
            });
            
            // Search input
            searchInput.addEventListener('input', renderProjects);
            
            // Modal controls
            openModalBtn.addEventListener('click', () => {
                projectModal.style.display = 'flex';
                techTags = [];
                updateTechTagsDisplay();
                projectForm.reset();
                document.body.style.overflow = 'hidden';
            });
            
            const closeModal = () => {
                projectModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            };
            
            closeModalBtn.addEventListener('click', closeModal);
            cancelBtn.addEventListener('click', closeModal);
            
            // Close modal when clicking outside
            projectModal.addEventListener('click', (e) => {
                if (e.target === projectModal) {
                    closeModal();
                }
            });
            
            // Add tech tag
            addTechBtn.addEventListener('click', () => {
                const tech = techInput.value.trim();
                if (tech && !techTags.includes(tech)) {
                    techTags.push(tech);
                    updateTechTagsDisplay();
                    techInput.value = '';
                }
            });
            
            // Remove tech tag
            techTagsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-tech')) {
                    const techToRemove = e.target.getAttribute('data-tech');
                    techTags = techTags.filter(tech => tech !== techToRemove);
                    updateTechTagsDisplay();
                }
            });
            
            // Save new project
            saveProjectBtn.addEventListener('click', () => {
                // Get form values
                const name = document.getElementById('project-name').value.trim();
                const category = document.getElementById('project-category').value;
                const description = document.getElementById('project-description').value.trim();
                const liveUrl = document.getElementById('live-url').value.trim();
                const codeUrl = document.getElementById('code-url').value.trim();
                
                // Validate
                if (!name || !category || !description || !codeUrl) {
                    alert('Please fill in all required fields (Name, Category, Description, Code URL)');
                    return;
                }
                
                // Create new project object
                const newProject = {
                    id: projects.length + 1,
                    name,
                    category,
                    description,
                    technologies: [...techTags],
                    liveUrl: liveUrl || null,
                    codeUrl
                };
                
                // Add to projects array
                projects.push(newProject);
                
                // Update UI
                updateProjectCounts();
                renderProjects();
                
                // Close modal and reset form
                closeModal();
                
                // Show success message
                alert(`Project "${name}" added successfully!`);
            });
        }
        
        // Update tech tags display in modal
        function updateTechTagsDisplay() {
            techTagsContainer.innerHTML = '';
            techTags.forEach(tech => {
                const tag = document.createElement('span');
                tag.className = 'tech-tag';
                tag.innerHTML = `
                    ${tech}
                    <button type="button" class="remove-tech" data-tech="${tech}" style="background: none; border: none; color: inherit; margin-left: 5px; cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                techTagsContainer.appendChild(tag);
            });
        }
        
        // Initialize the app
        document.addEventListener('DOMContentLoaded', init);