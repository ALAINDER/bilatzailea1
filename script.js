const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const suggestions = document.querySelector('.suggestions');
const themeSwitch = document.querySelector('.theme-switch');
const engineButtons = document.querySelectorAll('.engine-button');
const historyToggle = document.querySelector('.history-toggle');
const historyPanel = document.querySelector('.history-panel');
const clearHistoryButton = document.getElementById('clear-history');
const historyList = document.querySelector('.history-list');
const settingsButton = document.querySelector('.settings-button');
const settingsModal = document.querySelector('.settings-modal');
const closeSettingsButton = document.querySelector('.close-settings');
const modalOverlay = document.querySelector('.modal-overlay');

const animationsToggle = document.getElementById('animations-toggle');
const themeSelect = document.getElementById('theme-select');
const newTabToggle = document.getElementById('new-tab-toggle');
const defaultEngineSelect = document.getElementById('default-engine');
const suggestionsLimitInput = document.getElementById('suggestions-limit');
const fontSizeInput = document.getElementById('font-size');
const fontFamilySelect = document.getElementById('font-family');
const autocorrectToggle = document.getElementById('autocorrect-toggle');
const saveHistoryToggle = document.getElementById('save-history-toggle');
const useLocationToggle = document.getElementById('use-location-toggle');

const addEngineButton = document.querySelector('.add-engine-button');
const engineSelectionModal = document.querySelector('.engine-selection-modal');
const closeEngineSelectionButton = document.querySelector('.close-engine-selection');
const saveEngineSelectionButton = document.querySelector('.save-engine-selection');
// Actualizamos para seleccionar checkboxes (no radios)
const engineOptions = document.querySelectorAll('.engine-option input[type="checkbox"]');

const autoClickToggle = document.getElementById('auto-click-toggle'); // Nuevo toggle para auto-click

let currentEngine = 'google';
let searchHistory = [];

// Function to save settings to localStorage
function saveSettings() {
    localStorage.setItem('animationsEnabled', animationsToggle.checked);
    localStorage.setItem('themePreference', themeSelect.value);
    localStorage.setItem('openInNewTab', newTabToggle.checked);
    localStorage.setItem('defaultEngine', defaultEngineSelect.value);
    localStorage.setItem('suggestionsLimit', suggestionsLimitInput.value);
    localStorage.setItem('fontSize', fontSizeInput.value);
    localStorage.setItem('fontFamily', fontFamilySelect.value);
    localStorage.setItem('autocorrectEnabled', autocorrectToggle.checked);
    localStorage.setItem('saveHistoryEnabled', saveHistoryToggle.checked);
    localStorage.setItem('useLocationEnabled', useLocationToggle.checked);
    localStorage.setItem('autoClickEnabled', autoClickToggle.checked); // Guardar estado del auto-click
    applySettings();
}

// Function to load settings from localStorage
function loadSettings() {
    animationsToggle.checked = localStorage.getItem('animationsEnabled') === 'true';
    themeSelect.value = localStorage.getItem('themePreference') || 'light'; // Default to light theme
    newTabToggle.checked = localStorage.getItem('openInNewTab') === 'true';
    defaultEngineSelect.value = localStorage.getItem('defaultEngine') || 'google';
    suggestionsLimitInput.value = localStorage.getItem('suggestionsLimit') || '5';
    fontSizeInput.value = localStorage.getItem('fontSize') || '16';
    fontFamilySelect.value = localStorage.getItem('fontFamily') || 'sans-serif';
    autocorrectToggle.checked = localStorage.getItem('autocorrectEnabled') === 'true';
    saveHistoryToggle.checked = localStorage.getItem('saveHistoryEnabled') === 'true';
    useLocationToggle.checked = localStorage.getItem('useLocationEnabled') === 'true';
    autoClickToggle.checked = localStorage.getItem('autoClickEnabled') !== 'false'; // Cargar estado del auto-click

    applySettings();
}

function applySettings() {
    applyTheme(themeSelect.value);
    document.body.style.fontSize = fontSizeInput.value + 'px';
    document.body.style.fontFamily = fontFamilySelect.value;
    updateThemeSwitchIcon(); // Ensure the correct icon is displayed on load
    updateAutoClickState(); // Aplicar estado del auto-click
}

// Function to apply the selected theme
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Load settings on page load
loadSettings();

// Theme Switch functionality
themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('themePreference', theme);
    themeSelect.value = theme; // Update the select element
    applyTheme(theme); // Apply the theme immediately after toggling
    updateThemeSwitchIcon(); // Update the icon
});

function updateThemeSwitchIcon() {
    if (document.body.classList.contains('dark-mode')) {
        themeSwitch.innerHTML = '<i class="fas fa-sun"></i>'; // Change to sun icon
    } else {
        themeSwitch.innerHTML = '<i class="fas fa-moon"></i>'; // Change to moon icon
    }
}

// Search Engine selection
engineButtons.forEach(button => {
    button.addEventListener('click', () => {
        engineButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentEngine = button.dataset.engine;
        localStorage.setItem('defaultEngine', currentEngine);
    });
});

