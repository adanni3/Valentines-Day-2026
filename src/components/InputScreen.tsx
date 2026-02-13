import { useState, useRef, useEffect } from 'react';
import { Upload } from 'lucide-react';
import pixelHeartRed from '../assets/2671486e439df42630a31162d01a30fd.png';
import type { UserData } from '../App';

interface InputScreenProps {
  onSubmit: (data: UserData) => void;
  onMusicPlayerReady: () => void;
}

export function InputScreen({ onSubmit, onMusicPlayerReady }: InputScreenProps) {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Trigger music player to show when component mounts
    onMusicPlayerReady();
  }, [onMusicPlayerReady]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (image) {
      onSubmit({ image });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto scanline">
      <div className="bg-[#4a3b5c] rounded-3xl p-8 md:p-12 pixel-border">
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src={pixelHeartRed}
            alt="heart"
            className="w-16 h-16 mx-auto mb-4 float"
            style={{
              imageRendering: 'pixelated',
              //filter: 'drop-shadow(0 0 16px rgba(255, 68, 68, 0.8))',
              backgroundColor: '#4a3b5c',
            }}
          />
          <h2 
            className="pixel-font text-xl md:text-3xl text-[#ffcc00] mb-4 leading-relaxed"
            style={{ 
              textShadow: '3px 3px 0 rgba(0,0,0,0.3)',
              letterSpacing: '0.05em'
            }}
          >
            TRYING TO SET THE MOOD FOR YOUR GIFT😏
          </h2>
          <p className="pixel-font text-xs text-white opacity-80">
           ♪  Make sure some tunes are playing ♪
          </p>
          <p className="pixel-font text-xs text-white opacity-80">
           ♪  pssst top left😁 ♪
          </p>
        </div>

        {/* Image upload */}
        <div className="mb-8 text-center">
          <label className="pixel-font text-xs text-[#ff6b9d] mb-3 block leading-relaxed">
            LET ME BORROW A CUTE PIC OF YOURS🥺🙏,<br/>
            MAKE SURE IT IS BRIGHT AND YOU LOOK NICE😁,<br/>
            TRUST ME IT WILL BE FUN😂
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full max-w-sm mx-auto block bg-[#2d2438] border-2 border-dashed border-[#6b5b7c] hover:border-[#ff6b9d] rounded-lg p-4 transition-colors"
          >
            {image ? (
              <div className="flex flex-col items-center gap-3">
                <img 
                  src={image} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded"
                />
                <span className="text-white text-sm">Click to change image</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 py-4">
                <Upload className="w-8 h-8 text-[#6b5b7c]" />
                <span className="text-white text-sm">Click to upload image</span>
                <span className="text-gray-400 text-xs">Will be pixelated for retro effect</span>
              </div>
            )}
          </button>
        </div>

        {/* Submit button */}
        <div className="text-center">
          <p className="pixel-font text-xs text-[#ff6b9d] mb-3">
            ALL DONE? THEN LET'S GO😁
          </p>
          <button
            onClick={handleSubmit}
            disabled={!image}
            className={`pixel-font text-sm px-8 py-4 rounded-lg transition-all ${
              image
                ? 'bg-[#ff6b9d] text-white hover:bg-[#ff4477] cursor-pointer'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            style={{ 
              boxShadow: image ? '0 4px 0 #c74272, 0 8px 20px rgba(0,0,0,0.3)' : 'none',
            }}
          >
            {image ? '🚀 FIRE AWAY' : 'UPLOAD IMAGE TO CONTINUE'}
          </button>
        </div>
      </div>
    </div>
  );
}