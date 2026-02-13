import { useEffect, useState, useRef } from 'react';
import { pixelateImage } from '../utils/pixelate';
import type { UserData } from '../App';

// Import images from local assets folder
import pixelHeartRedUrl from '../assets/pixelHeartRed.png';
import pixelHeartPinkUrl from '../assets/315e92792f8c505061decd0823fc2307.png';

// Import single cupid image for all corners
import cupidUrl from '../assets/—Pngtree—cupid love angel cartoon vector_5743786.png';
import cupidTwo from '../assets/e4d8e8c45e557c0b0b2e691567d9de19.png';

interface LoadingScreenProps {
  onNext: (pixelatedData: UserData) => void;
  userData: UserData;
}

export function LoadingScreen({ onNext, userData }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'processing' | 'complete'>('processing');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Load image for preview once
  useEffect(() => {
    if (!userData.image || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvasRef.current!.width = 150;
      canvasRef.current!.height = 150;
      ctx.drawImage(img, 0, 0, 150, 150);
      setImageLoaded(true);
    };
    img.onerror = () => {
      // Fallback: draw placeholder
      ctx.fillStyle = '#2D1B33';
      ctx.fillRect(0, 0, 150, 150);
      ctx.fillStyle = '#FF6B9D';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Loading...', 75, 75);
      setImageLoaded(true);
    };
    img.src = userData.image;
  }, [userData.image]);

  // Animate progress using CSS animation state
  useEffect(() => {
    if (!userData.image) {
      onNext({ image: null, pixelatedImage: null });
      return;
    }

    // Start progress animation after image loads
    const animationStartTimer = setTimeout(() => {
      // Animate progress from 0 to 100 over 5 seconds
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 2; // 100 / 50 = 2 seconds per 10%, so 5 seconds total
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setStatus('complete');
          // Process image in background while progress shows
          processImage();
        }
        setProgress(currentProgress);
      }, 100); // 50 intervals × 100ms = 5000ms = 5 seconds
    }, 500);

    return () => clearTimeout(animationStartTimer);
  }, [userData.image, onNext, imageLoaded]);

  const processImage = async () => {
    try {
      const pixelatedResult = await pixelateImage(userData.image!, {
        pixelSize: 2,
        contrast: 0.4,
        brightness: -0.1,
        saturation: 0.5,
        dithering: true,
        scanlines: true,
        outputSize: 0
      });

      // Wait a bit after completion before moving to next screen
      setTimeout(() => {
        onNext({
          image: userData.image,
          pixelatedImage: pixelatedResult
        });
      }, 1000);
    } catch (error) {
      console.error('Error pixelating image:', error);
      onNext({
        image: userData.image,
        pixelatedImage: userData.image
      });
    }
  };

  return (
    <div 
      className="w-full h-screen flex items-center justify-center relative"
      style={{ backgroundColor: '#292035' }}
    >      {/* Corner Cupids - using single cupid.png with float animation */}
      {/* Top Left */}
      <div 
        className="absolute"
        style={{ 
          top: '22%',
          left: '20%',
          zIndex: 0,
          animation: 'float 2s ease-in-out infinite',
        }}
      >
        <img 
          src={cupidUrl} 
          alt="Cupid" 
          className="w-20 h-20"
          style={{ imageRendering: 'pixelated', transform: 'scaleX(-1)' }}
        />
      </div>

      {/* Top Right */}
      <div 
        className="absolute"
        style={{ 
          top: '22%',
          right: '20%',
          zIndex: 0,
          animation: 'float 2s ease-in-out infinite',
          animationDelay: '0.5s'
        }}
      >
        <img 
          src={cupidUrl} 
          alt="Cupid" 
          className="w-20 h-20"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* Bottom Left */}
      <div 
        className="absolute"
        style={{ 
          bottom: '22%',
          left: '20%',
          zIndex: 0,
          animation: 'float 2s ease-in-out infinite',
          animationDelay: '1s'
        }}
      >
        <img 
          src={cupidTwo} 
          alt="Cupid" 
          className="w-20 h-20"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* Bottom Right */}
      <div 
        className="absolute"
        style={{ 
          bottom: '22%',
          right: '20%',
          zIndex: 0,
          animation: 'float 2s ease-in-out infinite',
          animationDelay: '1.5s'
        }}
      >
        <img 
          src={cupidTwo} 
          alt="Cupid" 
          className="w-20 h-20"
          style={{ imageRendering: 'pixelated', transform: 'scaleX(-1)' }}
        />
      </div>
      {/* Outer dashed border - z-0 to be behind central panel */}
      <div 
        className="absolute inset-[50px]"
        style={{ 
          border: '4px dashed #EF7D57',
          borderRadius: '16px',
          boxShadow: 'inset 0 0 30px rgba(239, 125, 87, 0.3)',
          zIndex: 3
        }}
      >

  

      {/* Central Panel - z-10 to be in front */}
      <div 
        className="relative rounded-2xl p-8"
        style={{ 
          backgroundColor: '#543b72', // Match container background
          boxShadow: '0 0 40px rgba(255, 107, 157, 0.4), 0 0 80px rgba(255, 107, 157, 0.2), inset 0 0 20px rgba(255, 107, 157, 0.1)',
          minWidth: '300px',
          maxWidth: '360px',
          zIndex: 10
        }}
      >
        {/* Pink Ribbon Header */}
        <div className="relative -mt-8 mb-6 flex justify-center">
          <div 
            className="relative px-5 py-2 rounded"
            style={{ 
              background: 'linear-gradient(180deg, #FF6B9D 0%, #FF4D8D 50%, #FF2D6D 100%)',
              boxShadow: '0 4px 15px rgba(255, 107, 157, 0.5)'
            }}
          >
            <div 
              className="absolute -left-4 top-1/2 w-4 h-6"
              style={{ 
                background: 'linear-gradient(90deg, #FF4D8D, #FF2D6D)',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                transform: 'translateY(-50%) rotate(-15deg)'
              }}
            />
            <div 
              className="absolute -right-4 top-1/2 w-4 h-6"
              style={{ 
                background: 'linear-gradient(90deg, #FF2D6D, #FF4D8D)',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                transform: 'translateY(-50%) rotate(15deg)'
              }}
            />
            <h2 
              className="pixel-font text-white text-sm p-3 "
              style={{ 
                textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
                letterSpacing: '0.15em'
              }}
            >
              VALENTINE'S DAY
            </h2>
          </div>
        </div>

        {/* Speech Bubble with Heart */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: '#dbbadb',
                boxShadow: '0 0 20px rgba(255, 107, 157, 0.3), inset 0 0 10px rgba(0,0,0,0.3)'
              }}
            >
              <img 
                src={pixelHeartPinkUrl} 
                alt="Heart" 
                className="w-10 h-10 animate-pulse"
                style={{ 
                  imageRendering: 'pixelated',
                  //backgroundColor: '#2D1B33',
                }}
              />
            </div>
            <div 
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-3"
              style={{ 
                backgroundColor: '#dbbadb',
                clipPath: 'polygon(50% 100%, 0 0, 100% 0)'
              }}
            />
          </div>
        </div>

        {/* Processing Label */}
        <div className="text-center mb-3">
          <p 
            className="pixel-font text-white text-sm"
            style={{ 
              textShadow: '2px 2px 0 rgba(70, 69, 69, 0.73)',
              letterSpacing: '0.1em'
            }}
          >
            {status === 'complete' ? 'ALMOST DONE...' : 'PROCESSING...'}
          </p>
        </div>

        {/* Top Progress Bar - Striped Pink */}
        <div className="mb-3">
          <div 
            className="h-4 rounded-lg overflow-hidden relative"
            style={{ 
              backgroundColor: '#1A0F1E',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
            }}
          >
            {/* Progress fill */}
            <div 
              className="h-full rounded-lg absolute top-0 left-0"
              style={{ 
                width: `${progress}%`,
                backgroundImage: progress > 0 
                  ? 'repeating-linear-gradient(90deg, #FF6B9D 0px, #FF4D8D 20px, #FF6B9D 40px)' 
                  : 'none',
                backgroundSize: '40px 100%',
                backgroundRepeat: 'repeat',
                transition: 'width 0.1s linear',
                boxShadow: progress > 0 ? '0 0 15px rgba(255, 107, 157, 0.8)' : 'none'
              }}
            />
          </div>
        </div>

        {/* Bottom Progress Bar - Solid Pink Glow */}
        <div className="mb-4">
          <div 
            className="h-3 rounded-lg overflow-hidden relative"
            style={{ 
              backgroundColor: '#1A0F1E',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
            }}
          >
            {/* Progress fill */}
            <div 
              className="h-full rounded-lg absolute top-0 left-0"
              style={{ 
                width: `${progress}%`,
                background: progress > 0 ? '#FF6B9D' : 'transparent',
                transition: 'width 0.1s linear',
                boxShadow: progress > 0 ? '0 0 20px rgba(255, 107, 157, 1), 0 0 40px rgba(255, 107, 157, 0.5)' : 'none'
              }}
            />
          </div>
        </div>

        {/* Bottom Icons Row - with emoji icons as requested */}
        <div className="flex justify-center items-center gap-3 mb-3">
          {/* Gift Emoji */}
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ 
              backgroundColor: '#724681',
              boxShadow: '0 0 10px rgba(255, 107, 157, 0.3)'
            }}
          >
            <span className="text-lg">🎁</span>
          </div>
          
          {/* ✓ READY! Label */}
          <div className="flex items-center gap-2">
            <span 
              className="pixel-font text-lg"
              style={{ 
                color: '#4CAF50',
                textShadow: '0 0 10px rgba(76, 175, 80, 0.8)',
                opacity: status === 'complete' ? 1 : 0.3,
                transition: 'opacity 0.5s ease'
              }}
            >
              ✓
            </span>
            <span 
              className="pixel-font text-sm"
              style={{ 
                color: status === 'complete' ? '#4CAF50' : '#666',
                textShadow: status === 'complete' ? '0 0 10px rgba(76, 175, 80, 0.8)' : 'none',
                transition: 'all 0.5s ease'
              }}
            >
              READY!
            </span>
          </div>

          {/* Envelope Emoji */}
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ 
              backgroundColor: '#724681',
              boxShadow: status === 'complete' 
                ? '0 0 20px rgba(255, 107, 157, 0.8), 0 0 40px rgba(255, 107, 157, 0.4)' 
                : '0 0 10px rgba(255, 107, 157, 0.3)',
              opacity: status === 'complete' ? 1 : 0.5,
              transition: 'all 0.5s ease'
            }}
          >
            <span className="text-lg">📩</span>
          </div>
        </div>

        {/* Preview Canvas */}
        <div className="flex justify-center mb-3">
          <div 
            className="rounded-lg overflow-hidden"
            style={{ 
              border: '2px solid #FF6B9D',
              boxShadow: '0 0 20px rgba(255, 107, 157, 0.5)',
              backgroundColor: '#1A0F1E'
            }}
          >
            <canvas
              ref={canvasRef}
              className="w-16 h-16"
              style={{ 
                //imageRendering: 'pixelated',
                display: 'block'
              }}
            />
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center">
          <p 
            className="pixel-font text-lg mb-1"
            style={{ 
              color: '#FF6B9D',
              textShadow: '0 0 15px rgba(255, 107, 157, 0.8)',
              letterSpacing: '0.1em'
            }}
          >
            {Math.round(progress)}% COMPLETE
          </p>
          <p 
            className="pixel-font text-xs"
            style={{ 
              color: '#FF6B9D',
              textShadow: '0 0 10px rgba(255, 107, 157, 0.5)',
              opacity: progress < 100 ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
          >
            {status === 'complete' ? '100% COMPLETE' : 'ALMOST DONE...'}
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
