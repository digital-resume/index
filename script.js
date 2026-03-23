/**
 * Resume-to-Web Interactive Script
 * Version: 2.0 - Dual Theme Support
 */

(function() {
    'use strict';

    // DOM Ready
    document.addEventListener('DOMContentLoaded', function() {
        initThemeSwitcher();
        initSmoothScroll();
        initAnimations();
        initContactLinks();
    });

    /**
     * Theme Switcher - 主题切换
     */
    function initThemeSwitcher() {
        // 创建切换按钮容器
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
        
        // 插入到 body 开头
        document.body.insertBefore(switcher, document.body.firstChild);
        
        // 获取保存的主题
        const savedTheme = localStorage.getItem('resume-theme') || 'business';
        setTheme(savedTheme);
        
        // 绑定点击事件
        const buttons = switcher.querySelectorAll('.theme-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                const theme = this.dataset.theme;
                setTheme(theme);
                localStorage.setItem('resume-theme', theme);
            });
        });
    }

    /**
     * 设置主题
     */
    function setTheme(theme) {
        const root = document.documentElement;
        
        // 移除所有主题
        root.removeAttribute('data-theme');
        
        // 设置新主题
        if (theme === 'neon') {
            root.setAttribute('data-theme', 'neon');
        }
        
        // 更新按钮状态
        const buttons = document.querySelectorAll('.theme-btn');
        buttons.forEach(btn => {
            if (btn.dataset.theme === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // 添加过渡动画
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }

    /**
     * Smooth Scroll for internal links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Scroll-based animations
     */
    function initAnimations() {
        const sections = document.querySelectorAll('.section');
        
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            sections.forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                observer.observe(section);
            });
        }

        // Header animation
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

    /**
     * Contact Links - Add click tracking (optional)
     */
    function initContactLinks() {
        const contactItems = document.querySelectorAll('.contact-item');
        
        contactItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    /**
     * Utility: Copy to clipboard
     */
    window.copyToClipboard = function(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('已复制到剪贴板');
            }).catch(err => {
                console.error('复制失败:', err);
            });
        } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showToast('已复制到剪贴板');
        }
    };

    /**
     * Toast notification
     */
    function showToast(message, duration = 2000) {
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #1f2937;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 1001;
            animation: toastFadeIn 0.3s ease;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toastFadeOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // Add toast animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes toastFadeIn {
            from { opacity: 0; transform: translateX(-50%) translateY(20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes toastFadeOut {
            from { opacity: 1; transform: translateX(-50%) translateY(0); }
            to { opacity: 0; transform: translateX(-50%) translateY(20px); }
        }
    `;
    document.head.appendChild(style);

    /**
     * Print function
     */
    window.printResume = function() {
        window.print();
    };

    /**
     * Download as PDF (uses browser print)
     */
    window.downloadPDF = function() {
        showToast('请使用浏览器的"另存为PDF"功能');
        window.print();
    };

    /**
     * 获取当前主题
     */
    window.getCurrentTheme = function() {
        return localStorage.getItem('resume-theme') || 'business';
    };

    /**
     * 切换主题
     */
    window.toggleTheme = function() {
        const currentTheme = localStorage.getItem('resume-theme') || 'business';
        const newTheme = currentTheme === 'business' ? 'neon' : 'business';
        setTheme(newTheme);
        localStorage.setItem('resume-theme', newTheme);
        return newTheme;
    };

})();