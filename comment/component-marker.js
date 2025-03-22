// List of selectors that we consider as valid components
const COMPONENT_SELECTORS = 'div, section, article, nav, header, footer, form, button, a';

// Find the nearest valid component from an element
function findNearestComponent(element) {
    return element.closest(COMPONENT_SELECTORS);
}

// Track the currently highlighted element
let lastHighlightedElement = null;

// Start tracking components for highlighting
function startComponentMarking() {
    document.addEventListener('mousemove', handleComponentHover);
}

// Stop tracking components and clean up
function stopComponentMarking() {
    document.removeEventListener('mousemove', handleComponentHover);
    clearHighlight();
}

// Handle component hover detection
function handleComponentHover(e) {
    // Find the nearest component-like element
    const target = findNearestComponent(e.target);
    
    // Remove highlight from previous element
    if (lastHighlightedElement && lastHighlightedElement !== target) {
        lastHighlightedElement.classList.remove('component-highlight');
    }
    
    // Add highlight to new target if it's a valid component
    if (target && !target.closest('.floating-toolbar') && !target.closest('.menu-container')) {
        target.classList.add('component-highlight');
        lastHighlightedElement = target;
    }
}

// Clear any existing highlight
function clearHighlight() {
    if (lastHighlightedElement) {
        lastHighlightedElement.classList.remove('component-highlight');
        lastHighlightedElement = null;
    }
}

// Export the functionality
window.ComponentMarker = {
    start: startComponentMarking,
    stop: stopComponentMarking,
    clear: clearHighlight,
    findNearestComponent
}; 