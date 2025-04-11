import React from 'react';
import { createRoot } from 'react-dom/client';
import ControlCenter from './components/ControlCenter';

// Function to mount the React component into the page using Shadow DOM
function mountControlCenter() {
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

  // Create a React root inside the Shadow DOM and render our component
  const root = createRoot(reactRootContainer);
  root.render(
    <React.StrictMode>
      <ControlCenter 
        onClick={() => {
          console.log('Control center clicked');
          // Implement your control center functionality here
        }} 
      />
    </React.StrictMode>
  );
}

// Wait for the DOM to be fully loaded before inserting the control center
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountControlCenter);
} else {
  mountControlCenter();
} 