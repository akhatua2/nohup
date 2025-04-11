import React, { useState } from 'react';
import { useDraggable } from '../hooks/useDraggable';

interface ControlCenterProps {
  onClick?: () => void;
  onToggleEditMode: (isEditing: boolean) => void; // Callback for edit mode
}

/**
 * ControlCenter component for NoHUP extension
 * Creates a floating, draggable control center button
 */
const ControlCenter: React.FC<ControlCenterProps> = ({ onClick, onToggleEditMode }) => {
  // Use the draggable hook with initial position in bottom right
  const initialPosition = {
    x: window.innerWidth - 420,
    y: window.innerHeight - 520  // Adjusted for the 500px height
  };
  
  const { position, isDragging, ref, handleMouseDown } = useDraggable(initialPosition);
  
  // State for edit mode
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditToggle = () => {
    const newEditMode = !isEditMode;
    setIsEditMode(newEditMode);
    onToggleEditMode(newEditMode);
  };

  // Styles for the component
  const containerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    position: 'fixed',
    top: `${position.y}px`,
    left: `${position.x}px`,
    width: '400px',
    height: '500px',
    borderRadius: '12px',
    backgroundColor: 'rgba(15, 25, 50, 0.5)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: 9999,
    transition: isDragging ? 'none' : 'all 0.2s ease',
    border: '1px solid rgba(100, 150, 255, 0.15)',
    userSelect: 'none',
    overflow: 'hidden',
  };

  const headerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    width: '100%',
    padding: '24px 8px 16px 8px',
    textAlign: 'left',
    fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif',
    fontSize: '18px',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: '0.5px',
    cursor: 'move',
  };

  const contentStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column', // Stack items vertically
    alignItems: 'flex-start', // Align items to the start (left)
    padding: '16px 24px', // Add some padding
    overflowY: 'auto', // Allow scrolling if content exceeds height
  };

  const buttonStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: isEditMode ? '#e53e3e' : '#3182ce', // Red when active, Blue when inactive
    color: 'white',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    marginBottom: '16px', // Space below button
  };

  // Prevent drag from starting when clicking the button
  const handleButtonMouseDown = (e: React.MouseEvent) => {
      e.stopPropagation();
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      id="nohup-control-center"
      style={containerStyle}
      onMouseDown={handleMouseDown}
      onClick={isDragging ? undefined : onClick}
    >
      <div style={headerStyle} onMouseDown={handleMouseDown}>
        Control Center
      </div>
      <div style={contentStyle}>
        <button 
          style={buttonStyle} 
          onClick={handleEditToggle}
          onMouseDown={handleButtonMouseDown} // Prevent dragging when clicking button
        >
          {isEditMode ? 'Stop Editing' : 'Edit'}
        </button>
        {/* Rest of the content goes here */}
      </div>
    </div>
  );
};

export default ControlCenter; 