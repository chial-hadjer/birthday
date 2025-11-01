import React, { useRef, useState } from "react";
import Cake from "./components/Cake";
import "./index.css";

function App() {
  const [lightsOn, setLightsOn] = useState(false);
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🎵 Play birthday music
  const playMusic = () => {
    if (!audioRef.current) {
      const audio = new Audio("/birthday.mp3"); // place in public/
      audio.loop = true;
      audio.volume = 0.4;
      audio.play();
      audioRef.current = audio;
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  // 🎙️ Enable microphone
  const enableMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStream(stream);
    } catch (e) {
      alert("Microphone permission is required to blow the candles 🎤");
      console.error(e);
    }
  };

  const handleTurnOnLights = async () => {
    setLightsOn(true);
    playMusic();
    await enableMic();
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
            onReplayAudio={playMusic}
          />
        </div>
      )}
    </div>
  );
}

export default App;
