import { useState, useEffect } from 'react';

/**
 * Custom hook to handle highlighting DOM elements on hover.
 * @param isEnabled Whether the highlighting functionality should be active.
 * @param highlightStyle The CSS outline style to apply (e.g., '2px dashed red').
 * @param ignoredSelector A CSS selector for elements (and their children) to ignore (e.g., the extension UI itself).
 */
export function useDomHighlighter(isEnabled: boolean, highlightStyle: string = '2px solid blue', ignoredSelector: string = '#nohup-shadow-host') {
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if the target is not ignored (removed the tagName check)
      if (!target.closest(ignoredSelector)) {
        // Remove highlight from previous element
        if (highlightedElement && highlightedElement !== target) {
          try { highlightedElement.style.outline = ''; } catch (e) { /* Ignore potential errors */ }
        }
        // Apply highlight to the new target
        try {
          target.style.outline = highlightStyle;
          setHighlightedElement(target);
        } catch (e) { /* Ignore potential errors */ }
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if the target is the one currently highlighted
      if (target === highlightedElement) {
        try { target.style.outline = ''; } catch (e) { /* Ignore potential errors */ }
        setHighlightedElement(null);
      }
    };

    if (isEnabled) {
      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mouseout', handleMouseOut);
    } else {
      // Cleanup: remove highlight from the last element when disabling
      if (highlightedElement) {
        try { highlightedElement.style.outline = ''; } catch (e) { /* Ignore potential errors */ }
        setHighlightedElement(null);
      }
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    }

    // Cleanup listeners on component unmount or when isEnabled changes
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      // Ensure highlight is removed if hook unmounts while active
      if (highlightedElement) {
          try { highlightedElement.style.outline = ''; } catch (e) { /* Ignore potential errors */ }
      }
    };
    // Only re-run the effect if isEnabled changes
  }, [isEnabled, highlightStyle, ignoredSelector, highlightedElement]); 

  // This hook primarily manages side effects and doesn't need to return anything for now
  // but you could return highlightedElement if needed elsewhere.
} 