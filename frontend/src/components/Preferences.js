import React, { useState } from 'react';
import axios from 'axios';

const Preferences = () => {
  const [location, setLocation] = useState('');
  const [unit, setUnit] = useState('metric');
  const [message, setMessage] = useState('');

  const backendApiUrl = process.env.REACT_APP_BACKEND_API_URL;

  const handleUpdatePreferences = async () => {
    const token = localStorage.getItem('userToken');
    try {
      const response = await axios.put(
        `${backendApiUrl}/api/users/preferences`,
        { location, unit },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error updating preferences');
    }
  };

  return (
    <div className="preferences-container">
      <h2>Update Preferences</h2>
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="metric">Metric (°C)</option>
        <option value="imperial">Imperial (°F)</option>
      </select>
      <button onClick={handleUpdatePreferences}>Update Preferences</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Preferences;
