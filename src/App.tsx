import { useState } from 'react';
import RainCanvas from './components/RainCanvas';
import ControlPanel, { Settings } from './components/ControlPanel';

function App() {
  const [settings, setSettings] = useState<Settings>({
    walkingSpeed: 5,
    rainSpeed: 5,
    rainAngle: 90,
    rainVolume: 50,
  });

  return (
    <div className="App">
      <h1>Running in the rain</h1>
      <ControlPanel onSettingsChange={setSettings} />
      <RainCanvas settings={settings} />
    </div>
  );
}

export default App;
