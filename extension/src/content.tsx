import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import ControlCenter from './components/ControlCenter';
import { useDomHighlighter } from './hooks/useDomHighlighter';

// Main component to manage state and effects
const App = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Use the custom hook to handle highlighting
  useDomHighlighter(isEditing);

  const handleToggleEditMode = (editing: boolean) => {
    setIsEditing(editing);
    // No need to manually clear highlight here, hook handles cleanup
  };

  // Highlight logic is now entirely within the useDomHighlighter hook

  return (
    <ControlCenter 
      onToggleEditMode={handleToggleEditMode}
      onClick={() => {
        console.log('Control center (non-drag click)');
        // Implement your control center functionality here
      }} 
    />
  );
};

// Function to mount the React component into the page using Shadow DOM
function mountApp() {
  // Ensure the host element exists
  let hostElement = document.getElementById('nohup-shadow-host');
  if (!hostElement) {
    hostElement = document.createElement('div');
    hostElement.id = 'nohup-shadow-host';
    document.body.appendChild(hostElement);
  }

  // Ensure Shadow DOM is attached only once
  let shadowRoot = hostElement.shadowRoot;
  if (!shadowRoot) {
    shadowRoot = hostElement.attachShadow({ mode: 'open' });
  }

  // Ensure the React root container inside the Shadow DOM exists
  let reactRootContainer = shadowRoot.getElementById('nohup-react-root');
  if (!reactRootContainer) {
    reactRootContainer = document.createElement('div');
    reactRootContainer.id = 'nohup-react-root';
    shadowRoot.appendChild(reactRootContainer);
  }

  // Create a React root inside the Shadow DOM and render our App
  const root = createRoot(reactRootContainer);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Wait for the DOM to be fully loaded before inserting the control center
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
} 