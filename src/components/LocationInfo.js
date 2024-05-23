import React from 'react';
import './LocationInfo.css';

const LocationInfo = ({ location }) => {
  return (
    <div className="location-info">
      <h2>{location}</h2>
    </div>
  );
};

export default LocationInfo;
