import { useState } from 'react';
import { IMAGES } from '../constants/assets';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WelcomeScreenProps {
  onChoice: (choice: 'yes' | 'no') => void;
}

export function WelcomeScreen({ onChoice }: WelcomeScreenProps) {
  const [selectedOption, setSelectedOption] = useState<'yes' | 'no'>('no');

  const handleYesClick = () => {
    onChoice('yes');
  };

  const handleNoClick = () => {
    onChoice('no');
  };

  return (
    <div className="w-full max-w-2xl mx-auto scanline">
      <div className="bg-[#4a3b5c] rounded-3xl p-8 md:p-12 relative pixel-border overflow-hidden">
        {/* Vine decorations with heart-shaped leaves */}
        <div className="absolute top-0 left-0 w-full h-32 opacity-30 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 800 150">
            {/* Left vine */}
            <path 
              d="M 0,150 Q 50,120 100,100 Q 150,80 200,90 Q 250,100 300,80"
              stroke="#4a7c59"
              strokeWidth="3"
              fill="none"
            />
            {/* Heart-shaped leaves on left vine */}
            <path d="M 70,110 C 65,105 60,105 60,110 C 60,115 65,120 70,125 C 75,120 80,115 80,110 C 80,105 75,105 70,110 Z" fill="#ff6b9d" opacity="0.8" />
            <path d="M 140,85 C 135,80 130,80 130,85 C 130,90 135,95 140,100 C 145,95 150,90 150,85 C 150,80 145,80 140,85 Z" fill="#ff6b9d" opacity="0.8" />
            <path d="M 220,95 C 215,90 210,90 210,95 C 210,100 215,105 220,110 C 225,105 230,100 230,95 C 230,90 225,90 220,95 Z" fill="#ff6b9d" opacity="0.8" />
            
            {/* Right vine */}
            <path 
              d="M 800,150 Q 750,120 700,100 Q 650,80 600,90 Q 550,100 500,80"
              stroke="#4a7c59"
              strokeWidth="3"
              fill="none"
            />
            {/* Heart-shaped leaves on right vine */}
            <path d="M 730,110 C 725,105 720,105 720,110 C 720,115 725,120 730,125 C 735,120 740,115 740,110 C 740,105 735,105 730,110 Z" fill="#ff6b9d" opacity="0.8" />
            <path d="M 660,85 C 655,80 650,80 650,85 C 650,90 655,95 660,100 C 665,95 670,90 670,85 C 670,80 665,80 660,85 Z" fill="#ff6b9d" opacity="0.8" />
            <path d="M 580,95 C 575,90 570,90 570,95 C 570,100 575,105 580,110 C 585,105 590,100 590,95 C 590,90 585,90 580,95 Z" fill="#ff6b9d" opacity="0.8" />
            
            {/* Small leaves scattered */}
            <path d="M 400,60 C 395,55 390,55 390,60 C 390,65 395,70 400,75 C 405,70 410,65 410,60 C 410,55 405,55 400,60 Z" fill="#ff6b9d" opacity="0.6" />
          </svg>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-30 pointer-events-none" style={{ transform: 'scaleY(-1)' }}>
          <svg className="w-full h-full" viewBox="0 0 800 150">
            {/* Mirror the same pattern */}
            <path 
              d="M 0,150 Q 50,120 100,100 Q 150,80 200,90 Q 250,100 300,80"
              stroke="#4a7c59"
              strokeWidth="3"
              fill="none"
            />
            <path d="M 70,110 C 65,105 60,105 60,110 C 60,115 65,120 70,125 C 75,120 80,115 80,110 C 80,105 75,105 70,110 Z" fill="#ff6b9d" opacity="0.8" />
            <path d="M 140,85 C 135,80 130,80 130,85 C 130,90 135,95 140,100 C 145,95 150,90 150,85 C 150,80 145,80 140,85 Z" fill="#ff6b9d" opacity="0.8" />
            
            <path 
              d="M 800,150 Q 750,120 700,100 Q 650,80 600,90 Q 550,100 500,80"
              stroke="#4a7c59"
              strokeWidth="3"
              fill="none"
            />
            <path d="M 730,110 C 725,105 720,105 720,110 C 720,115 725,120 730,125 C 735,120 740,115 740,110 C 740,105 735,105 730,110 Z" fill="#ff6b9d" opacity="0.8" />
            <path d="M 660,85 C 655,80 650,80 650,85 C 650,90 655,95 660,100 C 665,95 670,90 670,85 C 670,80 665,80 660,85 Z" fill="#ff6b9d" opacity="0.8" />
          </svg>
        </div>

        {/* Laurel wreath corners */}
        <div className="absolute top-4 left-4 w-16 h-16 opacity-40">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1608490175895-ac65499fdf9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwbGF1cmVsJTIwd3JlYXRofGVufDF8fHx8MTc3MDYzNjI1MHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="laurel"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="absolute top-4 right-4 w-16 h-16 opacity-40">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1608490175895-ac65499fdf9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwbGF1cmVsJTIwd3JlYXRofGVufDF8fHx8MTc3MDYzNjI1MHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="laurel"
            className="w-full h-full object-cover rounded-full"
            style={{ transform: 'scaleX(-1)' }}
          />
        </div>

        {/* Hearts at top */}
        <div className="flex justify-center gap-1 mb-8 relative z-10">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              src={IMAGES.D0C21E4E}
              alt="heart"
              className="w-6 h-6 md:w-8 md:h-8"
              style={{ 
                imageRendering: 'pixelated',
                filter: 'drop-shadow(0 0 4px rgba(255, 68, 68, 0.8))',
                //backgroundColor: '#4a3b5c',
              }}
            />
          ))}
        </div>

        {/* Main heading text */}
        <div className="text-center mb-12 relative z-10">
          <h1 
            className="cursive-font text-2xl md:text-4xl text-[#ffcc00] mb-8 float leading-relaxed"
            style={{ 
              textShadow: '4px 4px 0 rgba(0,0,0,0.3)',
              letterSpacing: '0.05em'
            }}
          >
            Hey Love,<br/>It's Saint<br/>Valentine's Day
          </h1>
        </div>

        {/* Question */}
        <div className="text-center mb-6 relative z-10">
          <p className="pixel-font text-white text-xs md:text-sm mb-4">
            DO YOU HAVE A VALENTINE?
          </p>
        </div>

        {/* Options */}
        <div className="flex justify-center gap-8 mb-8 relative z-10">
          <button
            onClick={handleYesClick}
            onMouseEnter={() => setSelectedOption('yes')}
            className={`cursive-font text-lg md:text-2xl transition-all ${
              selectedOption === 'yes' 
                ? 'text-[#ffcc00] scale-110' 
                : 'text-white opacity-50'
            }`}
            style={{ 
              textShadow: selectedOption === 'yes' ? '2px 2px 0 rgba(0,0,0,0.5)' : 'none',
            }}
          >
            Yes
            {selectedOption === 'yes' && (
              <span className="text-[#ff6b9d] ml-2 blink">◄</span>
            )}
          </button>
          <button
            onClick={handleNoClick}
            onMouseEnter={() => setSelectedOption('no')}
            className={`cursive-font text-lg md:text-2xl transition-all ${
              selectedOption === 'no' 
                ? 'text-[#ffcc00] scale-110' 
                : 'text-white opacity-50'
            }`}
            style={{ 
              textShadow: selectedOption === 'no' ? '2px 2px 0 rgba(0,0,0,0.5)' : 'none',
            }}
          >
            No
            {selectedOption === 'no' && (
              <span className="text-[#ff6b9d] ml-2 blink">◄</span>
            )}
          </button>
        </div>

        {/* Press Start hint */}
        <div className="text-center mt-6 relative z-10">
          <p className="pixel-font text-xs text-white opacity-50 blink">
            PRESS START
          </p>
        </div>
      </div>
    </div>
  );
}