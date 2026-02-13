import { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Pause, Shuffle } from 'lucide-react';

// Import music files from assets folder
import musicCupid from '../assets/music/FIFTY FIFTY - Cupid (Twin Version) (Lyrics).mp3';
import musicFriend from '../assets/music/A Friend Like You.mp3';
import musicLaDaDee from '../assets/music/Cody Simpson - La Da Dee (Official Music Video).mp3';
import musicAtlantic from '../assets/music/Eyes Blue Like The Atlantic (feat. Subvrbs).mp3';
import musicFairytale from '../assets/music/Fairytale.mp3';
import musicFriendInMe from "../assets/music/You've Got A Friend In Me - Randy Newman (Toy Story Edition).mp3";

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

// Music list with imported file paths
const MUSIC_LIST = [
  { id: 1, src: musicCupid, title: 'Cupid - FIFTY FIFTY' },
  { id: 2, src: musicFriend, title: 'A Friend Like You' },
  { id: 3, src: musicLaDaDee, title: 'La Da Dee - Cody Simpson' },
  { id: 4, src: musicAtlantic, title: 'Eyes Blue Like The Atlantic' },
  { id: 5, src: musicFairytale, title: 'Fairytale' },
  { id: 6, src: musicFriendInMe, title: "You've Got A Friend In Me" },
];

export function MusicPlayer({ isPlaying, setIsPlaying }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [shuffledList, setShuffledList] = useState<typeof MUSIC_LIST>([]);
  const [currentTitle, setCurrentTitle] = useState('');

  // Initialize shuffled list
  useEffect(() => {
    const shuffled = [...MUSIC_LIST];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledList(shuffled);
    setCurrentTitle(MUSIC_LIST[0].title);
  }, []);

  // Play/pause control
  useEffect(() => {
    if (!audioRef.current || shuffledList.length === 0) return;

    const currentSong = shuffledList[currentSongIndex];
    setCurrentTitle(currentSong.title);

    if (isPlaying) {
      audioRef.current.src = currentSong.src;
      audioRef.current.load();
      audioRef.current.play().catch((err) => {
        console.log('Audio play failed:', err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSongIndex, shuffledList, setIsPlaying]);

  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying, setIsPlaying]);

  const handleShuffle = useCallback(() => {
    const shuffled = [...MUSIC_LIST];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledList(shuffled);
    setCurrentSongIndex(0);
    if (!isPlaying) {
      setIsPlaying(true);
    }
  }, [isPlaying, setIsPlaying]);

  const handleSongEnd = useCallback(() => {
    const nextIndex = (currentSongIndex + 1) % shuffledList.length;
    setCurrentSongIndex(nextIndex);
  }, [currentSongIndex, shuffledList.length]);

  const currentSong = shuffledList[currentSongIndex] || MUSIC_LIST[0];

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="flex items-center gap-2">
        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          className="bg-[#4a3b5c] border-2 border-[#ff6b9d] rounded-full p-3 hover:bg-[#5a4b6c] transition-all float"
          style={{
            boxShadow: '0 4px 0 #c74272, 0 8px 20px rgba(0,0,0,0.5)',
          }}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-[#ff6b9d]" />
          ) : (
            <Play className="w-6 h-6 text-[#ff6b9d]" />
          )}
        </button>

        {/* Shuffle button */}
        <button
          onClick={handleShuffle}
          className="bg-[#4a3b5c] border-2 border-[#ff6b9d] rounded-full p-2 hover:bg-[#5a4b6c] transition-all"
          style={{
            boxShadow: '0 4px 0 #c74272, 0 8px 20px rgba(0,0,0,0.5)',
          }}
          title="Shuffle songs"
        >
          <Shuffle className="w-5 h-5 text-[#ff6b9d]" />
        </button>
      </div>
      
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onEnded={handleSongEnd}
        preload="none"
      />
       
      <div className="relative -bottom-6 left-0 w-full text-center">
        <span className="pixel-font text-[9px] text-[#ff6b9d] opacity-70 whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] inline-block">
          {isPlaying ? `♪ ${currentTitle}` : currentTitle}
        </span>
      </div>
    </div>
  );
}

