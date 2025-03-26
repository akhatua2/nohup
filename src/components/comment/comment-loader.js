// Handle loading and rendering of saved comments
const CommentLoader = {
    // Create a comment element from saved data
    createCommentElement: (commentData) => {
        console.log('Creating comment with data:', {
            component_info: commentData.component_info,
            position: commentData.position
        });

        // Create the comment element
        const comment = document.createElement('div');
        comment.className = 'floating-comment';
        comment.innerHTML = `<img src="${ICONS.COMMENT}" width="16" height="16" alt="Comment">`;
        document.body.appendChild(comment);

        // Find the target component using the saved component info
        const targetComponent = ComponentMarker.findComponentByInfo(commentData.component_info);
        
        if (targetComponent) {
            // Get the component's current position
            const componentRect = targetComponent.getBoundingClientRect();
            console.log('Target component found:', {
                rect: {
                    left: componentRect.left,
                    top: componentRect.top,
                    width: componentRect.width,
                    height: componentRect.height
                }
            });
            
            // Use relative coordinates directly
            const { relativeX, relativeY } = commentData.position;
            console.log('Using relative coordinates:', { relativeX, relativeY });
            
            // Anchor the comment using relative coordinates
            CommentAnchor.anchor(comment, targetComponent, relativeX, relativeY, true);
            enableDragging(comment);
        } else {
            console.error('Target component not found for comment:', commentData);
        }

        return comment;
    },

    // Load and render all comments for current page
    loadComments: async () => {
        try {
            const comments = await CommentAPI.getComments(window.location.href);
            console.log('Loaded comments:', comments);
            
            comments.forEach(commentData => {
                CommentLoader.createCommentElement(commentData);
            });
        } catch (error) {
            console.error('Failed to load comments:', error);
        }
    }
}; 