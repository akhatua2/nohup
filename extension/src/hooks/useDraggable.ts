import { useState, useRef, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface DraggableReturn {
  position: Position;
  isDragging: boolean;
  ref: React.RefObject<HTMLElement>;
  handleMouseDown: (e: React.MouseEvent) => void;
}

/**
 * Custom hook to make any component draggable
 * @param initialPosition The initial position of the element
 * @returns Object containing position state, drag state, ref, and event handlers
 */
export function useDraggable(initialPosition: Position): DraggableReturn {
  // State for tracking position and drag status
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  
  // Refs for tracking element and drag offset
  const ref = useRef<HTMLElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  
  // Handle mousedown event to start dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only handle left mouse button
    if (e.button !== 0) return;
    
    // Prevent text selection during dragging
    e.preventDefault();
    
    const element = ref.current;
    if (!element) return;
    
    // Calculate the offset of the mouse cursor from the component's top-left corner
    const rect = element.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    setIsDragging(true);
  };
  
  // Handle mousemove event for dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    // Calculate new position based on mouse position and initial offset
    const newX = e.clientX - dragOffset.current.x;
    const newY = e.clientY - dragOffset.current.y;
    
    // Update position
    setPosition({
      x: newX,
      y: newY
    });
  };
  
  // Handle mouseup event to end dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Add and remove event listeners for drag operations
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    
    // Cleanup event listeners when component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  
  return {
    position,
    isDragging,
    ref,
    handleMouseDown
  };
} 