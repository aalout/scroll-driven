document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const pageTitle = document.querySelector('.header h1');
    const progressBar = document.querySelector('.page-progress-bar');

    if (navLinks.length > 0 && contentSections.length > 0) {
        navLinks[0].classList.add('active');
        contentSections[0].classList.add('active');
        
        if (pageTitle) {
            pageTitle.textContent = navLinks[0].getAttribute('data-title') || 'Scroll-Animations';
        }

        if (progressBar && contentSections[0].id === 'progress-bar') {
            progressBar.classList.add('progress-bar-active-on-tab');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            
            if (progressBar) {
                progressBar.classList.remove('progress-bar-active-on-tab');
            }

            navLinks.forEach(item => item.classList.remove('active'));
            contentSections.forEach(item => item.classList.remove('active'));
            
            link.classList.add('active');
            const activeSection = document.getElementById(sectionId);
            activeSection?.classList.add('active');
            
            if (progressBar && sectionId === 'progress-bar') {
                progressBar.classList.add('progress-bar-active-on-tab');
            }
            
            if (pageTitle) {
                pageTitle.textContent = link.getAttribute('data-title') || 'Scroll-Animations';
            }
            
            if (window.innerWidth <= 1024) {
                sidebar?.classList.remove('open');
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