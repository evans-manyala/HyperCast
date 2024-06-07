import React from 'react';
import './LocationInfo.css';

// Component to display location information
const LocationInfo = ({ location }) => {
  return (
    <div className="location-info">
      <h2>{location}</h2>
    </div>
  );
};

export default LocationInfo;
