// Comprehensive Web App Utilities

(function() {
    // Performance Optimization
    const performanceUtils = {
        lazyLoadImages: function() {
            const images = document.querySelectorAll('img[data-src]');
            const config = {
                rootMargin: '50px 0px',
                threshold: 0.01
            };

            let observer = new IntersectionObserver((entries, self) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        self.unobserve(img);
                    }
                });
            }, config);

            images.forEach(img => observer.observe(img));
        },

        cacheResources: function() {
            if ('caches' in window) {
                caches.open('vvv-cache-v1').then(cache => {
                    cache.addAll([
                        '/styles/main.css',
                        '/scripts/app-utilities.js',
                        '/images/logo.png'
                    ]);
                });
            }
        }
    };

    // Accessibility Enhancements
    const accessibilityUtils = {
        addARIAAttributes: function() {
            document.querySelectorAll('button, a, input, select').forEach(el => {
                if (!el.getAttribute('aria-label') && el.textContent) {
                    el.setAttribute('aria-label', el.textContent.trim());
                }
            });
        },

        enhanceKeyboardNavigation: function() {
            document.addEventListener('keydown', function(e) {
                // Example: Tab navigation between main sections
                if (e.key === 'Tab' && e.target.matches('nav a, main a')) {
                    e.target.classList.add('focus-visible');
                }
            });
        }
    };

    // Error Handling
    const errorUtils = {
        globalErrorHandler: function() {
            window.addEventListener('error', function(event) {
                console.error('Unhandled error:', event.error);
                
                // Display user-friendly error modal
                const errorModal = document.createElement('div');
                errorModal.innerHTML = `
                    <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                        <div class="bg-white p-6 rounded-lg shadow-xl">
                            <h2 class="text-xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
                            <p>We're sorry, but an unexpected error occurred.</p>
                            <button onclick="this.closest('div').remove()" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Close</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(errorModal);
            });
        },

        sanitizeInput: function(input) {
            // Basic input sanitization
            return input.replace(/[<>&'"]/g, function(match) {
                return {
                    '<': '&lt;',
                    '>': '&gt;',
                    '&': '&amp;',
                    "'": '&#39;',
                    '"': '&quot;'
                }[match];
            });
        }
    };

    // Analytics and Tracking
    const analyticsUtils = {
        trackUserInteraction: function(category, action, label) {
            // Simulated tracking - replace with actual analytics service
            console.log('User Interaction:', { category, action, label });
            
            // Optional: Send to analytics service
            if (window.dataLayer) {
                window.dataLayer.push({
                    'event': 'userInteraction',
                    'category': category,
                    'action': action,
                    'label': label
                });
            }
        },

        trackPageView: function() {
            const path = window.location.pathname;
            analyticsUtils.trackUserInteraction('pageView', 'view', path);
        }
    };

    // Internationalization
    const i18nUtils = {
        currentLanguage: 'en',
        translations: {
            'en': {
                'welcome': 'Welcome',
                'login': 'Login',
                'error': 'An error occurred'
            },
            'es': {
                'welcome': 'Bienvenido',
                'login': 'Iniciar sesión',
                'error': 'Ocurrió un error'
            }
        },

        translate: function(key) {
            return this.translations[this.currentLanguage][key] || key;
        },

        switchLanguage: function(lang) {
            if (this.translations[lang]) {
                this.currentLanguage = lang;
                this.applyTranslations();
            }
        },

        applyTranslations: function() {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                el.textContent = this.translate(key);
            });
        }
    };

    // Service Worker Registration (PWA)
    const pwaUtils = {
        registerServiceWorker: function() {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/service-worker.js')
                    .then(registration => {
                        console.log('Service Worker registered:', registration);
                    })
                    .catch(error => {
                        console.error('Service Worker registration failed:', error);
                    });
            }
        }
    };

    // Initialize All Utilities
    function initializeUtils() {
        performanceUtils.lazyLoadImages();
        performanceUtils.cacheResources();
        
        accessibilityUtils.addARIAAttributes();
        accessibilityUtils.enhanceKeyboardNavigation();
        
        errorUtils.globalErrorHandler();
        
        analyticsUtils.trackPageView();
        
        i18nUtils.applyTranslations();
        
        pwaUtils.registerServiceWorker();

        // Add event listeners for tracking
        document.addEventListener('click', function(e) {
            if (e.target.matches('button, a')) {
                analyticsUtils.trackUserInteraction(
                    'userAction', 
                    'click', 
                    e.target.textContent
                );
            }
        });
    }

    // Expose utilities globally for manual use if needed
    window.VVVUtils = {
        performance: performanceUtils,
        accessibility: accessibilityUtils,
        error: errorUtils,
        analytics: analyticsUtils,
        i18n: i18nUtils,
        pwa: pwaUtils
    };

    // Initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeUtils);
    } else {
        initializeUtils();
    }
})();
