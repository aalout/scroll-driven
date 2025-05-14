document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    const contentSections = document.querySelectorAll('main > .content-section');
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const pageTitle = document.querySelector('.header h1');
    const progressBar = document.querySelector('.page-progress-bar');
    const contentWrapper = document.querySelector('.content-wrapper');

    const recipesContainer = document.getElementById('recipes-container');
    const recipeNavLinks = document.querySelectorAll('.recipe-nav-link');
    const recipeExampleSections = document.querySelectorAll('.recipe-example-section');

    const sectionsRequiringOverflowAuto = ['horizontal-scroll', 'parallax', 'svg-animation', 'carousel'];

    function updateContentWrapperOverflow(activeSectionId) {
        if (!contentWrapper) return;
        if (sectionsRequiringOverflowAuto.includes(activeSectionId)) {
            contentWrapper.style.overflow = 'auto';
        } else {
            contentWrapper.style.overflow = 'visible';
        }
    }

    function setActiveTab(sectionId) {
        navLinks.forEach(item => item.classList.remove('active'));
        contentSections.forEach(item => item.classList.remove('active'));

        recipeNavLinks.forEach(item => item.classList.remove('active'));
        recipeExampleSections.forEach(item => item.classList.remove('active'));

        if (progressBar) {
            progressBar.classList.remove('progress-bar-active-on-tab');
        }

        const targetTopLevelLink = document.querySelector(`.sidebar .nav-link[href="#${sectionId}"]`);
        const targetTopLevelSection = document.getElementById(sectionId);

        let finalActiveSectionId = sectionId;

        if (targetTopLevelLink && targetTopLevelSection) {
            targetTopLevelLink.classList.add('active');
            targetTopLevelSection.classList.add('active');
            if (pageTitle) {
                pageTitle.textContent = targetTopLevelLink.getAttribute('data-title') || 'Scroll-Animations';
            }

            if (sectionId === 'recipes-container' && recipeNavLinks.length > 0) {
                const firstRecipeLink = recipeNavLinks[0];
                const firstRecipeSectionId = firstRecipeLink.getAttribute('href').substring(1);
                firstRecipeLink.classList.add('active');
                const firstRecipeSection = document.getElementById(firstRecipeSectionId);
                if (firstRecipeSection) {
                    firstRecipeSection.classList.add('active');
                }
                if (pageTitle) {
                    pageTitle.textContent = firstRecipeLink.getAttribute('data-title') || pageTitle.textContent;
                }
                finalActiveSectionId = firstRecipeSectionId;
                if (progressBar && firstRecipeSectionId === 'progress-bar') {
                    progressBar.classList.add('progress-bar-active-on-tab');
                }
            } else {
                 if (progressBar && sectionId === 'progress-bar') {
                    progressBar.classList.add('progress-bar-active-on-tab');
                }
            }
        }
        updateContentWrapperOverflow(finalActiveSectionId);
    }

    if (navLinks.length > 0) {
        const initialSectionId = navLinks[0].getAttribute('href').substring(1);
        setActiveTab(initialSectionId);
    }

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

    recipeNavLinks.forEach(recipeLink => {
        recipeLink.addEventListener('click', (e) => {
            e.preventDefault();
            const recipeSectionId = recipeLink.getAttribute('href').substring(1);

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

            if (recipesContainer && !recipesContainer.classList.contains('active')) {
                contentSections.forEach(s => s.classList.remove('active'));
                recipesContainer.classList.add('active');
            }
            const recipesTopLevelLink = document.querySelector('.sidebar .nav-link[href="#recipes-container"]');
            if (recipesTopLevelLink && !recipesTopLevelLink.classList.contains('active')){
                navLinks.forEach(item => item.classList.remove('active'));
                recipesTopLevelLink.classList.add('active');
            }
            updateContentWrapperOverflow(recipeSectionId);
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