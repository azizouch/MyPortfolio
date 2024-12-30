
let translations = {}; // Will hold the translations

// Fetch translations from the JSON file
fetch('translations.json')
    .then((response) => response.json())
    .then((data) => {
        translations = data;
        changeLanguage('en'); // Default language
    });

function changeLanguage(lang){
    // Get all elements with the `data-i18n` attribute
    const elements = document.querySelectorAll("[data-i18n]");

    // Update each element with the corresponding translation
    elements.forEach((el) => {
        const key = el.getAttribute("data-i18n");
        el.textContent = translations[lang][key];
    });
    adjustLayout(lang);
    // window.addEventListener('resize', () => adjustLayout(lang));
}

// Dynamically adjust the main content layout (optional if CSS handles this)
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const header = document.querySelector('.header');

// Function to adjust layout based on language and screen size
function adjustLayout(lang) {
    // Update the `lang` attribute on the `<html>` tag
    document.documentElement.setAttribute("lang", lang);

    // Determine if the language is RTL
    const isRtl = lang === 'ar';

    // Update text direction
    document.body.style.direction = isRtl ? 'rtl' : 'ltr';
    const headerToggleBtn = document.querySelector('.header-toggle');
    const headerImage = document.querySelector('.header-toggle2');

    // Add or remove the 'rtl' class on the body or a parent container
    const body = document.body; // or document.documentElement for <html>
    if (isRtl) {
        document.querySelector('.swiper-wrapper').style.direction = 'ltr';
        body.classList.add('rtl'); // Add RTL class
    } else {
        body.classList.remove('rtl'); // Remove RTL class
    }

    const chevronIcons = document.querySelectorAll('.chevron-icon');

    chevronIcons.forEach(icon => {
        if (isRtl) {
            // Change to left chevron for Arabic
            icon.classList.remove('bi-chevron-right');
            icon.classList.add('bi-chevron-left');

        } else {
            // Change to right chevron for LTR languages
            icon.classList.remove('bi-chevron-left');
            icon.classList.add('bi-chevron-right');
        }
    });



    if (window.innerWidth >= 1024) {
        // Large screen adjustments
        if (isRtl) {
            header.style.left = 'auto';
            header.style.right = '0';
            main.style.marginLeft = '0';
            main.style.marginRight = '300px';
            footer.style.marginLeft = '0';
            footer.style.marginRight = `${header.offsetWidth}px`;
        } else {
            header.style.left = '0';
            header.style.right = 'auto';
            main.style.marginLeft = '300px';
            main.style.marginRight = '0';
            footer.style.marginLeft = `${header.offsetWidth}px`;
            footer.style.marginRight = '0';
        }
    } else {
        // Adjust default header position based on language
        if (isRtl) {
            header.classList.remove('header-show-left');
            header.classList.add('rtl-header');
        } else {
            header.classList.remove('rtl-header', 'header-show-right');
        }
        // Reset the header toggle icon to the default closed state
        if (headerToggleBtn.classList.contains('bi-x')) {
            headerToggleBtn.classList.remove('bi-x');
            headerToggleBtn.classList.add('bi-list');
        }
        // Ensure the image visibility matches the reset state of the header
        if (!header.classList.contains('header-show-right') && !header.classList.contains('header-show-left')) {
            headerImage.style.display = 'block'; // Show the image
        } else {
            headerImage.style.display = 'none'; // Hide the image
        }
    }

    // Dynamically adjust the `.scroll-top` button
    const scrollTopButton = document.querySelector('.scroll-top');
    if (scrollTopButton) {
        if (lang === 'ar') {
            scrollTopButton.style.left = '15px';
            scrollTopButton.style.right = 'auto';
        } else {
            scrollTopButton.style.right = '15px';
            scrollTopButton.style.left = 'auto';
        }
    }
    // Adjust `.header-toggle` position
    const headerToggle = document.querySelector('.header .header-toggle');
    if (headerToggle) {
        if (lang === 'ar') {
            headerToggle.style.left = '15px';
            headerToggle.style.right = 'auto';
        } else {
            headerToggle.style.right = '15px';
            headerToggle.style.left = 'auto';
        }
    }
    // Adjust `.header-toggle2` position
    const headerToggleImage = document.querySelector('.header-toggle2');
    if (headerToggleImage) {
        if (lang === 'ar') {
            headerToggleImage.style.left = 'auto';
            headerToggleImage.style.right = '15px';
        } else {
            headerToggleImage.style.right = 'auto';
            headerToggleImage.style.left = '15px';
        }
    }

}