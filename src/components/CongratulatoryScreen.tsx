import { useEffect, useState, useRef } from 'react';
import { Star, Sparkles, Download, X, Maximize2 } from 'lucide-react';
import { IMAGES } from '../constants/assets';
import type { UserData } from '../App';

interface CongratulatoryScreenProps {
  userData: UserData;
  onRestart: () => void;
}

export function CongratulatoryScreen({ userData, onRestart }: CongratulatoryScreenProps) {
  const [showContent, setShowContent] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Show content with delay
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    // Generate sparkles
    const sparkleArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: (Math.random() * 200)-40,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setSparkles(sparkleArray);

    return () => clearTimeout(timer);
  }, []);

  // Display pixelated image in thumbnail
  useEffect(() => {
    if (userData.pixelatedImage && canvasRef.current) {
      displayImage(userData.pixelatedImage, canvasRef.current);
    } else if (userData.image && canvasRef.current) {
      displayImage(userData.image, canvasRef.current);
    }
  }, [userData.pixelatedImage, userData.image, isFullscreen]);

  const displayImage = (imageSrc: string, canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = 200;
      canvas.height = 200;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, 200, 200);
    };
    img.src = imageSrc;
  };

  const handleDownload = () => {
    const pixelatedSrc = userData.pixelatedImage || userData.image;
    if (!pixelatedSrc) return;

    const link = document.createElement('a');
    link.download = 'valentines-retro-' + Date.now() + '.png';
    link.href = pixelatedSrc;
    link.click();
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsFullscreen(false);
  };

  return (
    <>
      {/* Fullscreen overlay - shown when isFullscreen is true */}
      {isFullscreen && userData.pixelatedImage && (
        <div 
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.98)' }}
        >
          {/* Close button - top right */}
          <button
            onClick={closeFullscreen}
            className="fixed top-4 right-4 z-[100000] bg-[#ff6b9d] rounded-full p-3 hover:bg-[#ff4477] transition-colors"
            style={{ boxShadow: '0 4px 0 #c74272' }}
          >
            <X className="w-8 h-8 text-white" />
          </button>

          {/* Pixelated image - sizes naturally with dark background */}
          <img
            src={userData.pixelatedImage}
            alt="Pixelated"
            className="max-w-none w-auto h-auto object-contain"
            style={{
              imageRendering: 'pixelated',
              maxHeight: 'calc(100vh - 100px)',
            }}
          />

          {/* Download button - bottom */}
          {/* <button
            onClick={handleDownload}
            className="mt-6 pixel-font text-sm px-6 py-3 bg-[#ff6b9d] text-white rounded-lg hover:bg-[#ff4477] transition-colors flex items-center gap-2"
            style={{ 
              boxShadow: '0 4px 0 #c74272, 0 8px 20px rgba(0,0,0,0.3)',
            }}
          >
            <Download className="w-5 h-5" />
            DOWNLOAD
          </button> */}
        </div>
      )}

      {/* Main content - hidden when in fullscreen mode */}
      {!isFullscreen && (
        <div className="w-full z-[1] max-w-screen mx-auto min-h-screen flex items-center justify-center relative overflow-hidden p-4">
          {/* Animated sparkles */}
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                animation: 'sparkle 2s ease-in-out infinite',
                animationDelay: `${sparkle.delay}s`,
              }}
            >
              <Star 
                className="w-4 h-4 fill-[#ffcc00] text-[#ffcc00]"
                style={{
                  filter: 'drop-shadow(0 0 4px rgba(255, 204, 0, 0.8))',
                }}
              />
            </div>
          ))}

          <div className='flex w-full max-w-3xl mx-auto justify-center'>


          {/* Floating hearts decoration - positioned close to the content card */}
          <div className="absolute float z-50"
          style={{
            top: '40%',
            left: '15%'
          }}>
            <img 
              src={IMAGES.VALENTINES_3D_STEREO_LOVE}
              alt="heart"
              className="w-16 h-16"
              style={{ 
                imageRendering: 'pixelated', 
                filter: 'drop-shadow(0 0 8px rgba(255, 107, 157, 0.8))',
                //backgroundColor: '#4a3b5c',
              }}
            />
          </div>
          <div className="absolute float z-50" style={{ animationDelay: '0.5s',
          top: '40%',
          right: '15%'}}>
            <img 
              src={IMAGES.VALENTINES_3D_STEREO_LOVE}
              alt="heart"
              className="w-16 h-16"
              style={{                 
                imageRendering: 'pixelated', 
                filter: 'drop-shadow(0 0 8px rgba(255, 68, 68, 0.8))',
                //backgroundColor: '#4a3b5c',
              }}
            />
          </div>

          {/* Main content */}
          <div 
            className={`bg-[#4a3b5c] rounded-3xl p-4 md:p-10 pixel-border relative z-10 transition-all duration-1000 w-90% max-w-3xl ${
              showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          >
            {/* Banner with "Happy Valentine's Day" */}
            <div className="relative mb-6">
              <div 
                className="bg-[#ff6b9d] rounded-lg p-4 md:p-6 relative"
                style={{
                  boxShadow: '0 4px 0 #c74272, inset 0 -4px 0 rgba(0,0,0,0.2)',
                  transform: 'perspective(500px) rotateX(-5deg)',
                }}
              >
                <div 
                  className="absolute top-0 left-0 w-full h-2 bg-[#ff4477]"
                  style={{ borderRadius: '8px 8px 0 0' }}
                />
                <div 
                  className="absolute bottom-0 left-0 w-full h-2 bg-[#c74272]"
                  style={{ borderRadius: '0 0 8px 8px'  }}
                />
                <h1 
                  className="cursive-font text-lg md:text-2xl text-white text-center"
                  style={{ 
                    textShadow: '3px 3px 0 rgba(0,0,0,0.3)',
                    letterSpacing: '0.05em'
                  }}
                >
                  Happy Valentine's Day
                </h1>
                {/* Ribbon ends */}
                <div 
                  className="absolute -left-4 top-1/2 w-4 h-12 bg-[#c74272]"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%)',
                    transform: 'translateY(-50%)',
                  }}
                />
                <div 
                  className="absolute -right-4 top-1/2 w-4 h-12 bg-[#c74272]"
                  style={{
                    clipPath: 'polygon(0 0, 50% 80%, 100% 100%, 100% 0)',
                    transform: 'translateY(-50%) scaleX(-1)',
                  }}
                />
              </div>
            </div>

              {/* Trophy and content */}
              <div className="text-center">
                {/* Pixelated image thumbnail with floating download button */}
                {userData.image && (
                  <div className="my-4 flex flex-col items-center gap-3 relative inline-block">
                    
                    <div className="relative inline-block">
                      {/* Pixelated image canvas */}
                      <canvas
                        ref={canvasRef}
                        onClick={openFullscreen}
                        className="rounded-lg border-4 border-[#ffcc00] cursor-pointer hover:border-[#ffdd44] transition-colors"
                        style={{
                          imageRendering: 'pixelated',
                          boxShadow: '0 0 20px rgba(255, 204, 0, 0.5)',
                          maxWidth: '200px',
                        }}
                        title="Click to view fullscreen"
                      />
                      
                      {/* Fullscreen button overlay */}
                      <div 
                        className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity"
                        style={{ transform: 'translate(25%, -25%)' }}
                      >
                        <div className="bg-black/50 rounded-full p-1">
                          <Maximize2 className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      {/* Floating download button at bottom-right */}
                      <button
                        onClick={handleDownload}
                        className="absolute -bottom-2 -right-2 cursive-font text-xs px-3 py-2 bg-[#ff6b9d] text-white rounded-lg hover:bg-[#ff4477] transition-colors flex items-center gap-2 z-10"
                        style={{ 
                          boxShadow: '0 4px 0 #c74272, 0 8px 20px rgba(0,0,0,0.3)',
                        }}
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden md:inline">Download</span>
                      </button>
                    </div>
                  </div>
                )}
                

                <p className="cursive-font text-xs text-white mb-3 leading-relaxed max-w-md mx-auto mt-6">
                  Here's a retro🕹 pixel image of you<br/>
                  Wasn't that fun to see 😄.
                </p>
                <p className="cursive-font text-xs text-white mb-4 leading-relaxed max-w-md mx-auto mt-3">
                  You would have been as cute then<br/>
                  as you are now🤗
                </p>

                <div className="mb-6">
                  <p className="cursive-font text-sm text-[#ffcc00]">
                    Beauty Points: Infinite ✨
                  </p>
                </div>

                {/* Hearts decoration */}
                <div className="flex justify-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={i % 2 === 0 ? IMAGES.PIXEL_HEART_RED : IMAGES.PIXEL_HEART_PINK}
                      alt="heart"
                      className="w-8 h-8"
                      style={{ 
                        imageRendering: 'pixelated',
                        filter: 'drop-shadow(0 0 4px rgba(255, 68, 68, 0.8))',
                        animation: 'float 2s ease-in-out infinite',
                        animationDelay: `${i * 0.2}s`,
                        backgroundColor: '#4a3b5c',
                      }}
                    />
                  ))}
                </div>

                {/* Play again button */}
                <button
                  onClick={onRestart}
                  className="cursive-font text-sm px-8 py-3 bg-[#ff6b9d] text-white rounded-lg hover:bg-[#ff4477] transition-colors"
                  style={{ 
                    boxShadow: '0 4px 0 #c74272, 0 8px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  ► Play Again
                </button>
              </div>
            

            {/* Bottom decoration */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-[#ff6b9d] rounded-full"
                  style={{
                    animation: 'blink 1.5s infinite',
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>
          </div>
        </div>
      )}
    </>
  );
}
