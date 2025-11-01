import React, { useRef, useState } from "react";
import Cake from "./components/Cake";
import "./index.css";

function App() {
  const [lightsOn, setLightsOn] = useState(false);
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🎵 Play birthday music after user interaction
  const playMusic = async () => {
    try {
      if (!audioRef.current) {
        const audio = new Audio("/birthday.mp3"); // must be in /public
        audio.loop = true;
        audio.volume = 0.4;

        // Wait for explicit user gesture to allow playback
        await audio.play().catch((err) => {
          console.warn("Autoplay blocked until user interacts:", err);
        });

        audioRef.current = audio;
      } else {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      }
    } catch (err) {
      console.error("Music playback error:", err);
    }
  };

  // 🎙️ Enable microphone (triggered only after user tap)
  const enableMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStream(stream);
      console.log("✅ Microphone enabled!");
    } catch (e) {
      alert("Please allow microphone access to blow the candles 🎤");
      console.error("Mic error:", e);
    }
  };

  // 🌟 Triggered by the “Turn on the lights” button
  const handleTurnOnLights = async () => {
    // Start both music and mic after explicit tap
    await playMusic();
    await enableMic();
    setLightsOn(true);
  };

  return (
    <div className={`app-root ${lightsOn ? "lights-on" : "lights-off"}`}>
      {!lightsOn ? (
        <div className="landing">
          <button className="turn-on-btn" onClick={handleTurnOnLights}>
            Tap to Start 🎉
          </button>
          <p className="landing-sub">(Tap to enable music & mic access)</p>
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
