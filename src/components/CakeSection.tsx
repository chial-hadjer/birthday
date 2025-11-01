import { useState, useEffect, useRef } from 'react';
import { Music, Mic } from 'lucide-react';
import Cake from './Cake';

interface CakeSectionProps {
  candlesBlown: boolean;
  onCandlesBlown: () => void;
}

const CakeSection = ({ candlesBlown, onCandlesBlown }: CakeSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [blowStrength, setBlowStrength] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const playBirthdayMusic = () => {
    setIsPlaying(true);
    // Note: In production, add an actual audio file here
    // const audio = new Audio('/birthday-song.mp3');
    // audio.play();
  };

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);

      microphoneRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      setIsListening(true);
      detectBlow();
    } catch (err) {
      console.error('Microphone access denied:', err);
      alert('Please allow microphone access to blow out the candles! Or click the candles directly.');
    }
  };

  const detectBlow = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const checkAudio = () => {
      if (!analyserRef.current || candlesBlown) return;

      analyserRef.current.getByteFrequencyData(dataArray);

      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      setBlowStrength(average);

      // Detect blow: strong signal in lower frequencies (like blowing sound)
      if (average > 50) {
        setTimeout(() => {
          onCandlesBlown();
          stopListening();
        }, 500);
        return;
      }

      animationFrameRef.current = requestAnimationFrame(checkAudio);
    };

    checkAudio();
  };

  const stopListening = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsListening(false);
  };

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">

        {!isPlaying && (
          <button
            onClick={playBirthdayMusic}
            className="mb-8 mx-auto flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-yellow-500/50"
          >
            <Music size={24} />
            Play Birthday Song
          </button>
        )}

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400 animate-glow">
            Make a wish and blow the candles 🎂
          </h2>
          {!isListening && !candlesBlown && (
            <button
              onClick={startListening}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Mic size={20} />
              Enable Microphone to Blow
            </button>
          )}
          {isListening && !candlesBlown && (
            <p className="text-blue-300 animate-pulse">
              Listening... Blow into your microphone! 🌬️
            </p>
          )}
        </div>

        <Cake
          candlesBlown={candlesBlown}
          onCandlesBlown={onCandlesBlown}
          blowStrength={blowStrength}
        />

        {!candlesBlown && (
          <p className="text-center mt-8 text-blue-200 text-sm">
            Tip: Click on the candles if microphone doesn't work
          </p>
        )}
      </div>
    </section>
  );
};

export default CakeSection;