// Function to perform the search
function performSearch() {
    if (searchInput.value.trim() !== '') {
        let searchUrl = '';
        const searchTerm = encodeURIComponent(searchInput.value);

        switch (currentEngine) {
            case 'google':
                searchUrl = `https://www.google.com/search?q=${searchTerm}`;
                break;
            case 'bing':
                searchUrl = `https://www.bing.com/search?q=${searchTerm}`;
                break;
            case 'duckduckgo':
                searchUrl = `https://duckduckgo.com/?q=${searchTerm}`;
                break;
            case 'yahoo':
                searchUrl = `https://search.yahoo.com/search?p=${searchTerm}`;
                break;
            case 'baidu':
                searchUrl = `https://www.baidu.com/s?wd=${searchTerm}`;
                break;
            case 'yandex':
                searchUrl = `https://yandex.com/search/?text=${searchTerm}`;
                break;
            case 'aol':
                searchUrl = `https://search.aol.com/search?q=${searchTerm}`;
                break;
            case 'ask':
                searchUrl = `https://www.ask.com/web?q=${searchTerm}`;
                break;
            case 'qwant':
                searchUrl = `https://www.qwant.com/?q=${searchTerm}`;
                break;
            case 'swisscows':
                searchUrl = `https://swisscows.com/web?query=${searchTerm}`;
                break;
            case 'ecosia':
                searchUrl = `https://www.ecosia.org/search?q=${searchTerm}`;
                break;
            case 'startpage':
                searchUrl = `https://www.startpage.com/do/search?q=${searchTerm}`;
                break;
            case 'mojeek':
                searchUrl = `https://www.mojeek.com/search?q=${searchTerm}`;
                break;
            case 'yippy':
                searchUrl = `https://yippy.com/search?query=${searchTerm}`;
                break;
            default:
                searchUrl = `https://www.google.com/search?q=${searchTerm}`;
        }

        if (newTabToggle.checked) {
            window.open(searchUrl, '_blank');
        } else {
            window.location.href = searchUrl;
        }

        saveSearchToHistory(searchInput.value);
    }
}

// Search button functionality
searchButton.addEventListener('click', performSearch);

// Enter key functionality
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// History Panel functionality
historyToggle.addEventListener('click', () => {
    historyPanel.classList.toggle('active');
});

// Function to save search query to history
function saveSearchToHistory(query) {
    searchHistory.push(query);
    updateHistoryList();
}

// Function to update the history list in the panel
function updateHistoryList() {
    historyList.innerHTML = '';
    searchHistory.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('history-item');
        div.textContent = item;
        div.addEventListener('click', () => {
            searchInput.value = item;
            performSearch();
            historyPanel.classList.remove('active');
        });
        historyList.appendChild(div);
    });
}

// Clear History functionality
clearHistoryButton.addEventListener('click', () => {
    searchHistory = [];
    updateHistoryList();
});

// Settings Modal functionality
settingsButton.addEventListener('click', () => {
    if (quickDropdown.classList.contains('visible')) {
        quickDropdown.classList.remove('visible');
    }
    settingsModal.style.opacity = '1';
    settingsModal.style.visibility = 'visible';
    modalOverlay.classList.add('active');
});

closeSettingsButton.addEventListener('click', () => {
    settingsModal.style.opacity = '0';
    settingsModal.style.visibility = 'hidden';
    modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', () => {
    settingsModal.style.opacity = '0';
    settingsModal.style.visibility = 'hidden';
    modalOverlay.classList.remove('active');
});

// Settings Options functionality
animationsToggle.addEventListener('change', saveSettings);
themeSelect.addEventListener('change', () => {
    applyTheme(themeSelect.value);
    saveSettings();
});
newTabToggle.addEventListener('change', saveSettings);
defaultEngineSelect.addEventListener('change', () => {
    currentEngine = defaultEngineSelect.value;
    saveSettings();
});
suggestionsLimitInput.addEventListener('change', saveSettings);
fontSizeInput.addEventListener('change', saveSettings);
fontFamilySelect.addEventListener('change', saveSettings);
autocorrectToggle.addEventListener('change', saveSettings);
saveHistoryToggle.addEventListener('change', saveSettings);
useLocationToggle.addEventListener('change', saveSettings);
autoClickToggle.addEventListener('change', saveSettings); // Añadir evento para el nuevo toggle

// Sample data for suggestions
const sampleData = [
    'JavaScript Tutorial',
    'HTML Basics',
    'CSS Animations',
    'Web Development',
    'React Framework',
    'Node.js Basics',
    'Python Programming',
    'Database Design'
];

// Nueva función para obtener sugerencias relacionadas al tema
function getTopicSuggestions(query) {
    // Puedes ampliar el array de temas según necesites
    const topics = ['Tutorial', 'Guía', 'Ejemplo', 'Tips', 'Herramientas', 'Framework', 'Concepto', 'Avanzado', 'Básico'];
    // Generar sugerencias combinando el query y cada tema
    return topics.map(topic => `${query} ${topic}`);
}

