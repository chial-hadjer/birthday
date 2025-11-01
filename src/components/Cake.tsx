import React, { useEffect, useRef, useState } from "react";
import "./cake.css";
import Confetti from "./Confetti";
import BirthdayCard from "./BirthdayCard";

type Props = {
  micStream: MediaStream | null;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  onReplayAudio?: () => void;
};

export default function Cake({ micStream, audioRef, onReplayAudio }: Props) {
  const [isBlown, setIsBlown] = useState(false);
  const [sensitivity, setSensitivity] = useState(100);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null); // 👉 for auto-scroll

  // 🔊 Detect blowing
  useEffect(() => {
    if (!micStream) return;
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(micStream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    analyserRef.current = analyser;

    const data = new Uint8Array(analyser.frequencyBinCount);

    const check = () => {
      analyser.getByteFrequencyData(data);
      const avg = data.reduce((a, b) => a + b, 0) / data.length;
      if (!isBlown && avg > sensitivity) {
        setIsBlown(true);
        micStream.getTracks().forEach((t) => t.stop());
        return;
      }
      rafRef.current = requestAnimationFrame(check);
    };

    rafRef.current = requestAnimationFrame(check);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (analyserRef.current) analyserRef.current.disconnect();
      try {
        audioContext.close();
      } catch {}
    };
  }, [micStream, isBlown, sensitivity]);

  // 🧹 Cleanup
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // 🎉 Scroll to card when blown
  useEffect(() => {
  if (isBlown && cardRef.current) {
    setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => window.scrollBy({ top: -100, behavior: "smooth" }), 600);
    }, 800);
  }
}, [isBlown]);

  return (
      <div className="cake-wrapper">

    <div className="cake-page">
      {/* 🎂 Wish text moved higher */}
      <h2 className="wish-text top-text">
        {isBlown ? "✨ Wish granted! Happy Birthday! ✨" : "Make a wish and blow your candles"}
      </h2>

      <div className={`cake ${isBlown ? "blown" : ""}`} role="img" aria-label="Birthday cake">
        <div className="layer layer1" />
        <div className="layer layer2" />
        <div className="layer layer3" />
        <div className="layer layer4" />

        {/* ✅ Three candles side-by-side */}
        <div className="candles">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`candle ${isBlown ? "candle-blown" : ""}`}>
              {!isBlown && <div className="flame" />}
              {isBlown && <div className="smoke">💨</div>}
            </div>
          ))}
        </div>
      </div>

      {/* 🎉 Confetti appears when blown */}
      {isBlown && <Confetti />}

      <div className="controls">
        {!isBlown && <p className="hint">Blow into the microphone to extinguish the candles</p>}
      </div>

      {/* 🎈 Birthday card scrolls into view */}
      <div ref={cardRef} style={{ marginTop: "120px" }}>
        {isBlown && <BirthdayCard />}
      </div>
    </div>
    </div>
  );
}
