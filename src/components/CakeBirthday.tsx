import { useState, useEffect } from "react";

const CakeBirthday = () => {
  const [micPermission, setMicPermission] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [blowStrength, setBlowStrength] = useState(0);
  const [showCake, setShowCake] = useState(false);

  useEffect(() => {
    if (!micPermission) return;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const detectBlow = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg =
          dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

        setBlowStrength(avg);
        if (avg > 60 && !candlesBlown) {
          setCandlesBlown(true);
        }
        requestAnimationFrame(detectBlow);
      };
      detectBlow();
    });
  }, [micPermission]);

  const handleTurnOnLights = () => {
    setShowCake(true);
    setMicPermission(true);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white flex items-center justify-center">
      {!showCake ? (
        <button
          onClick={handleTurnOnLights}
          className="text-2xl px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold shadow-[0_0_20px_rgba(255,255,0,0.6)] animate-glow"
        >
          Turn on the lights
        </button>
      ) : (
        <div className="flex flex-col items-center justify-center fade-in">
          <h1 className="text-2xl mb-6 animate-fade-in text-center">
            Make a wish and blow your candles 🎂
          </h1>

          {/* Cake */}
          <div className="relative flex flex-col items-center cake-container">
            {/* Candles */}
            <div className="flex gap-8 mb-6 justify-center">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="relative">
                  {!candlesBlown && (
                    <div className="flame"></div>
                  )}
                  {candlesBlown && (
                    <div className="smoke">💨</div>
                  )}
                  <div className="candle"></div>
                </div>
              ))}
            </div>

            {/* Cake layers */}
            <div className="cake">
              <div className="layer layer1"></div>
              <div className="layer layer2"></div>
              <div className="layer layer3"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CakeBirthday;
