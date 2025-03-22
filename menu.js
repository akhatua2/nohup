function createMenu() {
    const menu = document.createElement('div');
    menu.className = 'menu-container';
    menu.innerHTML = `
        <div class="menu-option" data-action="comment">
            <img src="${ICONS.COMMENT}" width="16" height="16" alt="Comment">
            Comment
        </div>
        <div class="menu-option" data-action="inbox">
            <img src="${ICONS.INBOX}" width="16" height="16" alt="Inbox">
            Inbox
        </div>
    `;
    document.body.appendChild(menu);
    return menu;
}

function setupMenuHandlers(toolbar, menu) {
    // Toggle menu on toolbar click
    toolbar.addEventListener('click', (e) => {
        if (!e.target.classList.contains('dragging')) {
            console.log('Toolbar clicked');
            const rect = toolbar.getBoundingClientRect();
            menu.style.left = `${rect.left}px`;
            menu.style.top = `${rect.bottom + 8}px`;
            menu.classList.toggle('visible');
        }
    });

    // Handle menu options
    menu.addEventListener('click', (e) => {
        const option = e.target.closest('.menu-option');
        if (option) {
            const action = option.dataset.action;
            console.log(`Menu option clicked: ${action}`);
            
            if (action === 'comment') {
                console.log('Comment action triggered');
                console.log('enableCommentMode exists:', typeof window.enableCommentMode);
                window.enableCommentMode();
            }
            
            menu.classList.remove('visible');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!toolbar.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('visible');
        }
    });
} 