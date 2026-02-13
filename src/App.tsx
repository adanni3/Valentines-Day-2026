import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { MessageScreen } from './components/MessageScreen';
import { NoMessageScreen } from './components/NoMessageScreen';
import { AnimationScreen } from './components/AnimationScreen';
import { NoAnimationScreen } from './components/NoAnimationScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { InputScreen } from './components/InputScreen';
import { CongratulatoryScreen } from './components/CongratulatoryScreen';
import { MusicPlayer } from './components/MusicPlayer';

export type Screen = 'welcome' | 'message' | 'no-message' | 'animation' | 'no-animation' | 'input' | 'loading' | 'congratulations';

export interface UserData {
  image: string | null;
  pixelatedImage?: string | null;
}

// DEBUG: Set this to any screen to debug it in isolation
// Options: 'welcome' | 'message' | 'no-message' | 'animation' | 'no-animation' | 'input' | 'loading' | 'congratulations'
const DEBUG_SCREEN: Screen | null = 'welcome';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(DEBUG_SCREEN || 'welcome');
  const [userData, setUserData] = useState<UserData>({ image: null, pixelatedImage: null });
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);

  const handleNext = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleUserDataSubmit = (data: UserData) => {
    setUserData(data);
    setCurrentScreen('loading');
  };

  const handleWelcomeChoice = (choice: 'yes' | 'no') => {
    setShowMusicPlayer(true); // Show music player when user starts
    if (choice === 'yes') {
      // YES now takes the shorter path (NoAnimation → NoMessage)
      setCurrentScreen('no-animation');
    } else {
      // NO now takes the longer romantic path (Animation → Message)
      setCurrentScreen('animation');
    }
  };

  const handleRestart = () => {
    setCurrentScreen('input');
    setShowMusicPlayer(false);
    setUserData({ image: null, pixelatedImage: null });
  };

  const handleResetToWelcome = () => {
    setCurrentScreen('welcome');
    setIsPlaying(false);
    setShowMusicPlayer(false);
    setUserData({ image: null, pixelatedImage: null });
  };

  const handleLoadingComplete = (data: UserData) => {
    setUserData(data);
    setCurrentScreen('congratulations');
  };

  return (
    <div className="min-h-screen bg-[#2d2438] flex items-center justify-center p-4">
      {/* Music player - shows on all screens */}
      {showMusicPlayer && (
        <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      )}

      {currentScreen === 'welcome' && (
        <WelcomeScreen onChoice={handleWelcomeChoice} />
      )}
      {currentScreen === 'animation' && (
        <AnimationScreen onNext={() => handleNext('message')} />
      )}
      {currentScreen === 'no-animation' && (
        <NoAnimationScreen onNext={() => handleNext('no-message')} />
      )}
      {currentScreen === 'message' && (
        <MessageScreen onNext={() => handleNext('input')} />
      )}
      {currentScreen === 'no-message' && (
        <NoMessageScreen onNext={() => handleNext('input')} />
      )}
      {currentScreen === 'input' && (
        <InputScreen onSubmit={handleUserDataSubmit} onMusicPlayerReady={() => setShowMusicPlayer(true)} />
      )}
      {currentScreen === 'loading' && (
        <LoadingScreen userData={userData} onNext={handleLoadingComplete} />
      )}
      {currentScreen === 'congratulations' && (
        <CongratulatoryScreen userData={userData} onRestart={handleRestart} />
      )}
    </div>
  );
}
