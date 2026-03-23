/**
 * Resume-to-Web Interactive Script
 * Version: 1.0 - Dual Theme
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initThemeSwitcher();
        initAnimations();
    });

    function initThemeSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'theme-switcher';
        switcher.innerHTML = `
            <button class="theme-btn active" data-theme="business">
                <i class="fas fa-briefcase"></i>
                <span>商务</span>
            </button>
            <button class="theme-btn" data-theme="neon">
                <i class="fas fa-bolt"></i>
                <span>荧光</span>
            </button>
        `;
        
        document.body.insertBefore(switcher, document.body.firstChild);
        
        const savedTheme = localStorage.getItem('resume-theme') || 'business';
        setTheme(savedTheme);
        
        switcher.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const theme = this.dataset.theme;
                setTheme(theme);
                localStorage.setItem('resume-theme', theme);
            });
        });
    }

    function setTheme(theme) {
        const root = document.documentElement;
        root.removeAttribute('data-theme');
        if (theme !== 'business') {
            root.setAttribute('data-theme', theme);
        }
        
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });
    }

    function initAnimations() {
        const sections = document.querySelectorAll('.section');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });

            sections.forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                observer.observe(section);
            });
        }

        const header = document.querySelector('.header');
        if (header) {
            header.style.opacity = '0';
            header.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }, 100);
        }
    }

})();