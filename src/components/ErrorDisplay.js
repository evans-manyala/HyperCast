import React from 'react';

// ErrorDisplay component to display error messages
const ErrorDisplay = ({ message }) => {
  return (
    <div className="error-display">
      <p>{message}</p> {/* Display the error message passed as a prop */}
    </div>
  );
};

export default ErrorDisplay;
