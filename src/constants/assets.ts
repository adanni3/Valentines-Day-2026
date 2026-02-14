// Music URLs from Cloudinary (via environment variables)
export const MUSIC = {
  YOUVE_GOT_A_FRIEND_IN_ME: import.meta.env.VITE_MUSIC_YOUVE_GOT_A_FRIEND_IN_ME,
  FAIRYTALE: import.meta.env.VITE_MUSIC_FAIRYTALE,
  CANT_STOP_THE_FEELING: import.meta.env.VITE_MUSIC_CANT_STOP_THE_FEELING,
  WHAT_IS_LOVE: import.meta.env.VITE_MUSIC_WHAT_IS_LOVE,
  GOOD_VIBRATIONS: import.meta.env.VITE_MUSIC_GOOD_VIBRATIONS,
  HAPPY: import.meta.env.VITE_MUSIC_HAPPY,
  LA_DA_DEE: import.meta.env.VITE_MUSIC_LA_DA_DEE,
  A_FRIEND_LIKE_YOU: import.meta.env.VITE_MUSIC_A_FRIEND_LIKE_YOU,
  CUPID: import.meta.env.VITE_MUSIC_CUPID,
  EYES_BLUE_LIKE_THE_ATLANTIC: import.meta.env.VITE_MUSIC_EYES_BLUE_LIKE_THE_ATLANTIC,
} as const;

// Image URLs from Cloudinary (via environment variables)
export const IMAGES = {
  // Valentine's 3D stereo love image
  VALENTINES_3D_STEREO_LOVE: import.meta.env.VITE_IMAGE_VALENTINES_3D_STEREO_LOVE,
  // Cupid love angel cartoon vector
  CUPID_LOVE_ANGEL: import.meta.env.VITE_IMAGE_CUPID_LOVE_ANGEL,
  // Pixel heart red
  PIXEL_HEART_RED: import.meta.env.VITE_IMAGE_PIXEL_HEART_RED,
  // Pixel heart pink
  PIXEL_HEART_PINK: import.meta.env.VITE_IMAGE_PIXEL_HEART_PINK,
  // Various image assets (named by their original hash)
  CA98284D: import.meta.env.VITE_IMAGE_CA98284D,
  E801AC36: import.meta.env.VITE_IMAGE_E801AC36,
  E4D8E8C4: import.meta.env.VITE_IMAGE_E4D8E8C4,
  IMAGE_315E9279: import.meta.env.VITE_IMAGE_315E9279,
  BC3EEC7F: import.meta.env.VITE_IMAGE_BC3EEC7F,
  IMAGE_1A5F1705: import.meta.env.VITE_IMAGE_1A5F1705,
  D0C21E4E: import.meta.env.VITE_IMAGE_D0C21E4E,
  IMAGE_6F339C0C: import.meta.env.VITE_IMAGE_6F339C0C,
  IMAGE_2671486E: import.meta.env.VITE_IMAGE_2671486E,
  C674AA93: import.meta.env.VITE_IMAGE_C674AA93,
} as const;

// Music list for MusicPlayer component
export const MUSIC_LIST = [
  { id: 1, src: MUSIC.CUPID, title: 'Cupid - FIFTY FIFTY' },
  { id: 2, src: MUSIC.A_FRIEND_LIKE_YOU, title: 'A Friend Like You' },
  { id: 3, src: MUSIC.LA_DA_DEE, title: 'La Da Dee - Cody Simpson' },
  { id: 4, src: MUSIC.GOOD_VIBRATIONS, title: 'Good Vibrations - Ricky Reed' },
  { id: 5, src: MUSIC.HAPPY, title: 'Happy - Pharrell Williams' },
  { id: 6, src: MUSIC.CANT_STOP_THE_FEELING, title: "Can't Stop The Feeling - Justin Timberlake" },
  { id: 7, src: MUSIC.WHAT_IS_LOVE, title: 'What Is Love - Rio 2 Soundtrack' },
  { id: 8, src: MUSIC.FAIRYTALE, title: 'Fairytale' },
  { id: 9, src: MUSIC.EYES_BLUE_LIKE_THE_ATLANTIC, title: 'Eyes Blue Like The Atlantic' },
  { id: 10, src: MUSIC.YOUVE_GOT_A_FRIEND_IN_ME, title: "You've Got A Friend In Me - Randy Newman" },
] as const;
