// ============================================
// ZKA AUTOMATION - Navigation & Interactions
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // --- Page Navigation ---
    var navLinks = document.querySelectorAll('.nav-link');
    var pages = document.querySelectorAll('.page');

    var floatingIconsContainer = document.querySelector('.floating-icons');

    function showPage(pageId) {
        pages.forEach(function (page) {
            page.classList.remove('active');
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
        });

        var target = document.getElementById(pageId);
        if (target) {
            target.classList.add('active');
        }

        var activeLink = document.querySelector('[data-page="' + pageId + '"]');
        if (activeLink) {
            activeLink.classList.add('active');
        }

        if (floatingIconsContainer) {
            floatingIconsContainer.classList.remove('scattered', 'on-about');

            var aboutPos = [
                { top: '65%', left: '12%' },
                { top: '78%', left: '8%' },
                { top: '88%', left: '15%' },
                { top: '70%', left: '22%' },
                { top: '82%', left: '25%' },
                { top: '92%', left: '20%' },
                { top: '75%', left: '5%' },
                { top: '85%', left: '30%' },
                { top: '68%', left: '17%' },
                { top: '95%', left: '10%' },
                { top: '92%', left: '28%' }
            ];

            var allIcons = floatingIconsContainer.querySelectorAll('.float-icon');
            if (pageId === 'about') {
                floatingIconsContainer.classList.add('scattered', 'on-about');
                allIcons.forEach(function (icon, i) {
                    if (aboutPos[i]) {
                        icon.style.setProperty('top', aboutPos[i].top, 'important');
                        icon.style.setProperty('left', aboutPos[i].left, 'important');
                    }
                });
            } else {
                allIcons.forEach(function (icon) {
                    icon.style.top = '';
                    icon.style.left = '';
                });
                if (pageId !== 'home') {
                    floatingIconsContainer.classList.add('scattered');
                }
            }
        }
    }

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var page = this.getAttribute('data-page');
            if (page) {
                showPage(page);
                history.pushState(null, null, '#' + page);
            }
        });
    });

    // Internal links (CTA, etc.)
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#') return;

            var targetId = href.substring(1);
            var targetPage = document.getElementById(targetId);

            if (targetPage && targetPage.classList.contains('page')) {
                e.preventDefault();
                showPage(targetId);
                history.pushState(null, null, '#' + targetId);

                var matchingNav = document.querySelector('[data-page="' + targetId + '"]');
                if (matchingNav) {
                    navLinks.forEach(function (l) { l.classList.remove('active'); });
                    matchingNav.classList.add('active');
                }
            }
        });
    });

    // Handle browser back/forward
    window.addEventListener('popstate', function () {
        var hash = window.location.hash.substring(1) || 'home';
        showPage(hash);
    });

    // Load page from URL hash
    var initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        showPage(initialHash);
    }

    // --- Contact Form ---
    var form = document.getElementById('contactForm');
    if (form) {
        form.querySelectorAll('[required]').forEach(function (field) {
            field.addEventListener('input', function () {
                this.classList.remove('invalid');
            });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var valid = true;
            form.querySelectorAll('[required]').forEach(function (field) {
                if (!field.value.trim()) {
                    field.classList.add('invalid');
                    valid = false;
                }
            });

            if (!valid) return;

            var formData = {
                name: form.querySelector('[name="name"]').value,
                email: form.querySelector('[name="email"]').value,
                practice: form.querySelector('[name="practice"]') ? form.querySelector('[name="practice"]').value : '',
                service: form.querySelector('[name="service"]') ? form.querySelector('[name="service"]').value : '',
                message: form.querySelector('[name="message"]').value
            };

            console.log('Consultation request:', formData);

            var parent = form.parentNode;
            form.style.display = 'none';

            var success = document.createElement('div');
            success.className = 'form-success';
            success.innerHTML = '<h3>Consultation Requested!</h3><p>Thank you, ' +
                formData.name + '. I\'ll get back to you within 24 hours to schedule your free consultation.</p>';
            parent.insertBefore(success, form);
        });
    }

    // --- Animate stats on home page ---
    function animateStats() {
        var stats = document.querySelectorAll('.stat-number');
        stats.forEach(function (stat) {
            var text = stat.textContent;
            if (stat.dataset.animated) return;
            stat.dataset.animated = 'true';

            if (text.includes('%')) {
                var target = parseInt(text);
                var current = 0;
                var step = Math.ceil(target / 30);
                var interval = setInterval(function () {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(interval);
                    }
                    stat.textContent = current + '%';
                }, 30);
            } else if (text.includes('x')) {
                var target = parseInt(text);
                var current = 0;
                var interval = setInterval(function () {
                    current++;
                    if (current >= target) {
                        current = target;
                        clearInterval(interval);
                    }
                    stat.textContent = current + 'x';
                }, 200);
            }
        });
    }

    // Run stat animation on load
    animateStats();

});
