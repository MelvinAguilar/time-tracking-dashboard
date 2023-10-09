import React, { useEffect } from "react";

type Event = MouseEvent | TouchEvent;

// Custom hook that listens for clicks outside a set of provided HTML element references.
// It triggers a given action when a click occurs outside these elements, facilitating
// the implementation of actions like closing popups or tooltips.
const useClickOutside = (
  refs: React.RefObject<HTMLElement>[],
  action: () => void,
) => {
  useEffect(() => {
    // Event handler for click events outside the provided elements
    const handleClickOutside = (event: Event) => {
      if (
        refs.every(
          (ref) => ref.current && !ref.current.contains(event.target as Node),
        )
      ) {
        action();
      }
    };

    // Add event listeners for click events
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [refs, action]);
};

export default useClickOutside;
