import React from 'react';
import { useDraggable } from '../hooks/useDraggable';

interface ControlCenterProps {
  onClick?: () => void;
}

/**
 * ControlCenter component for NoHUP extension
 * Creates a floating, draggable control center button
 */
const ControlCenter: React.FC<ControlCenterProps> = ({ onClick }) => {
  // Use the draggable hook with initial position in bottom right
  const initialPosition = {
    x: window.innerWidth - 420,
    y: window.innerHeight - 520  // Adjusted for the 500px height
  };
  
  const { position, isDragging, ref, handleMouseDown } = useDraggable(initialPosition);
  
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
    padding: '16px 16px 16px 16px',
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
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      id="nohup-control-center"
      style={containerStyle}
      onMouseDown={handleMouseDown}
      onClick={isDragging ? undefined : onClick || (() => console.log('Control center clicked'))}
    >
      <div style={headerStyle}>Control Center</div>
      <div style={contentStyle}>
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default ControlCenter; 