// Modificar event listener de searchInput para mostrar más sugerencias sobre el tema
searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    if (value.length > 0) {
        // Sugerencias que contienen el query
        const filteredSuggestions = sampleData.filter(item => 
            item.toLowerCase().includes(value)
        );
        // Sugerencias adicionales basadas en el tema
        const topicSuggestions = getTopicSuggestions(value);
        // Combinar y eliminar duplicados
        const allSuggestions = [...new Set([...filteredSuggestions, ...topicSuggestions])];
        displaySuggestions(allSuggestions);
    } else {
        clearSuggestions();
    }
});

// Modificación de displaySuggestions para auto-click en cada sugerencia
function displaySuggestions(items) {
    suggestions.innerHTML = '';
    const limit = parseInt(suggestionsLimitInput.value);
    items = items.slice(0, limit);

    items.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('suggestion-item');
        div.textContent = item;
        // Auto-click en sugerencia tras 600ms
        let autoClickTimer;
        div.addEventListener('mouseenter', () => {
            autoClickTimer = setTimeout(() => {
                div.click();
            }, 600);
        });
        div.addEventListener('mouseleave', () => {
            clearTimeout(autoClickTimer);
        });
        div.addEventListener('click', () => {
            searchInput.value = item;
            clearSuggestions();
        });
        suggestions.appendChild(div);
    });
    suggestions.classList.add('active');
}

// Clear suggestions
function clearSuggestions() {
    suggestions.innerHTML = '';
    suggestions.classList.remove('active');
}

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container') && !e.target.closest('.settings-modal') && !e.target.closest('.settings-button')) {
        clearSuggestions();
    }
});

// Initialize default engine selection
const defaultEngine = localStorage.getItem('defaultEngine') || 'google';
engineButtons.forEach(button => {
    if (button.dataset.engine === defaultEngine) {
        button.classList.add('active');
        currentEngine = defaultEngine;
    } else {
        button.classList.remove('active');
    }
});

// Load search history on page load
searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
updateHistoryList();

// Save search history to localStorage before the page unloads
window.addEventListener('beforeunload', () => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
});

// Show engine selection modal
addEngineButton.addEventListener('click', () => {
    engineSelectionModal.style.opacity = '1';
    engineSelectionModal.style.visibility = 'visible';
    modalOverlay.classList.add('active');
});

// Close engine selection modal
closeEngineSelectionButton.addEventListener('click', () => {
    engineSelectionModal.style.opacity = '0';
    engineSelectionModal.style.visibility = 'hidden';
    modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', () => {
    engineSelectionModal.style.opacity = '0';
    engineSelectionModal.style.visibility = 'hidden';
    modalOverlay.classList.remove('active');
});

// Guardar selección: se toma un array de motores seleccionados
saveEngineSelectionButton.addEventListener('click', () => {
    const selectedEngines = [];
    engineOptions.forEach(option => {
        if (option.checked) {
            selectedEngines.push(option.dataset.engine);
        }
    });
    localStorage.setItem('selectedEngines', JSON.stringify(selectedEngines));
    // Revisa si el defaultEngine guardado está en la selección; de lo contrario, usa el primero
    let defaultEngine = localStorage.getItem('defaultEngine') || '';
    if (!selectedEngines.includes(defaultEngine)) {
        defaultEngine = selectedEngines[0] || 'google';
        localStorage.setItem('defaultEngine', defaultEngine);
    }
    updateEngineButtons(selectedEngines, defaultEngine);
    engineSelectionModal.style.opacity = '0';
    engineSelectionModal.style.visibility = 'hidden';
    modalOverlay.classList.remove('active');
});

