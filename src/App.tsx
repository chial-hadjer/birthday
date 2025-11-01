import React, { useRef, useState } from "react";
import Cake from "./components/Cake";
import "./index.css";

function App() {
  const [lightsOn, setLightsOn] = useState(false);
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🎵 Play birthday music (must be triggered by user tap)
  const playMusic = async () => {
    if (!audioRef.current) {
      const audio = new Audio("/birthday.mp3"); // File should be in /public
      audio.loop = true;
      audio.volume = 0.4;
      audioRef.current = audio;
    }
    try {
      await audioRef.current!.play();
      console.log("Music playing 🎶");
    } catch (err) {
      console.warn("Autoplay blocked, waiting for user gesture");
    }
  };

  // 🎙️ Enable microphone (also triggered by user tap)
  const enableMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStream(stream);
      console.log("Microphone enabled 🎤");
    } catch (e) {
      alert("Microphone permission is required to blow the candles 🎤");
      console.error(e);
    }
  };

  // 👇 Called when user taps the button
  const handleTurnOnLights = async () => {
    setLightsOn(true);
    await playMusic();
    await enableMic();
  };

  return (
    <div className={`app-root ${lightsOn ? "lights-on" : "lights-off"}`}>
      {!lightsOn ? (
        <div className="landing">
          <button className="turn-on-btn" onClick={handleTurnOnLights}>
            🎉 Tap to Start the Celebration 🎉
          </button>
          <p className="landing-sub">(Please allow microphone access)</p>
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
