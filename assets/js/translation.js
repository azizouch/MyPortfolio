let translations = {}; // Will hold the translations

// Fetch translations from the JSON file
fetch('translations.json')
    .then((response) => response.json())
    .then((data) => {
        translations = data;
        changeLanguage('en'); // Default language
    });

let typed; // Keep a reference to the Typed.js instance

function changeLanguage(lang) {
    // Get all elements with the `data-i18n` attribute
    const elements = document.querySelectorAll("[data-i18n]");

    // Update each element with the corresponding translation
    elements.forEach((el) => {
        const key = el.getAttribute("data-i18n");
        el.textContent = translations[lang][key];
    });
}
