import React from 'react';

const ErrorDisplay = ({ message }) => {
  return (
    <div className="error-display">
      <p>{message}</p>
    </div>
  );
};

export default ErrorDisplay;
