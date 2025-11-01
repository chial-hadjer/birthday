import { useState } from 'react';
import { Gift, Heart } from 'lucide-react';

const MessageSection = () => {
  const [giftOpened, setGiftOpened] = useState(false);
  const friendName = "Ahmed"; // CUSTOMIZE: Change this to your friend's name

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full">

        <div className="bg-gradient-to-br from-slate-800 to-blue-900 rounded-3xl p-10 md:p-16 shadow-2xl border border-yellow-400/30 animate-fade-in-up">
          <div className="flex justify-center mb-8">
            <Heart className="text-yellow-400 animate-pulse-slow" size={48} />
          </div>

          <div className="text-center space-y-6 text-lg md:text-xl leading-relaxed">
            <p className="text-blue-100">
              Wishing you joy, strength, and endless adventures ahead.
            </p>
            <p className="text-blue-100">
              Distance means nothing when the friendship is real.
            </p>
            <p className="text-yellow-400 font-bold text-2xl mt-8">
              — From Hajar 💫
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          {!giftOpened ? (
            <button
              onClick={() => setGiftOpened(true)}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-lg shadow-yellow-500/50 animate-bounce-slow"
            >
              <Gift size={28} />
              Click to open your gift 🎁
            </button>
          ) : (
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-yellow-400/30 animate-fade-in">
              <h3 className="text-3xl font-bold text-yellow-400 mb-6">
                Your Special Gift 🎁
              </h3>
              <div className="text-lg text-blue-100 space-y-4">
                <p>
                  {friendName}, you've been an incredible friend through every season.
                </p>
                <p>
                  Your kindness, humor, and loyalty mean the world to me.
                </p>
                <p className="text-yellow-400 font-semibold text-xl mt-6">
                  Here's to another year of amazing memories together! 🌟
                </p>
                {/* CUSTOMIZE: Add a video embed or image here */}
                {/* <div className="mt-6 aspect-video bg-slate-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Video or image placeholder</p>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
