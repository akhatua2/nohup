function enableDragging(element) {
    let isDragging = false;
    let startX, startY;
    let hasMoved = false;
    const EDGE_PADDING = 8; // Padding from viewport edges
    const MOVE_THRESHOLD = 5; // Minimum pixels moved to consider it a drag

    element.addEventListener('mousedown', e => {
        isDragging = true;
        hasMoved = false;
        element.classList.add('dragging');
        
        const rect = element.getBoundingClientRect();
        startX = e.clientX - rect.left;
        startY = e.clientY - rect.top;
    });

    document.addEventListener('mousemove', e => {
        if (!isDragging) return;
        e.preventDefault();
        
        const x = e.clientX - startX;
        const y = e.clientY - startY;

        // Check if moved more than threshold
        if (!hasMoved) {
            const deltaX = Math.abs(x - element.offsetLeft);
            const deltaY = Math.abs(y - element.offsetTop);
            if (deltaX > MOVE_THRESHOLD || deltaY > MOVE_THRESHOLD) {
                hasMoved = true;
            }
        }
        
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;

        // If it was a click (no significant movement), don't snap
        if (!hasMoved) {
            isDragging = false;
            element.classList.remove('dragging');
            return;
        }

        isDragging = false;

        // Get current position and dimensions
        const rect = element.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Calculate distances to edges (considering padding)
        const distanceToLeft = rect.left - EDGE_PADDING;
        const distanceToRight = (viewportWidth - EDGE_PADDING) - rect.right;
        const distanceToTop = rect.top - EDGE_PADDING;
        const distanceToBottom = (viewportHeight - EDGE_PADDING) - rect.bottom;

        // Find closest edge (comparing horizontal vs vertical)
        const closestHorizontal = Math.min(distanceToLeft, distanceToRight);
        const closestVertical = Math.min(distanceToTop, distanceToBottom);

        let finalX = rect.left;
        let finalY = rect.top;

        // Snap to either horizontal or vertical edge, whichever is closer
        if (closestHorizontal < closestVertical) {
            // Snap horizontally
            finalX = distanceToLeft < distanceToRight ? EDGE_PADDING : viewportWidth - rect.width - EDGE_PADDING;
            finalY = rect.top; // Keep vertical position
        } else {
            // Snap vertically
            finalY = distanceToTop < distanceToBottom ? EDGE_PADDING : viewportHeight - rect.height - EDGE_PADDING;
            finalX = rect.left; // Keep horizontal position
        }

        // Remove dragging class before setting final position to enable transition
        element.classList.remove('dragging');
        
        // Set final position with padding
        element.style.left = `${finalX}px`;
        element.style.top = `${finalY}px`;
    });

    // Return whether the last interaction was a drag
    return () => hasMoved;
} 