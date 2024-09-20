import React, { useState } from 'react';

interface ControlPanelProps {
  onSettingsChange: (settings: Settings) => void;
}

export interface Settings {
  walkingSpeed: number;
  rainSpeed: number;
  rainAngle: number;
  rainVolume: number;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onSettingsChange }) => {
  const [walkingSpeed, setWalkingSpeed] = useState(5);
  const [rainSpeed, setRainSpeed] = useState(5);
  const [rainAngle, setRainAngle] = useState(90);
  const [rainVolume, setRainVolume] = useState(50);

  const handleSettingsChange = () => {
    onSettingsChange({
      walkingSpeed,
      rainSpeed,
      rainAngle,
      rainVolume,
    });
  };

  return (
    <div className="control-panel">
      <label>
        Walking Speed:
        <input 
          type="range" 
          min="1" 
          max="10" 
          value={walkingSpeed} 
          onChange={(e) => { setWalkingSpeed(+e.target.value); handleSettingsChange(); }} 
        />
      </label>
      
      <label>
        Rain Speed:
        <input 
          type="range" 
          min="1" 
          max="10" 
          value={rainSpeed} 
          onChange={(e) => { setRainSpeed(+e.target.value); handleSettingsChange(); }} 
        />
      </label>
      
      <label>
        Rain Angle:
        <input 
          type="range" 
          min="-140" 
          max="140" 
          value={rainAngle} 
          onChange={(e) => { setRainAngle(+e.target.value); handleSettingsChange(); }} 
        />
      </label>
      
      <label>
        Rain Volume:
        <input 
          type="range" 
          min="10" 
          max="100" 
          value={rainVolume} 
          onChange={(e) => { setRainVolume(+e.target.value); handleSettingsChange(); }} 
        />
      </label>
    </div>
  );
};

export default ControlPanel;
