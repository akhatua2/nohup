let isCommentMode = false;

// Make the function globally accessible
window.enableCommentMode = function() {
    isCommentMode = true;
    console.log('Enabling comment mode...');
    
    // Add comment mode class to body
    document.body.classList.add('comment-mode');
    
    // Start component marking
    ComponentMarker.start();
    
    // One-time click handler for placing the comment
    const clickHandler = async (e) => {
        console.log('Click handler triggered, isCommentMode:', isCommentMode);
        if (!isCommentMode) return;
        
        // Prevent default actions (like following links) and stop event propagation
        e.preventDefault();
        e.stopPropagation();
        
        // Don't place comment if clicking on menu or toolbar
        if (e.target.closest('.menu-container') || e.target.closest('.floating-toolbar')) {
            return;
        }
        
        // Find the target component using shared function
        const targetComponent = ComponentMarker.findNearestComponent(e.target);
        if (!targetComponent) return;
        
        // Log component details
        const componentInfo = {
            tagName: targetComponent.tagName.toLowerCase(),
            id: targetComponent.id || 'no-id',
            classes: Array.from(targetComponent.classList).join(' ') || 'no-classes',
            textContent: targetComponent.textContent.slice(0, 50) + (targetComponent.textContent.length > 50 ? '...' : '')
        };
        console.log('Anchoring comment to component:', componentInfo);
        
        const comment = document.createElement('div');
        comment.className = 'floating-comment';
        comment.innerHTML = `<img src="${ICONS.COMMENT}" width="16" height="16" alt="Comment">`;
        document.body.appendChild(comment);
        
        // Position data for the comment
        const componentRect = targetComponent.getBoundingClientRect();
        const position = {
            relativeX: e.clientX - componentRect.left,
            relativeY: e.clientY - componentRect.top
        };
        
        // Save comment to backend
        try {
            const savedComment = await CommentAPI.createComment(
                window.location.href,
                componentInfo,
                position,
                "Add your comment here" // TODO: Add comment input UI
            );
            console.log('Comment saved:', savedComment);
        } catch (error) {
            console.error('Failed to save comment:', error);
        }
        
        // Anchor the comment to the component using the same relative coordinates
        CommentAnchor.anchor(comment, targetComponent, e.clientX, e.clientY);
        
        
        // Exit comment mode
        disableCommentMode();
        document.removeEventListener('click', clickHandler, true);
    };

    // Use capture phase to ensure our handler runs before other click handlers
    document.addEventListener('click', clickHandler, true);
}

function disableCommentMode() {
    console.log('Disabling comment mode...');
    isCommentMode = false;
    document.body.classList.remove('comment-mode');
    
    // Stop component marking
    ComponentMarker.stop();
}

// Initialize the anchor system
CommentAnchor.initialize();

// Load existing comments when page loads
window.addEventListener('load', () => CommentLoader.loadComments()); 