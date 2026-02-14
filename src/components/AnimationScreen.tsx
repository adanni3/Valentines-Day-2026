import { useEffect, useState } from 'react';
import { IMAGES } from '../constants/assets';

interface AnimationScreenProps {
  onNext: () => void;
}

export function AnimationScreen({ onNext }: AnimationScreenProps) {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number; image: string }>>([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Generate floating hearts with mixed images
    const heartArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: (Math.random() * 200)-40,
      delay: Math.random() * 2,
      image: i % 2 === 0 ? IMAGES.CA98284D : IMAGES.D0C21E4E,
    }));
    setHearts(heartArray);

    // Show message after animation starts
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1500);

    // Auto advance after animation completes
    const autoAdvance = setTimeout(() => {
      onNext();
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoAdvance);
    };
  }, [onNext]);

  return (
    <div className="w-full h-screen max-w-3xl mx-auto flex items-center justify-center relative overflow-hidden">
      {/* Floating hearts background */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            animation: `float-up 3s ease-in infinite`,
            animationDelay: `${heart.delay}s`,
            bottom: '-50px',
          }}
        >
          <img 
            src={heart.image}
            alt="heart"
            className="w-6 h-6 md:w-8 md:h-8 opacity-80"
            style={{ 
              imageRendering: 'pixelated',
              filter: 'drop-shadow(0 0 8px rgba(255, 107, 157, 0.8))'
            }}
          />
        </div>
      ))}

      {/* Flying cupids */}
      <div
        className="absolute"
        style={{
          left: '10%',
          animation: 'fly-across 8s linear infinite',
          top: '20%',
        }}
      >
        <img 
          src={IMAGES.IMAGE_1A5F1705}
          alt="cupid"
          className="w-12 h-12 md:w-20 md:h-20"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
      <div
        className="absolute"
        style={{
          right: '10%',
          animation: 'fly-across-reverse 10s linear infinite',
          top: '25%',
        }}
      >
        <img 
          src={IMAGES.IMAGE_6F339C0C}
          alt="cupid"
          className="w-12 h-12 md:w-20 md:h-20"
          style={{ imageRendering: 'pixelated', transform: 'scaleX(-1)' }}
        />
      </div>
      <div
        className="absolute"
        style={{
          left: '10%',
          animation: 'fly-across 8s linear infinite',
          top: '60%',
        }}
      >
        <img 
          src={IMAGES.BC3EEC7F}
          alt="cupid"
          className="w-12 h-12 md:w-20 md:h-20"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
      <div
        className="absolute"
        style={{
          right: '10%',
          animation: 'fly-across-reverse 10s linear infinite',
          top: '60%',
        }}
      >
        <img 
          src={IMAGES.BC3EEC7F}
          alt="cupid"
          className="w-12 h-12 md:w-20 md:h-20"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* Center message */}
      <div 
        className={`text-center z-10 transition-all duration-1000 ${
          showMessage ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      >
        <div className="bg-[#4a3b5c] rounded-2xl p-8 md:p-12 pixel-border">
          <img 
            src={IMAGES.E801AC36}
            alt="heart"
            className="w-20 h-20 mx-auto mb-4 float"
            style={{
              imageRendering: 'pixelated',
              filter: 'drop-shadow(0 0 20px rgba(255, 68, 68, 0.8))',
              //backgroundColor: '#4a3b5c',
            }}
          />
          <h2 
            className="pixel-font text-xl md:text-3xl text-[#ffcc00] mb-3"
            style={{ 
              textShadow: '3px 3px 0 rgba(0,0,0,0.3)',
              letterSpacing: '0.1em'
            }}
          >
            LOVE ACTIVATED
          </h2>
          <p className="pixel-font text-xs text-white opacity-80">
            Loading your destiny...
          </p>
          <div className="mt-4 flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-[#ff6b9d] rounded-full"
                style={{
                  animation: 'blink 1s infinite',
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes fly-across {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(calc(100vw + 100px));
          }
        }
        
        @keyframes fly-across-reverse {
          0% {
            transform: translateX(100px) scaleX(-1);
          }
          100% {
            transform: translateX(calc(-100vw - 100px)) scaleX(-1);
          }
        }
      `}</style>
    </div>
  );
}