// Actualiza la creación de botones: recibe array de motores y el motor predeterminado
function updateEngineButtons(selectedEngines, defaultEngine) {
    const engineButtonsContainer = document.querySelector('.search-engines');
    engineButtonsContainer.innerHTML = '';
    selectedEngines.forEach(engine => {
        const button = document.createElement('button');
        button.classList.add('engine-button', 'bordered-button');
        button.dataset.engine = engine;
        button.innerHTML = getEngineIcon(engine) + ' ' + capitalizeFirstLetter(engine);
        // Marca como activo el botón del motor predeterminado
        if (engine === defaultEngine) {
            button.classList.add('active');
            currentEngine = defaultEngine;
        }
        button.addEventListener('click', () => {
            engineButtonsContainer.querySelectorAll('.engine-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentEngine = engine;
            localStorage.setItem('defaultEngine', currentEngine);
        });
        // Agregar auto-click al botón
        let timer;
        button.addEventListener('mouseenter', () => {
            timer = setTimeout(() => { button.click(); }, 600);
        });
        button.addEventListener('mouseleave', () => {
            clearTimeout(timer);
        });
        engineButtonsContainer.appendChild(button);
    });
    const addButton = document.createElement('button');
    addButton.classList.add('add-engine-button', 'bordered-button');
    addButton.innerHTML = '<i class="fas fa-plus"></i>';
    addButton.addEventListener('click', () => {
        engineSelectionModal.style.opacity = '1';
        engineSelectionModal.style.visibility = 'visible';
        modalOverlay.classList.add('active');
    });
    // Agregar auto-click al botón de añadir
    let timerAdd;
    addButton.addEventListener('mouseenter', () => {
        timerAdd = setTimeout(() => { addButton.click(); }, 600);
    });
    addButton.addEventListener('mouseleave', () => {
        clearTimeout(timerAdd);
    });
    engineButtonsContainer.appendChild(addButton);
}

// Function to get engine icon
function getEngineIcon(engine) {
    switch (engine) {
        case 'google':
            return '<i class="fab fa-google"></i>';
        case 'bing':
            return '<i class="fab fa-microsoft"></i>';
        case 'duckduckgo':
            return '<i class="fas fa-duck"></i>';
        case 'yahoo':
            return '<i class="fab fa-yahoo"></i>';
        case 'baidu':
            return '<i class="fas fa-dragon"></i>'; // Icono cambiado para Baidu
        case 'yandex':
            return '<i class="fab fa-yandex"></i>';
        case 'aol':
            return '<i class="fas fa-comment-dots"></i>'; // Icono distinto para AOL
        case 'ask':
            return '<i class="fas fa-question-circle"></i>'; // Icono distinto para Ask
        case 'qwant':
            return '<i class="fas fa-globe"></i>'; // Icono distintivo para Qwant
        case 'swisscows':
            return '<i class="fas fa-cube"></i>'; // Icono distintivo para Swisscows
        case 'ecosia':
            return '<i class="fas fa-leaf"></i>';
        case 'startpage':
            return '<i class="fas fa-compass"></i>';
        case 'mojeek':
            return '<i class="fas fa-search-plus"></i>';
        case 'yippy':
            return '<i class="fas fa-dice"></i>';
        default:
            return '';
    }
}

// Function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Load selected engines on page load
const storedSelectedEngines = JSON.parse(localStorage.getItem('selectedEngines')) || ['google', 'bing', 'duckduckgo'];
const storedDefaultEngine = localStorage.getItem('defaultEngine') || (storedSelectedEngines[0] || 'google');
updateEngineButtons(storedSelectedEngines, storedDefaultEngine);
currentEngine = storedDefaultEngine;

// Lógica para desplegable rápido de ajustes actualizada
const quickDropdown = document.querySelector('.quick-settings-dropdown');
const quickTheme = document.getElementById('quick-theme');
const quickNewTab = document.getElementById('quick-new-tab');
const quickFontSize = document.getElementById('quick-font-size');
const quickAnimations = document.getElementById('quick-animations');

let hoverTimer;
let hideTimer;

// Al pasar el mouse sobre settingsButton se muestra el dropdown tras 500ms, pero solo si no se están mostrando los ajustes
settingsButton.addEventListener('mouseenter', () => {
    if (settingsModal.style.visibility === 'visible') return; // Evita abrir el desplegable rápido si los ajustes están abiertos
    clearTimeout(hideTimer);
    hoverTimer = setTimeout(() => {
        quickDropdown.classList.add('visible');
    }, 500);
});

// Al salir se oculta tras 3000ms para poder usar el dropdown
settingsButton.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimer);
    hideTimer = setTimeout(() => {
        quickDropdown.classList.remove('visible');
    }, 3000); // Se cambió de 1000 a 3000 ms
});

quickDropdown.addEventListener('mouseenter', () => {
    clearTimeout(hideTimer);
});
quickDropdown.addEventListener('mouseleave', () => {
    hideTimer = setTimeout(() => {
        quickDropdown.classList.remove('visible');
    }, 3000);
});

// Nuevo evento: Mientras se mueve el mouse sobre el dropdown reinicia el retardo
quickDropdown.addEventListener('mousemove', () => {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
        quickDropdown.classList.remove('visible');
    }, 3000);
});

// Vincular controles rápidos existentes
quickTheme.addEventListener('change', () => {
    applyTheme(quickTheme.value);
    localStorage.setItem('themePreference', quickTheme.value);
    themeSelect.value = quickTheme.value; // Sincroniza con ajustes principales
    updateThemeSwitchIcon(); // Actualiza el icono del tema
});
quickNewTab.addEventListener('change', () => {
    localStorage.setItem('openInNewTab', quickNewTab.checked);
    newTabToggle.checked = quickNewTab.checked;
});

// Vincular nuevos controles rápidos
quickFontSize.addEventListener('change', () => {
    document.body.style.fontSize = quickFontSize.value + 'px';
    localStorage.setItem('fontSize', quickFontSize.value);
    fontSizeInput.value = quickFontSize.value; // Sincroniza con ajustes principales
});
quickAnimations.addEventListener('change', () => {
    localStorage.setItem('animationsEnabled', quickAnimations.checked);
    animationsToggle.checked = quickAnimations.checked;
});

