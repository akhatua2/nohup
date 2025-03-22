# Floating Toolbar Extension

A Chrome extension that provides a floating toolbar with comment functionality.

## Project Structure

```
extension/
├── src/
│   ├── components/          # UI Components
│   │   ├── comment/        # Comment-related components
│   │   │   ├── anchor.js       # Handles comment anchoring to elements
│   │   │   ├── comment.js      # Main comment functionality
│   │   │   ├── comment.css     # Comment styles
│   │   │   └── component-marker.js  # Component highlighting
│   │   ├── toolbar/        # Toolbar components
│   │   └── menu/          # Menu components
│   │       └── menu.js        # Menu functionality
│   ├── utils/             # Utility functions
│   │   ├── drag.js          # Dragging functionality
│   │   ├── menu-utils.js    # Menu positioning utilities
│   │   └── icons.js         # Icon definitions
│   ├── styles/            # Global styles
│   │   └── styles.css       # Main stylesheet
│   └── content.js         # Main extension script
├── manifest.json          # Extension manifest
└── README.md             # This file
```

## Features

- Floating toolbar that can be dragged around the page
- Comment functionality with component anchoring
- Component highlighting when placing comments
- Menu system with various options

## Development

1. Clone the repository
2. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the extension directory

## Future Plans

- Backend integration for comment storage
- User authentication
- Comment management dashboard 