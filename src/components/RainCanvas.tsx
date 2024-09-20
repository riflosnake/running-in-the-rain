import React, { useRef, useEffect, useState } from 'react';
import { Engine, Render, World, Bodies, Body, Events, Runner } from 'matter-js';
import { Settings } from './ControlPanel';

interface RainCanvasProps {
  settings: Settings;
}

const RainCanvas: React.FC<RainCanvasProps> = ({ settings }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [raindropHits, setRaindropHits] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = Engine.create();
    const runner = Runner.create();

    const render = Render.create({
      element: canvas.parentElement!,
      canvas: canvas,
      engine: engine,
      options: {
        width: window.innerWidth * 0.7,
        height: window.innerHeight * 0.7, 
        wireframes: false,
        background: '#87CEEB',
      },
    });

    const ground = Bodies.rectangle(render.options.width! / 2, render.options.height! - 30, render.options.width!, 40, { isStatic: true });

    const person = Bodies.rectangle(50, render.options.height! - 80, 40, 80, {
      isStatic: true,
      render: { fillStyle: 'black' }
    });

    let raindrops: any[] = [];

    const addRaindrop = () => {
      const drop = Bodies.circle(
        Math.random() * render.options.width!, 
        Math.random() * -50, 
        2,
        {
          restitution: 0.6,
          friction: 0.1,
          render: { fillStyle: 'blue' }
        }
      );
      Body.setVelocity(drop, {
        x: Math.cos((settings.rainAngle * Math.PI) / 180) * settings.rainSpeed,
        y: Math.sin((settings.rainAngle * Math.PI) / 180) * settings.rainSpeed,
      });
      raindrops.push(drop);
      World.add(engine.world, drop);
    };

    const rainInterval = setInterval(() => {
      if (isRunning) {
        for (let i = 0; i < settings.rainVolume; i++) {
          addRaindrop();
        }
      }
    }, 100);

    World.add(engine.world, [ground, person]);

    Render.run(render);
    Runner.run(runner, engine);

    const handleCollisions = () => {
        Events.on(engine, 'collisionStart', (event) => {
          event.pairs.forEach(({ bodyA, bodyB }) => {
            const entities = [bodyA, bodyB];
            
            if (entities.includes(person)) {
              setRaindropHits((hits) => hits + 1);
              const raindrop = bodyA === person ? bodyB : bodyA;
              World.remove(engine.world, raindrop);
            }
  
            if (entities.includes(ground)) {
              const raindrop = bodyA === ground ? bodyB : bodyA;
              World.remove(engine.world, raindrop);
            }
          });
        });
      };

    handleCollisions()

    return () => {
      clearInterval(rainInterval);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      World.clear(engine.world, false);
    };
  }, [settings, isRunning]);
  
  const handleRun = () => {
    setRaindropHits(0);
    setIsRunning(true);
  };

  return (
    <div>
      <canvas ref={canvasRef} style={{ width: '70vw', height: '70vh' }}></canvas>
      <div>Raindrops Hit: {raindropHits}</div>
      <button onClick={handleRun}>Run</button>
    </div>
  );
};

export default RainCanvas;