// Sincronizar valores al cargar
quickTheme.value = localStorage.getItem('themePreference') || 'light';
quickNewTab.checked = localStorage.getItem('openInNewTab') === 'true';
quickFontSize.value = localStorage.getItem('fontSize') || '16';
quickAnimations.checked = localStorage.getItem('animationsEnabled') === 'true';

// Auto-click en sugerencia tras 600ms
const autoClickButtons = document.querySelectorAll('button:not(.settings-button)');
autoClickButtons.forEach(btn => {
    let autoClickTimer;
    btn.addEventListener('mouseenter', () => {
        autoClickTimer = setTimeout(() => {
            btn.click();
        }, 600);
    });
    btn.addEventListener('mouseleave', () => {
        clearTimeout(autoClickTimer);
    });
});

// Auto-click para themeSwitch (botón de la luna) con duración de 600 ms.
let autoClickTimerTheme;
themeSwitch.addEventListener('mouseenter', () => {
    autoClickTimerTheme = setTimeout(() => {
        themeSwitch.click();
    }, 600);
});
themeSwitch.addEventListener('mouseleave', () => {
    clearTimeout(autoClickTimerTheme);
});

// Auto-click para opciones en la modal de selección de motores
const autoClickEngineOptions = document.querySelectorAll('.engine-option');
autoClickEngineOptions.forEach(option => {
    let timer;
    option.addEventListener('mouseenter', () => {
        timer = setTimeout(() => {
            option.click();
        }, 600);
    });
    option.addEventListener('mouseleave', () => {
        clearTimeout(timer);
    });
});

// Auto-click para elementos del desplegable rápido de ajustes
const autoClickQuickSettings = document.querySelectorAll('.quick-setting');
autoClickQuickSettings.forEach(qs => {
    let timer;
    qs.addEventListener('mouseenter', () => {
        timer = setTimeout(() => {
            qs.click();
        }, 600);
    });
    qs.addEventListener('mouseleave', () => {
        clearTimeout(timer);
    });
});

// Modificar el comportamiento del auto-click para añadir el delay entre clicks
function addAutoClickWithDelay(element, callback, delay = 600) {
    if (element.classList && element.classList.contains('suggestion-item')) {
        return;
    }
    let canClick = true;
    let timer;

    element.addEventListener('mouseenter', () => {
        if (canClick) {
            timer = setTimeout(() => {
                callback();
                canClick = false;
                setTimeout(() => {
                    canClick = true;
                }, delay);
            }, delay);
        }
    });

    element.addEventListener('mouseleave', () => {
        clearTimeout(timer);
    });
}

// Actualizar los auto-clicks existentes
document.querySelectorAll('button:not(.settings-button)').forEach(btn => {
    addAutoClickWithDelay(btn, () => btn.click());
});

document.querySelectorAll('.engine-option').forEach(option => {
    addAutoClickWithDelay(option, () => option.click());
});

document.querySelectorAll('.quick-setting').forEach(qs => {
    addAutoClickWithDelay(qs, () => qs.click());
});

// Auto-click para themeSwitch con el nuevo comportamiento
addAutoClickWithDelay(themeSwitch, () => themeSwitch.click());

// Function to update auto-click state
function updateAutoClickState() {
    const autoClickEnabled = autoClickToggle.checked;
    const elements = document.querySelectorAll('button:not(.settings-button), .engine-option, .quick-setting, .language-selector');
    elements.forEach(element => {
        if (autoClickEnabled) {
            addAutoClickWithDelay(element, () => element.click());
        } else {
            element.removeEventListener('mouseenter', element.autoClickHandler);
            element.removeEventListener('mouseleave', element.autoClickClearHandler);
        }
    });
}

