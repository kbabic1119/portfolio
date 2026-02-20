// ============================================
// PORTFOLIO - Navigation & Interactions
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // --- Page Navigation ---
    var navLinks = document.querySelectorAll('.nav-link');
    var pages = document.querySelectorAll('.page');

    var floatingIconsContainer = document.querySelector('.floating-icons');

    function showPage(pageId) {
        // Hide all pages
        pages.forEach(function(page) {
            page.classList.remove('active');
        });

        // Remove active from nav
        navLinks.forEach(function(link) {
            link.classList.remove('active');
        });

        // Show target page
        var target = document.getElementById(pageId);
        if (target) {
            target.classList.add('active');
        }

        // Set active nav
        var activeLink = document.querySelector('[data-page="' + pageId + '"]');
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Toggle floating icons layout per page
        if (floatingIconsContainer) {
            floatingIconsContainer.classList.remove('scattered', 'on-about');

            // About page: scattered cluster below photo
            var aboutPos = [
                { top: '65%', left: '12%' },  // WordPress
                { top: '78%', left: '8%' },   // JS
                { top: '88%', left: '15%' },  // Python
                { top: '70%', left: '22%' },  // React
                { top: '82%', left: '25%' },  // HTML5
                { top: '92%', left: '20%' },  // CSS3
                { top: '75%', left: '5%' },   // Node.js
                { top: '85%', left: '30%' },  // Figma
                { top: '68%', left: '17%' },  // Git
                { top: '95%', left: '10%' },  // Docker
                { top: '92%', left: '28%' }   // Claude
            ];

            var allIcons = floatingIconsContainer.querySelectorAll('.float-icon');
            if (pageId === 'about') {
                floatingIconsContainer.classList.add('scattered', 'on-about');
                console.log('ABOUT PAGE: Moving ' + allIcons.length + ' icons');
                allIcons.forEach(function(icon, i) {
                    if (aboutPos[i]) {
                        icon.style.setProperty('top', aboutPos[i].top, 'important');
                        icon.style.setProperty('left', aboutPos[i].left, 'important');
                        console.log('Icon ' + i + ': top=' + aboutPos[i].top + ' left=' + aboutPos[i].left);
                    }
                });
            } else {
                // Clear inline positions so CSS takes over
                allIcons.forEach(function(icon) {
                    icon.style.top = '';
                    icon.style.left = '';
                });
                if (pageId !== 'home') {
                    floatingIconsContainer.classList.add('scattered');
                }
            }
        }
    }

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var page = this.getAttribute('data-page');
            if (page) {
                showPage(page);
                // Update URL hash
                history.pushState(null, null, '#' + page);
            }
        });
    });

    // "Read more" and internal links
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#') return;

            var targetId = href.substring(1);
            var targetPage = document.getElementById(targetId);

            if (targetPage && targetPage.classList.contains('page')) {
                e.preventDefault();
                showPage(targetId);
                history.pushState(null, null, '#' + targetId);

                // Also update nav if it matches
                var matchingNav = document.querySelector('[data-page="' + targetId + '"]');
                if (matchingNav) {
                    navLinks.forEach(function(l) { l.classList.remove('active'); });
                    matchingNav.classList.add('active');
                }
            }
        });
    });

    // Handle browser back/forward
    window.addEventListener('popstate', function() {
        var hash = window.location.hash.substring(1) || 'home';
        showPage(hash);
    });

    // Load page from URL hash
    var initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        showPage(initialHash);
    }

    // --- Contact Form (Formspree) ---
    var form = document.getElementById('contactForm');
    if (form) {
        // Clear validation state when user types
        form.querySelectorAll('[required]').forEach(function(field) {
            field.addEventListener('input', function() {
                if (this.value.trim()) this.style.borderColor = '';
            });
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate required fields
            var required = form.querySelectorAll('[required]');
            var valid = true;
            required.forEach(function(field) {
                if (!field.value.trim()) {
                    field.style.borderColor = '#e74c3c';
                    valid = false;
                } else {
                    field.style.borderColor = '';
                }
            });
            if (!valid) return;

            var btn = form.querySelector('.submit-btn');
            var originalText = btn.innerHTML;
            btn.textContent = 'Sending\u2026';
            btn.disabled = true;
            btn.style.opacity = '0.7';
            btn.style.background = '';

            fetch('https://formspree.io/f/mnjbnpbk', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(form)
            })
            .then(function(response) {
                if (response.ok) {
                    btn.innerHTML = '&#10003; Message Sent!';
                    btn.style.background = '#27ae60';
                    btn.style.opacity = '1';
                    form.reset();
                    setTimeout(function() {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                } else {
                    return response.json().then(function(data) { throw data; });
                }
            })
            .catch(function() {
                btn.innerHTML = '&#10007; Failed &mdash; try again';
                btn.style.background = '#e74c3c';
                btn.style.opacity = '1';
                btn.disabled = false;
                setTimeout(function() {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 3000);
            });
        });
    }

    // --- Floating icon parallax on mouse move ---
    var floatingIcons = document.querySelectorAll('.float-icon');

    document.addEventListener('mousemove', function(e) {
        var x = (e.clientX / window.innerWidth - 0.5) * 2;
        var y = (e.clientY / window.innerHeight - 0.5) * 2;

        floatingIcons.forEach(function(icon, i) {
            var speed = (i + 1) * 3;
            var moveX = x * speed;
            var moveY = y * speed;
            icon.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
        });
    });

    // --- Typing effect for code block ---
    var codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach(function(line, i) {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        line.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setTimeout(function() {
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, 300 + (i * 200));
    });

    // --- Project cards stagger animation ---
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card').forEach(function(card, i) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease ' + (i * 0.15) + 's, transform 0.6s ease ' + (i * 0.15) + 's';
        observer.observe(card);
    });

});
