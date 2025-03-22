function calculateMenuPosition(triggerElement, menuElement) {
    const triggerRect = triggerElement.getBoundingClientRect();
    const menuRect = menuElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Default position (below trigger)
    let x = triggerRect.left;
    let y = triggerRect.bottom + 8;

    // Check horizontal overflow
    if (x + menuRect.width > viewportWidth) {
        x = viewportWidth - menuRect.width - 8;
    }
    if (x < 8) {
        x = 8;
    }

    // Check vertical overflow
    if (y + menuRect.height > viewportHeight) {
        // Place above trigger if not enough space below
        y = triggerRect.top - menuRect.height - 8;
    }
    if (y < 8) {
        y = 8;
    }

    return { x, y };
} 