// Configuración de idiomas
const translations = {
    es: {
        searchPlaceholder: "Escribe para buscar...",
        settings: "Configuración",
        appearance: "Apariencia",
        animations: "Animaciones",
        theme: "Tema",
        fontSize: "Tamaño de fuente",
        fontFamily: "Tipo de letra",
        search: "Búsqueda",
        newTab: "Abrir en nueva pestaña",
        defaultEngine: "Motor predeterminado",
        privacy: "Privacidad",
        saveHistory: "Guardar historial",
        useLocation: "Usar ubicación",
        editOrder: "Editar Orden",
        save: "Guardar"
    },
    eu: {
        searchPlaceholder: "Idatzi bilatzeko...",
        settings: "Ezarpenak",
        appearance: "Itxura",
        animations: "Animazioak",
        theme: "Gaia",
        fontSize: "Letra tamaina",
        fontFamily: "Letra mota",
        search: "Bilaketa",
        newTab: "Fitxa berrian ireki",
        defaultEngine: "Bilatzaile lehenetsia",
        privacy: "Pribatutasuna",
        saveHistory: "Historia gorde",
        useLocation: "Kokapena erabili",
        editOrder: "Ordena aldatu",
        save: "Gorde"
    },
    en: {
        searchPlaceholder: "Type to search...",
        settings: "Settings",
        appearance: "Appearance",
        animations: "Animations",
        theme: "Theme",
        fontSize: "Font size",
        fontFamily: "Font family",
        search: "Search",
        newTab: "Open in new tab",
        defaultEngine: "Default engine",
        privacy: "Privacy",
        saveHistory: "Save history",
        useLocation: "Use location",
        editOrder: "Edit Order",
        save: "Save"
    },
    fr: {
        searchPlaceholder: "Tapez pour rechercher...",
        settings: "Paramètres",
        quickSettings: "Paramètres rapides",
        theme: "Thème",
        animations: "Animations",
        fontSize: "Taille de police",
        newTab: "Nouvel onglet"
    },
    de: {
        searchPlaceholder: "Suchen...",
        settings: "Einstellungen",
        quickSettings: "Schnelleinstellungen",
        theme: "Thema",
        animations: "Animationen",
        fontSize: "Schriftgröße",
        newTab: "Neuer Tab"
    },
    it: {
        searchPlaceholder: "Cerca...",
        settings: "Impostazioni",
        quickSettings: "Impostazioni rapide",
        theme: "Tema",
        animations: "Animazioni",
        fontSize: "Dimensione carattere",
        newTab: "Nuova scheda"
    },
    pt: {
        searchPlaceholder: "Digite para pesquisar...",
        settings: "Configurações",
        quickSettings: "Configurações rápidas",
        theme: "Tema",
        animations: "Animações",
        fontSize: "Tamanho da fonte",
        newTab: "Nova aba"
    },
    ru: {
        searchPlaceholder: "Поиск...",
        settings: "Настройки",
        quickSettings: "Быстрые настройки",
        theme: "Тема",
        animations: "Анимации",
        fontSize: "Размер шрифта",
        newTab: "Новая вкладка"
    },
    ja: {
        searchPlaceholder: "検索...",
        settings: "設定",
        quickSettings: "クイック設定",
        theme: "テーマ",
        animations: "アニメーション",
        fontSize: "フォントサイズ",
        newTab: "新しいタブ"
    },
    ko: {
        searchPlaceholder: "검색...",
        settings: "설정",
        quickSettings: "빠른 설정",
        theme: "테마",
        animations: "애니메이션",
        fontSize: "글꼴 크기",
        newTab: "새 탭"
    },
    zh: {
        searchPlaceholder: "搜索...",
        settings: "设置",
        quickSettings: "快速设置",
        theme: "主题",
        animations: "动画",
        fontSize: "字体大小",
        newTab: "新标签页"
    }
    // ...añadir más idiomas según necesites
};

// Añadir el selector de idioma al DOM
document.body.insertAdjacentHTML('beforeend', `
    <div class="language-selector">
        <i class="fas fa-globe"></i>
    </div>
`);

let currentLang = localStorage.getItem('language') || 'es';
let favoriteLanguages = JSON.parse(localStorage.getItem('favoriteLanguages')) || [];

// Función para cambiar el idioma
function changeLanguage() {
    const langs = favoriteLanguages.length > 0 ? favoriteLanguages : Object.keys(translations);
    const currentIndex = langs.indexOf(currentLang);
    currentLang = langs[(currentIndex + 1) % langs.length];
    localStorage.setItem('language', currentLang);
    updateUILanguage();
}

// Función para actualizar el idioma en la UI
function updateUILanguage() {
    const trans = translations[currentLang];
    
    // Actualizar quickSettings
    document.querySelectorAll('.quick-setting label').forEach(label => {
        const forAttr = label.getAttribute('for');
        if (forAttr === 'quick-theme') label.textContent = trans.theme;
        if (forAttr === 'quick-new-tab') label.textContent = trans.newTab;
        if (forAttr === 'quick-font-size') label.textContent = trans.fontSize;
        if (forAttr === 'quick-animations') label.textContent = trans.animations;
    });

    // Resto de las actualizaciones existentes...
    searchInput.placeholder = trans.searchPlaceholder;
    document.querySelector('.settings-header h2').textContent = trans.settings;
    
    // Actualizar secciones de ajustes
    document.querySelectorAll('.settings-section h3').forEach(h3 => {
        if (h3.textContent.includes('Apariencia')) h3.textContent = trans.appearance;
        if (h3.textContent.includes('Búsqueda')) h3.textContent = trans.search;
        if (h3.textContent.includes('Privacidad')) h3.textContent = trans.privacy;
    });

    // Actualizar etiquetas de opciones
    document.querySelector('label[for="animations-toggle"]').textContent = trans.animations;
    document.querySelector('label[for="theme-select"]').textContent = trans.theme;
    document.querySelector('label[for="font-size"]').textContent = trans.fontSize;
    document.querySelector('label[for="font-family"]').textContent = trans.fontFamily;
    document.querySelector('label[for="new-tab-toggle"]').textContent = trans.newTab;
    document.querySelector('label[for="default-engine"]').textContent = trans.defaultEngine;
    document.querySelector('label[for="save-history-toggle"]').textContent = trans.saveHistory;
    document.querySelector('label[for="use-location-toggle"]').textContent = trans.useLocation;
    
    // Actualizar botones
    document.getElementById('edit-engine-order').textContent = trans.editOrder;
    document.querySelector('.save-engine-selection').textContent = trans.save;
}

