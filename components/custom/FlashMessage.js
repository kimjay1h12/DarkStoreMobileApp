import React, { useState, useEffect } from "react";

// Define the FlashMessage component
export function FlashMessage({ message }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      // Show the message when a message is passed in
      setIsVisible(true);

      // Automatically hide the message after a few seconds (e.g., 3 seconds)
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => {
        // Clear the timer when the component unmounts or the message changes
        clearTimeout(timer);
      };
    }
  }, [message]);

  return isVisible && <div className="flash-message">{message}</div>;
}

// Export the FlashMessage component
export default FlashMessage;
