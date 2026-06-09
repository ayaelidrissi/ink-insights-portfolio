// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) {
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
});

// Set active nav link based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    }
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(252, 253, 252, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
});

// Add animation on scroll (fade in elements)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

console.log('✨ Ink & Insights Portfolio loaded successfully! ✨');


// ─────────────────────────────────────────────────────────────
//  QUOTE & PAYMENT-PLAN CALCULATOR  (with returning-client discount)
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const wordCountInput   = document.getElementById('wordCount');
    const editTypeSelect   = document.getElementById('editType');
    const installmentSelect = document.getElementById('installments');
    const returningClient  = document.getElementById('returningClient');

    const totalPriceDisplay   = document.getElementById('totalPrice');
    const upfrontPriceDisplay = document.getElementById('upfrontPrice');
    const monthlyPriceDisplay = document.getElementById('monthlyPrice');

    // Only run on pages that actually have the calculator
    if (!wordCountInput || !editTypeSelect || !totalPriceDisplay) return;

    const RETURNING_DISCOUNT = 0.15; // 15% off for returning clients

    function formatCurrency(num) {
        return '$' + num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function calculateFinance() {
        const words  = parseFloat(wordCountInput.value) || 0;
        const rate   = parseFloat(editTypeSelect.value) || 0;
        const months = parseInt(installmentSelect.value) || 1;

        // Grand total, with optional returning-client discount
        let total = words * rate;
        if (returningClient && returningClient.checked) {
            total = total * (1 - RETURNING_DISCOUNT);
        }

        const upfront   = total * 0.20;
        const remaining = total - upfront;
        const monthly   = months > 1 ? remaining / months : 0;

        if (words > 0) {
            totalPriceDisplay.innerText   = formatCurrency(total);
            upfrontPriceDisplay.innerText = formatCurrency(upfront);
            monthlyPriceDisplay.innerText = months > 1 ? formatCurrency(monthly) + ' /mo' : '$0.00';
        } else {
            totalPriceDisplay.innerText   = '$0.00';
            upfrontPriceDisplay.innerText = '$0.00';
            monthlyPriceDisplay.innerText = '$0.00';
        }
    }

    wordCountInput.addEventListener('input', calculateFinance);
    editTypeSelect.addEventListener('change', calculateFinance);
    if (installmentSelect) installmentSelect.addEventListener('change', calculateFinance);
    if (returningClient)   returningClient.addEventListener('change', calculateFinance);

    calculateFinance();
});