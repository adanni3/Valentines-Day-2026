# Valentine's Day Retro Game Screens

A romantic, interactive Valentine's Day web application with retro game-inspired visuals, animations, and music. Built with React, TypeScript, and Vite.

![Valentine's Day Retro Game](https://res.cloudinary.com/dwykmvdhb/image/upload/v1771048356/Pngtree_valentines_day_3d_stereo_love_19771091_hqfjq4.png)

## Features

- **Interactive Story Flow**: A choose-your-own-adventure style experience with multiple paths
- **Retro Pixel Art Animations**: Nostalgic game-inspired visual effects
- **Music Player**: Built-in audio player with shuffle functionality and a curated romantic playlist
- **Image Upload & Pixelation**: Upload photos and apply retro pixel art effects
- **Responsive Design**: Works on desktop and mobile devices
- **Preloaded Assets**: Optimized image preloading for smooth transitions

## Demo Flow

The application follows a branching narrative:

```
Welcome Screen
      │
      ├── "YES" ──→ No Animation Screen ──→ No Message Screen ──┐
      │                                                          │
      └── "NO" ───→ Animation Screen ──→ Message Screen ────────┤
                                                               │
                                                               ▼
                                                        Input Screen
                                                               │
                                                               ▼
                                                       Loading Screen
                                                               │
                                                               ▼
                                                  Congratulatory Screen
```

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Audio**: HTML5 Audio API
- **Image Processing**: Custom pixelation algorithm
- **Asset Hosting**: Cloudinary

## Project Structure

```
valentines-day-retro-game-screens/
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Local images and music (gitignored)
│   │   ├── music/              # MP3 files
│   │   └── pics/               # Image files
│   ├── components/
│   │   ├── AnimationScreen.tsx # Animated transition screen
│   │   ├── CongratulatoryScreen.tsx
│   │   ├── InputScreen.tsx     # Photo upload screen
│   │   ├── LoadingScreen.tsx   # Processing screen
│   │   ├── MessageScreen.tsx   # Romantic message display
│   │   ├── MusicPlayer.tsx     # Audio player component
│   │   ├── NoAnimationScreen.tsx
│   │   ├── NoMessageScreen.tsx
│   │   ├── WelcomeScreen.tsx   # Initial choice screen
│   │   ├── figma/              # Figma-specific components
│   │   └── ui/                 # Reusable UI components
│   ├── constants/
│   │   └── assets.ts           # Asset URLs and music list
│   ├── styles/
│   │   └── globals.css         # Global styles
│   ├── utils/
│   │   └── pixelate.ts         # Image pixelation utility
│   ├── App.tsx                 # Main application component
│   ├── main.tsx                # Entry point
│   ├── index.css               # Global CSS
│   └── vite-env.d.ts           # TypeScript declarations
├── .env                        # Environment variables
├── .gitignore
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd valentines-day-retro-game-screens
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Music URLs (Cloudinary or other CDN)
   VITE_MUSIC_YOUVE_GOT_A_FRIEND_IN_ME=<url>
   VITE_MUSIC_FAIRYTALE=<url>
   VITE_MUSIC_CANT_STOP_THE_FEELING=<url>
   VITE_MUSIC_WHAT_IS_LOVE=<url>
   VITE_MUSIC_GOOD_VIBRATIONS=<url>
   VITE_MUSIC_HAPPY=<url>
   VITE_MUSIC_LA_DA_DEE=<url>
   VITE_MUSIC_A_FRIEND_LIKE_YOU=<url>
   VITE_MUSIC_CUPID=<url>
   VITE_MUSIC_EYES_BLUE_LIKE_THE_ATLANTIC=<url>
   
   # Image URLs
   VITE_IMAGE_VALENTINES_3D_STEREO_LOVE=<url>
   VITE_IMAGE_CUPID_LOVE_ANGEL=<url>
   VITE_IMAGE_PIXEL_HEART_RED=<url>
   VITE_IMAGE_PIXEL_HEART_PINK=<url>
   # ... additional image URLs
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:3000`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production (outputs to `build/`) |

## Components Overview

### Screens

| Component | Description |
|-----------|-------------|
| `WelcomeScreen` | Initial screen with "Will you be my Valentine?" prompt |
| `AnimationScreen` | Animated hearts and cupid sequence |
| `NoAnimationScreen` | Simplified transition for "YES" path |
| `MessageScreen` | Displays romantic message with animations |
| `NoMessageScreen` | Simplified message for "YES" path |
| `InputScreen` | Photo upload with camera/gallery options |
| `LoadingScreen` | Processing animation with pixelation effect |
| `CongratulatoryScreen` | Final screen with pixelated photo display |

### Music Player

The `MusicPlayer` component provides:
- Play/Pause controls
- Shuffle functionality
- Auto-advance to next track
- Current song title display

### Playlist

1. Cupid - FIFTY FIFTY
2. A Friend Like You
3. La Da Dee - Cody Simpson
4. Good Vibrations - Ricky Reed
5. Happy - Pharrell Williams
6. Can't Stop The Feeling - Justin Timberlake
7. What Is Love - Rio 2 Soundtrack
8. Fairytale
9. Eyes Blue Like The Atlantic
10. You've Got A Friend In Me - Randy Newman

## Customization

### Debug Mode

To debug specific screens, modify the `DEBUG_SCREEN` constant in `src/App.tsx`:

```typescript
const DEBUG_SCREEN: Screen | null = 'congratulations'; // or any other screen
```

### Adding New Music

1. Add the URL to your `.env` file:
   ```env
   VITE_MUSIC_NEW_SONG=https://example.com/song.mp3
   ```

2. Update `src/vite-env.d.ts`:
   ```typescript
   readonly VITE_MUSIC_NEW_SONG: string;
   ```

3. Add to `src/constants/assets.ts`:
   ```typescript
   NEW_SONG: import.meta.env.VITE_MUSIC_NEW_SONG,
   ```

4. Add to `MUSIC_LIST` array

### Styling

The app uses a consistent color palette:
- Primary Background: `#2d2438`
- Secondary Background: `#4a3b5c`
- Accent Pink: `#ff6b9d`
- Button Shadow: `#c74272`

Modify these in `src/index.css` or component-level styles.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Optimizations

- Image preloading for smooth transitions
- Lazy loading of audio files
- Optimized bundle size with tree shaking
- Responsive images via Cloudinary

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is for personal/educational use. Please ensure you have appropriate licenses for any music or images used.

## Credits

- Original Design: [Figma](https://www.figma.com/design/MUG0xYrDmUyaviERCYD1VD/Valentine-s-Day-Retro-Game-Screens)
- Icons: [Lucide](https://lucide.dev/)
- UI Components: [Radix UI](https://www.radix-ui.com/)

---

Made with ❤️ for Valentine's Day
