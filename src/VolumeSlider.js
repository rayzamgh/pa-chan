// src/VolumeSlider.js
import React from 'react';
import { useVolume } from './VolumeContext';

function VolumeSlider() {
  const { volume, setVolume } = useVolume();

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="volume-slider">
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
}

export default VolumeSlider;
