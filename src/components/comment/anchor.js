// Track all anchored comments for position updates
const anchoredComments = new Map(); // Map<comment element, anchor data>

// Create an anchor for a comment at the clicked position
function anchorComment(comment, targetComponent, clickX, clickY, useRelativeCoords = false) {
    // Get the component's position
    const componentRect = targetComponent.getBoundingClientRect();
    
    // Use provided coordinates directly if they are relative, otherwise calculate them
    const relativeX = useRelativeCoords ? clickX : clickX - componentRect.left;
    const relativeY = useRelativeCoords ? clickY : clickY - componentRect.top;
    
    console.log('Anchoring comment with coordinates:', {
        useRelativeCoords,
        provided: { x: clickX, y: clickY },
        calculated: { relativeX, relativeY }
    });
    
    // Store the anchor data
    anchoredComments.set(comment, {
        component: targetComponent,
        relativeX,
        relativeY
    });
    
    // Update comment position
    updateCommentPosition(comment);
    
    // Change positioning from fixed to absolute
    comment.style.position = 'absolute';
}

// Update a single comment's position based on its anchor
function updateCommentPosition(comment) {
    const anchorData = anchoredComments.get(comment);
    if (!anchorData) return;
    
    const { component, relativeX, relativeY } = anchorData;
    const componentRect = component.getBoundingClientRect();
    
    // Calculate absolute position
    const absoluteX = componentRect.left + relativeX + window.scrollX;
    const absoluteY = componentRect.top + relativeY + window.scrollY;
    
    // Update comment position
    comment.style.left = `${absoluteX}px`;
    comment.style.top = `${absoluteY}px`;
}

// Update all anchored comments
function updateAllComments() {
    anchoredComments.forEach((_, comment) => {
        updateCommentPosition(comment);
    });
}

// Remove anchor tracking for a comment
function removeAnchor(comment) {
    anchoredComments.delete(comment);
}

// Start listening for scroll and resize events
function initialize() {
    // Update positions on scroll
    document.addEventListener('scroll', () => {
        requestAnimationFrame(updateAllComments);
    }, true); // Use capture to handle all scroll events
    
    // Update positions on resize
    window.addEventListener('resize', () => {
        requestAnimationFrame(updateAllComments);
    });
}

// Export the functionality
window.CommentAnchor = {
    anchor: anchorComment,
    remove: removeAnchor,
    initialize
}; 