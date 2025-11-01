// src/App.tsx
import React, { useRef, useState } from "react";
import Cake from "./components/Cake";
import "./index.css";

function App() {
  const [lightsOn, setLightsOn] = useState(false);
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🎙️ Enable microphone and then play music
  const handleTurnOnLights = async () => {
    try {
      // Request microphone first
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStream(stream);

      // Only play music after mic is allowed
      if (!audioRef.current) {
        const audio = new Audio("/birthday.mp3"); // Put mp3 in public/
        audio.loop = true;
        audio.volume = 0.4;
        await audio.play();
        audioRef.current = audio;
      } else {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      }

      setLightsOn(true);
    } catch (err) {
      alert("Microphone permission is required to blow the candles 🎤");
      console.error(err);
    }
  };

  return (
    <div className={`app-root ${lightsOn ? "lights-on" : "lights-off"}`}>
      {!lightsOn ? (
        <div className="landing">
          <button className="turn-on-btn" onClick={handleTurnOnLights}>
            Turn on the lights
          </button>
          <p className="landing-sub">(Allow microphone when asked)</p>
        </div>
      ) : (
        <div className="stage fade-in">
          <Cake
            micStream={micStream}
            audioRef={audioRef}
          />
        </div>
      )}
    </div>
  );
}

export default App;
