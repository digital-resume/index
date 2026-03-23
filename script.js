/**
 * Resume-to-Web Interactive Script
 * Version: 3.0 - Four Theme Support
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initThemeSwitcher();
        initSmoothScroll();
        initAnimations();
    });

    function initThemeSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'theme-switcher';
        switcher.innerHTML = `
            <button class="theme-btn active" data-theme="business" title="商务">
                <i class="fas fa-briefcase"></i>
                <span>商务</span>
            </button>
            <button class="theme-btn" data-theme="neon" title="荧光绿">
                <i class="fas fa-bolt"></i>
                <span>荧光</span>
            </button>
            <button class="theme-btn" data-theme="warm" title="温暖治愈">
                <i class="fas fa-heart"></i>
                <span>治愈</span>
            </button>
            <button class="theme-btn" data-theme="yellow" title="荧光黄">
                <i class="fas fa-sun"></i>
                <span>暖黄</span>
            </button>
        `;
        
        document.body.insertBefore(switcher, document.body.firstChild);
        
        const savedTheme = localStorage.getItem('resume-theme') || 'business';
        setTheme(savedTheme);
        
        const buttons = switcher.querySelectorAll('.theme-btn');
        buttons.forEach(btn => {
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
        
        const buttons = document.querySelectorAll('.theme-btn');
        buttons.forEach(btn => {
            if (btn.dataset.theme === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
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
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

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