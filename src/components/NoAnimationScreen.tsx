import { useEffect, useState } from 'react';
import pixelHeartPink from '../assets/ca98284d8e2ff4cd08fc1f5ec9a0db5f.png';
import pixelHeartStanding from '../assets/e801ac362de9eb6d95183d4fc3bf1ba8.png';

interface NoAnimationScreenProps {
  onNext: () => void;
}

export function NoAnimationScreen({ onNext }: NoAnimationScreenProps) {
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number; scale: number }>>([]);

  useEffect(() => {
    // Generate floating sad hearts
    const heartArray = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      scale: 0.5 + Math.random() * 0.5,
    }));
    setHearts(heartArray);

    // Show message after animation starts
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);

    // Auto advance after animation completes
    const autoAdvance = setTimeout(() => {
      onNext();
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoAdvance);
    };
  }, [onNext]);

  return (
    <div className="w-full h-screen max-w-3xl mx-auto flex items-center justify-center relative overflow-hidden scanline">
      {/* Floating sad hearts background */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            animation: `float-sad 4s ease-in infinite`,
            animationDelay: `${heart.delay}s`,
            bottom: '-50px',
            transform: `scale(${heart.scale})`,
          }}
        >
          <img 
            src={pixelHeartPink}
            alt="heart"
            className="w-8 h-8 opacity-70"
            style={{ 
              imageRendering: 'pixelated',
              //filter: 'drop-shadow(0 0 8px rgba(255, 107, 157, 0.6))',
              opacity: 0.7,
              //backgroundColor: '#4a3b5c',
            }}
          />
        </div>
      ))}

      {/* Center message */}
      <div 
        className={`text-center z-10 transition-all duration-1000 ${
          showMessage ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      >
        <div className="bg-[#4a3b5c] rounded-2xl p-8 md:p-10 pixel-border">
          <img 
            src={pixelHeartStanding}
            alt="heart"
            className="w-16 h-16 mx-auto mb-4 float-slow"
            style={{
              imageRendering: 'pixelated',
              //filter: 'drop-shadow(0 0 15px rgba(255, 107, 157, 0.8))',
              backgroundColor: '#4a3b5c',
            }}
          />
          <h2 
            className="pixel-font text-lg md:text-2xl text-[#ff6b9d] mb-3"
            style={{ 
              textShadow: '3px 3px 0 rgba(0,0,0,0.3)',
              letterSpacing: '0.1em'
            }}
          >
            THAT'S OKAY
          </h2>
          <p className="pixel-font text-xs text-white opacity-80 mb-4">
            WE'LL STILL MAKE THIS DAY SPECIAL
          </p>
          <div className="mt-4 flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-[#ff6b9d] rounded-sm"
                style={{
                  animation: 'blink-slow 1.5s infinite',
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-sad {
          0% {
            transform: translateY(0) scale(var(--scale, 1)) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          80% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100vh) rotate(-20deg) scale(var(--scale, 1));
            opacity: 0;
          }
        }
        
        .float-slow {
          animation: float-vertical 3s ease-in-out infinite;
        }
        
        @keyframes float-vertical {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes blink-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