// Crear modal de selección de idioma
document.body.insertAdjacentHTML('beforeend', `
    <div class="language-modal">
        <button class="close-language-modal">
            <i class="fas fa-times"></i>
        </button>
        <h2>Select Language / Seleccionar Idioma</h2>
        <div class="language-list">
            ${Object.entries(translations).map(([code, lang]) => `
                <div class="language-option" data-lang="${code}">
                    ${getLanguageName(code)}
                    <i class="fas fa-star favorite-star ${favoriteLanguages.includes(code) ? 'active' : ''}"></i>
                </div>
            `).join('')}
        </div>
    </div>
`);

// Función para obtener el nombre del idioma
function getLanguageName(code) {
    const names = {
        es: "Español",
        en: "English",
        eu: "Euskara",
        fr: "Français",
        de: "Deutsch",
        it: "Italiano",
        pt: "Português",
        ru: "Русский",
        ja: "日本語",
        ko: "한국어",
        zh: "中文"
        // Añadir más idiomas según necesites
    };
    return names[code] || code;
}

// Actualizar el evento del selector de idioma
document.querySelector('.language-selector').addEventListener('click', () => {
    document.querySelector('.language-modal').classList.add('active');
    modalOverlay.classList.add('active');
});

// Eventos para el modal de idiomas
document.querySelector('.close-language-modal').addEventListener('click', () => {
    document.querySelector('.language-modal').classList.remove('active');
    modalOverlay.classList.remove('active');
});

// Selección de idioma
document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', () => {
        currentLang = option.dataset.lang;
        localStorage.setItem('language', currentLang);
        updateUILanguage();
        document.querySelector('.language-modal').classList.remove('active');
        modalOverlay.classList.remove('active');
    });

    // Añadir evento para marcar como favorito
    option.querySelector('.favorite-star').addEventListener('click', (e) => {
        e.stopPropagation();
        const langCode = option.dataset.lang;
        if (favoriteLanguages.includes(langCode)) {
            favoriteLanguages = favoriteLanguages.filter(lang => lang !== langCode);
        } else {
            favoriteLanguages.push(langCode);
        }
        localStorage.setItem('favoriteLanguages', JSON.stringify(favoriteLanguages));
        option.querySelector('.favorite-star').classList.toggle('active');
    });
});

// Cargar el idioma al iniciar
updateUILanguage();

// Añadir auto-click al selector de idioma con delay entre clicks
let langTimer;
let langRotationInterval;
let canClickLang = true;

document.querySelector('.language-selector').addEventListener('mouseenter', () => {
    if (canClickLang) {
        langTimer = setTimeout(() => {
            // Primer cambio de idioma
            changeLanguage();
            
            // Configurar intervalo para cambios posteriores
            langRotationInterval = setInterval(() => {
                if (canClickLang) {
                    changeLanguage();
                    canClickLang = false;
                    setTimeout(() => {
                        canClickLang = true;
                    }, 600); // Esperar 0.6s antes de permitir otro cambio
                }
            }, 1000); // Intervalo de 1 segundo entre intentos de cambio
        }, 600); // Espera inicial de 0.6s
    }
});

document.querySelector('.language-selector').addEventListener('mouseleave', () => {
    clearTimeout(langTimer);
    clearInterval(langRotationInterval);
    setTimeout(() => {
        canClickLang = true;
    }, 600);
});

// Mejorar la función de actualización de idioma
function updateUILanguage() {
    const trans = translations[currentLang];
    
    // Actualizar textos principales
    searchInput.placeholder = trans.searchPlaceholder;
    
    // Actualizar textos de ajustes
    document.querySelector('.settings-header h2').textContent = trans.settings;
    
    // Actualizar secciones de ajustes
    document.querySelectorAll('.settings-section h3').forEach(h3 => {
        if (h3.textContent.includes('Apariencia')) h3.textContent = trans.appearance;
        if (h3.textContent.includes('Búsqueda')) h3.textContent = trans.search;
        if (h3.textContent.includes('Privacidad')) h3.textContent = trans.privacy;
    });

    // Actualizar etiquetas de opciones
    document.querySelector('label[for="animations-toggle"]').textContent = trans.animations;
    document.querySelector('label[for="theme-select"]').textContent = trans.theme;
    document.querySelector('label[for="font-size"]').textContent = trans.fontSize;
    document.querySelector('label[for="font-family"]').textContent = trans.fontFamily;
    document.querySelector('label[for="new-tab-toggle"]').textContent = trans.newTab;
    document.querySelector('label[for="default-engine"]').textContent = trans.defaultEngine;
    document.querySelector('label[for="save-history-toggle"]').textContent = trans.saveHistory;
    document.querySelector('label[for="use-location-toggle"]').textContent = trans.useLocation;
    
    // Actualizar botones
    document.getElementById('edit-engine-order').textContent = trans.editOrder;
    document.querySelector('.save-engine-selection').textContent = trans.save;
}

