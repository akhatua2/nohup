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

// Find a component using saved component info
function findComponentByInfo(componentInfo) {
    // Try finding by ID first
    if (componentInfo.id && componentInfo.id !== 'no-id') {
        const elementById = document.getElementById(componentInfo.id);
        if (elementById) return elementById;
    }

    // Try finding by class if ID not found
    if (componentInfo.classes && componentInfo.classes !== 'no-classes') {
        const classSelector = componentInfo.classes.split(' ')
            .map(cls => '.' + cls)
            .join('');
        const elementsByClass = document.querySelectorAll(`${componentInfo.tagName}${classSelector}`);
        
        // If there's only one element with these classes, return it
        if (elementsByClass.length === 1) return elementsByClass[0];
        
        // If multiple elements found, try matching by text content
        if (elementsByClass.length > 1 && componentInfo.textContent) {
            return Array.from(elementsByClass).find(el => 
                el.textContent.includes(componentInfo.textContent.slice(0, 50))
            );
        }
    }

    // Fallback: try finding by tag and text content
    if (componentInfo.textContent) {
        const elements = document.getElementsByTagName(componentInfo.tagName);
        return Array.from(elements).find(el => 
            el.textContent.includes(componentInfo.textContent.slice(0, 50))
        );
    }

    return null;
}

// Export the functionality
window.ComponentMarker = {
    start: startComponentMarking,
    stop: stopComponentMarking,
    clear: clearHighlight,
    findNearestComponent,
    findComponentByInfo
}; 