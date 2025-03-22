// Create and initialize the floating toolbar
function createFloatingToolbar() {
    // Check if toolbar already exists
    if (document.querySelector('.floating-toolbar')) {
        return;
    }

    const toolbar = document.createElement('div');
    toolbar.className = 'floating-toolbar';
    toolbar.style.opacity = '0.8';
    toolbar.style.left = '8px';
    toolbar.style.top = '8px';

    // Create toolbar icon using Material Icons
    const icon = document.createElement('div');
    icon.className = 'toolbar-icon';
    icon.innerHTML = `<img src="${ICONS.MENU}" width="16" height="16" alt="Menu">`;
    toolbar.appendChild(icon);

    // Create and setup menu
    const menu = createMenu();
    setupMenuHandlers(toolbar, menu);

    document.body.appendChild(toolbar);
}

// Try to initialize as soon as possible
function initializeToolbar() {
    try {
        createFloatingToolbar();
    } catch (error) {
        console.error('Error creating toolbar:', error);
    }
}

// Multiple initialization attempts to ensure the toolbar is created
document.addEventListener('DOMContentLoaded', initializeToolbar);
window.addEventListener('load', initializeToolbar);

// Immediate execution
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initializeToolbar, 0);
} 