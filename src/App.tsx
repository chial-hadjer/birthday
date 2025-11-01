import React, { useRef, useState } from "react";
import Cake from "./components/Cake";
import "./index.css";

function App() {
  const [lightsOn, setLightsOn] = useState(false);
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleTurnOnLights = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStream(stream);

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.4;
        audioRef.current.loop = true;
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
          {/* Add controls for debugging on mobile */}
          <audio ref={audioRef} src="/birthday.mp3" controls />
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