import { useState, useEffect } from 'react';

interface NoMessageScreenProps {
  onNext: () => void;
}

export function NoMessageScreen({ onNext }: NoMessageScreenProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  const fullText = `awwn, that's good for you 💕

Happy you could find love on this special day 💖

And since i still love you so much 💝

here is a gift for you 🎁

You deserve all the happiness in the world 🌹✨

Enjoy this special Valentine's Day 💗`;

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      setShowContinue(true);
    }
  }, [currentIndex, fullText]);

  return (
    <div className="w-full max-w-3xl mx-auto scanline">
      <div className="bg-black rounded-lg p-8 md:p-12 border-4 border-[#333333] relative">
        {/* Terminal-style header */}
        <div className="absolute top-2 left-2 pixel-font text-[8px] text-green-400">
          Large_heart.exe
        </div>

        {/* Message text */}
        <div 
          className="cursive-font text-white text-sm md:text-base leading-relaxed whitespace-pre-line min-h-[300px]"
          style={{ 
            textShadow: '0 0 2px rgba(255,255,255,0.5)'
          }}
        >
          {displayedText}
          {currentIndex < fullText.length && (
            <span className="inline-block w-2 h-4 bg-white ml-1 blink"></span>
          )}
        </div>

        {/* Gift message */}
        {showContinue && (
          <div className="text-center mt-6">
            <p className="cursive-font text-xs text-[#ff6b9d] mb-4 leading-relaxed">
              Here is a special Valentine's gift for you
            </p>
            <button
              onClick={onNext}
              className="cursive-font text-xs px-6 py-3 bg-[#ff6b9d] text-white rounded hover:bg-[#ff4477] transition-colors blink"
              style={{ 
                boxShadow: '0 4px 0 #c74272',
              }}
            >
              Tap to See
            </button>
          </div>
        )}

        {/* Skip option */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => {
              setDisplayedText(fullText);
              setCurrentIndex(fullText.length);
              setShowContinue(true);
            }}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            [SKIP]
          </button>
        </div>
      </div>
    </div>
  );
}