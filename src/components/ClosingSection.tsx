import { Sparkles } from 'lucide-react';

const ClosingSection = () => {
  const friendName = "Ahmed"; // CUSTOMIZE: Change this to your friend's name

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full text-center">

        <div className="relative">
          <div className="absolute inset-0 overflow-hidden opacity-30">
            {[...Array(20)].map((_, i) => (
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
                  className="text-yellow-400"
                  size={Math.random() * 15 + 10}
                />
              </div>
            ))}
          </div>

          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6">
              Happy Birthday once again, {friendName}.
            </h2>

            <p className="text-2xl md:text-3xl text-blue-200 leading-relaxed">
              I'm proud to call you my friend — no matter the distance 💙
            </p>

            <div className="pt-12">
              <div className="inline-block animate-pulse-slow">
                <div className="text-6xl">✨</div>
              </div>
            </div>

            <p className="text-blue-300 text-lg pt-8">
              Cheers to you and all the amazing things coming your way! 🥂
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
