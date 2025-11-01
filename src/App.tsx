// src/App.tsx
import React, { useRef, useState } from "react";
import Cake from "./components/Cake";
import "./index.css";

function App() {
  const [lightsOn, setLightsOn] = useState(false);
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🎵 Ensure audio element exists in DOM for mobile autoplay
  const ensureAudioElement = () => {
    if (!audioRef.current) {
      const audio = new Audio("/birthday.mp3"); // must be in public/
      audio.loop = true;
      audio.volume = 0.4;
      audioRef.current = audio;
    }
  };

  // 🎙️ Handle button click: request mic, then play music, then show cake
  const handleTurnOnLights = async () => {
    try {
      // ✅ Ensure audio element exists
      ensureAudioElement();

      // Request microphone first (must be after user tap)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStream(stream);

      // Now we can play music (mobile requires user gesture)
      if (audioRef.current) {
        await audioRef.current.play();
      }

      // Finally, show the cake
      setLightsOn(true);
    } catch (err) {
      alert(
        "Please allow microphone access! It’s required to blow the candles 🎤"
      );
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
          {/* Hidden audio element in DOM so mobile allows playback */}
          <audio ref={audioRef} src="/birthday.mp3" loop />
        </div>
      ) : (
        <div className="stage fade-in">
          <Cake micStream={micStream} audioRef={audioRef} />
        </div>
      )}
    </div>
  );
}

export default App;