// Crear modal de selección de idioma
document.body.insertAdjacentHTML('beforeend', `
    <div class="language-modal">
        <button class="close-language-modal">
            <i class="fas fa-times"></i>
        </button>
        <h2>Select Language / Seleccionar Idioma</h2>
        <div class="language-list">
            ${Object.entries(translations).map(([code, lang]) => `
                <div class="language-option" data-lang="${code}">
                    ${getLanguageName(code)}
                </div>
            `).join('')}
        </div>
    </div>
`);

// Función para obtener el nombre del idioma
function getLanguageName(code) {
    const names = {
        es: "Español",
        en: "English",
        eu: "Euskara",
        fr: "Français",
        de: "Deutsch",
        it: "Italiano",
        pt: "Português",
        ru: "Русский",
        ja: "日本語",
        ko: "한국어",
        zh: "中文"
        // Añadir más idiomas según necesites
    };
    return names[code] || code;
}

// Actualizar el evento del selector de idioma
document.querySelector('.language-selector').addEventListener('click', () => {
    document.querySelector('.language-modal').classList.add('active');
    modalOverlay.classList.add('active');
});

// Eventos para el modal de idiomas
document.querySelector('.close-language-modal').addEventListener('click', () => {
    document.querySelector('.language-modal').classList.remove('active');
    modalOverlay.classList.remove('active');
});

// Selección de idioma
document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', () => {
        currentLang = option.dataset.lang;
        localStorage.setItem('language', currentLang);
        updateUILanguage();
        document.querySelector('.language-modal').classList.remove('active');
        modalOverlay.classList.remove('active');
    });
});

// Actualizar la función updateUILanguage para incluir los ajustes rápidos
function updateUILanguage() {
    const trans = translations[currentLang];
    
    // Actualizar quickSettings
    document.querySelectorAll('.quick-setting label').forEach(label => {
        const forAttr = label.getAttribute('for');
        if (forAttr === 'quick-theme') label.textContent = trans.theme;
        if (forAttr === 'quick-new-tab') label.textContent = trans.newTab;
        if (forAttr === 'quick-font-size') label.textContent = trans.fontSize;
        if (forAttr === 'quick-animations') label.textContent = trans.animations;
    });

    // Resto de las actualizaciones existentes...
    searchInput.placeholder = trans.searchPlaceholder;
    document.querySelector('.settings-header h2').textContent = trans.settings;
    
    // Actualizar secciones de ajustes
    document.querySelectorAll('.settings-section h3').forEach(h3 => {
        if (h3.textContent.includes('Apariencia')) h3.textContent = trans.appearance;
        if (h3.textContent.includes('Búsqueda')) h3.textContent = trans.search;
        if (h3.textContent.includes('Privacidad')) h3.textContent = trans.privacy;
    });

    // Actualizar etiquetas de opciones
    document.querySelector('label[for="animations-toggle"]').textContent = trans.animations;
    document.querySelector('label[for="theme-select"]').textContent = trans.theme;
    document.querySelector('label[for="font-size"]').textContent = trans.fontSize;
    document.querySelector('label[for="font-family"]').textContent = trans.fontFamily;
    document.querySelector('label[for="new-tab-toggle"]').textContent = trans.newTab;
    document.querySelector('label[for="default-engine"]').textContent = trans.defaultEngine;
    document.querySelector('label[for="save-history-toggle"]').textContent = trans.saveHistory;
    document.querySelector('label[for="use-location-toggle"]').textContent = trans.useLocation;
    
    // Actualizar botones
    document.getElementById('edit-engine-order').textContent = trans.editOrder;
    document.querySelector('.save-engine-selection').textContent = trans.save;
}

// Modificar displaySuggestions para asignar variantes aleatorias a cada sugerencia
function displaySuggestions(items) {
    suggestions.innerHTML = '';
    const limit = parseInt(suggestionsLimitInput.value);
    items = items.slice(0, limit);
    items.forEach(item => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');
        // Agregar clase de variante aleatoria (ej.: variant-1, variant-2 o variant-3)
        const variant = 'variant-' + (Math.floor(Math.random() * 3) + 1);
        suggestionItem.classList.add(variant);
        suggestionItem.textContent = item;
        suggestionItem.addEventListener('click', () => {
            searchInput.value = item;
            clearSuggestions();
            performSearch();
        });
        suggestions.appendChild(suggestionItem);
    });
    suggestions.classList.add('active');
}

// Modificar addAutoClickWithDelay para que no se aplique a elementos con la clase .suggestion-item
function addAutoClickWithDelay(element, callback, delay = 600) {
    if (element.classList && element.classList.contains('suggestion-item')) {
        return;
    }
    let canClick = true;
    let timer;
    element.addEventListener('mouseenter', () => {
        if (canClick) {
            timer = setTimeout(() => {
                callback();
                canClick = false;
            }, delay);
        }
    });
    element.addEventListener('mouseleave', () => {
        clearTimeout(timer);
        canClick = true;
    });
}
