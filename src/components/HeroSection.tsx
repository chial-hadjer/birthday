import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const HeroSection = () => {
  const [visible, setVisible] = useState(false);
  const friendName = "Ahmed"; // CUSTOMIZE: Change this to your friend's name

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            <Sparkles
              className="text-yellow-400 opacity-60"
              size={Math.random() * 20 + 10}
            />
          </div>
        ))}
      </div>

      <div
        className={`relative z-10 text-center px-6 transition-all duration-2000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-pulse-slow">
          <span className="text-yellow-400">🎉</span> Happy Birthday, {friendName}! <span className="text-yellow-400">🎉</span>
        </h1>
        <p className="text-xl md:text-2xl text-blue-200 font-light tracking-wide">
          Even from miles away, I wanted to celebrate you in a special way.
        </p>

        <div className="mt-12 animate-bounce-slow">
          <div className="text-4xl">↓</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
