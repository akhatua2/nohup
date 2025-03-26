// API endpoints
const API_BASE_URL = 'http://localhost:8000';

// Validation functions
function validatePosition(position) {
    if (!position || typeof position !== 'object') {
        throw new Error('Position must be an object');
    }
    if (typeof position.relativeX !== 'number' || typeof position.relativeY !== 'number') {
        throw new Error('Position coordinates must be numbers');
    }
    return {
        relativeX: position.relativeX,
        relativeY: position.relativeY
    };
}

function validateComponentInfo(info) {
    if (!info || typeof info !== 'object') {
        throw new Error('Component info must be an object');
    }
    const required = ['tagName', 'id', 'classes', 'textContent'];
    for (const field of required) {
        if (typeof info[field] !== 'string') {
            throw new Error(`${field} must be a string`);
        }
    }
    return {
        tagName: info.tagName,
        id: info.id,
        classes: info.classes,
        textContent: info.textContent
    };
}

// API functions
const CommentAPI = {
    // Create a new comment
    createComment: async (url, componentInfo, position, text) => {
        try {
            // Validate inputs
            if (typeof url !== 'string' || !url.match(/^https?:\/\/.*/)) {
                throw new Error('Invalid URL format');
            }
            if (typeof text !== 'string' || text.length === 0) {
                throw new Error('Text must be a non-empty string');
            }

            const validatedData = {
                url,
                component_info: validateComponentInfo(componentInfo),
                position: validatePosition(position),
                text
            };

            const response = await fetch(`${API_BASE_URL}/comments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(validatedData)
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Server error:', error);
                throw new Error('Failed to create comment');
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    },

    // Get all comments for a URL
    getComments: async (url) => {
        try {
            if (typeof url !== 'string') {
                throw new Error('URL must be a string');
            }
            const response = await fetch(`${API_BASE_URL}/comments/?url=${encodeURIComponent(url)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching comments:', error);
            throw error;
        }
    }
}; 