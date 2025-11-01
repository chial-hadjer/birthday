import React, { useRef, useState } from "react";
import Cake from "./components/Cake";
import "./index.css";

function App() {
  const [step, setStep] = useState<"start" | "mic" | "done">("start");
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // First tap: get mic permission
  const handleMicTap = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStream(stream);
      setStep("mic");
    } catch (err) {
      alert("Microphone permission is required to blow the candles 🎤");
      console.error(err);
    }
  };

  // Second tap: play audio and show cake
  const handleMusicTap = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.4;
        audioRef.current.loop = true;
        await audioRef.current.play();
      }
      setStep("done");
    } catch (err) {
      alert("Could not play music! Try tapping again.");
      console.error(err);
    }
  };

  return (
    <div className={`app-root ${step === "done" ? "lights-on" : "lights-off"}`}>
      {step !== "done" ? (
        <div className="landing">
          {step === "start" ? (
            <button className="turn-on-btn" onClick={handleMicTap}>
              1. Allow microphone
            </button>
          ) : (
            <button className="turn-on-btn" onClick={handleMusicTap}>
              2. Play music & show cake
            </button>
          )}
          <p className="landing-sub">
            Tap once to allow mic, then again for music!
          </p>
          <audio ref={audioRef} src="/birthday.mp3" />
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