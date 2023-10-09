import { useEffect } from "react";

const useKeyPress = (targetKey: string, action: () => void): void => {
  useEffect(() => {
    // Event handler for key down event
    const downHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        action(); // Call the provided action when the target key is pressed
      }
    };

    // Add the event listener for key down event
    document.addEventListener("keydown", downHandler);

    // Clean up by removing the event listener when the component unmounts
    // or the targetKey or action changes
    return () => {
      document.removeEventListener("keydown", downHandler);
    };
  }, [targetKey, action]);
};

export default useKeyPress;
