document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sidebar .nav-link'); // First-level tabs
    const contentSections = document.querySelectorAll('main > .content-section'); // All direct child sections of main
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const pageTitle = document.querySelector('.header h1');
    const progressBar = document.querySelector('.page-progress-bar');

    const recipesContainer = document.getElementById('recipes-container');
    const recipeNavLinks = document.querySelectorAll('.recipe-nav-link'); // Second-level tabs
    const recipeExampleSections = document.querySelectorAll('.recipe-example-section'); // Specific recipe example sections

    function setActiveTab(sectionId) {
        // Deactivate all top-level sections and links
        navLinks.forEach(item => item.classList.remove('active'));
        contentSections.forEach(item => item.classList.remove('active'));

        // Deactivate all recipe example sections and links (if any were active)
        recipeNavLinks.forEach(item => item.classList.remove('active'));
        recipeExampleSections.forEach(item => item.classList.remove('active'));

        if (progressBar) {
            progressBar.classList.remove('progress-bar-active-on-tab');
        }

        const targetTopLevelLink = document.querySelector(`.sidebar .nav-link[href="#${sectionId}"]`);
        const targetTopLevelSection = document.getElementById(sectionId);

        if (targetTopLevelLink && targetTopLevelSection) {
            targetTopLevelLink.classList.add('active');
            targetTopLevelSection.classList.add('active');
            if (pageTitle) {
                pageTitle.textContent = targetTopLevelLink.getAttribute('data-title') || 'Scroll-Animations';
            }

            // If the activated top-level section is the recipes container, activate its first sub-tab
            if (sectionId === 'recipes-container' && recipeNavLinks.length > 0) {
                const firstRecipeLink = recipeNavLinks[0];
                const firstRecipeSectionId = firstRecipeLink.getAttribute('href').substring(1);
                firstRecipeLink.classList.add('active');
                const firstRecipeSection = document.getElementById(firstRecipeSectionId);
                if (firstRecipeSection) {
                    firstRecipeSection.classList.add('active');
                }
                if (pageTitle) { // Update title to the specific recipe
                    pageTitle.textContent = firstRecipeLink.getAttribute('data-title') || pageTitle.textContent;
                }
                if (progressBar && firstRecipeSectionId === 'progress-bar') {
                    progressBar.classList.add('progress-bar-active-on-tab');
                }
            } else {
                 if (progressBar && sectionId === 'progress-bar') { // For top-level progress bar tab
                    progressBar.classList.add('progress-bar-active-on-tab');
                }
            }
        }
    }

    // Initial setup: Activate the first top-level tab
    if (navLinks.length > 0) {
        const initialSectionId = navLinks[0].getAttribute('href').substring(1);
        setActiveTab(initialSectionId);
    }

    // Event listener for first-level navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            setActiveTab(sectionId);
            
            if (window.innerWidth <= 1024) {
                sidebar?.classList.remove('open');
            }
        });
    });

    // Event listener for second-level (recipe) navigation links
    recipeNavLinks.forEach(recipeLink => {
        recipeLink.addEventListener('click', (e) => {
            e.preventDefault();
            const recipeSectionId = recipeLink.getAttribute('href').substring(1);

            // Deactivate all other recipe example sections and links
            recipeNavLinks.forEach(item => item.classList.remove('active'));
            recipeExampleSections.forEach(item => item.classList.remove('active'));
            
            if (progressBar) {
                progressBar.classList.remove('progress-bar-active-on-tab');
            }

            recipeLink.classList.add('active');
            const activeRecipeSection = document.getElementById(recipeSectionId);
            if (activeRecipeSection) {
                activeRecipeSection.classList.add('active');
            }

            if (pageTitle) {
                pageTitle.textContent = recipeLink.getAttribute('data-title') || 'Scroll-Animations';
            }

            if (progressBar && recipeSectionId === 'progress-bar') {
                progressBar.classList.add('progress-bar-active-on-tab');
            }

            // Ensure the main #recipes-container remains active if it's not already
            if (recipesContainer && !recipesContainer.classList.contains('active')) {
                contentSections.forEach(s => s.classList.remove('active')); // Deactivate other top-level sections
                recipesContainer.classList.add('active');
            }
            // Ensure the top-level "Рецепты" nav link is also active
            const recipesTopLevelLink = document.querySelector('.sidebar .nav-link[href="#recipes-container"]');
            if (recipesTopLevelLink && !recipesTopLevelLink.classList.contains('active')){
                navLinks.forEach(item => item.classList.remove('active'));
                recipesTopLevelLink.classList.add('active');
            }
        });
    });
    
    mobileMenuToggle?.addEventListener('click', () => {
        sidebar?.classList.toggle('open');
    });
    
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 && 
            sidebar?.classList.contains('open') && 
            !sidebar.contains(e.target) && 
            e.target !== mobileMenuToggle &&
            !mobileMenuToggle.contains(e.target)
            ) {
            sidebar.classList.remove('open');
        }
    });
});