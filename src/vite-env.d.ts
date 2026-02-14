/// <reference types="vite/client" />

// Environment variable type declarations
interface ImportMetaEnv {
  // Music URLs
  readonly VITE_MUSIC_YOUVE_GOT_A_FRIEND_IN_ME: string;
  readonly VITE_MUSIC_FAIRYTALE: string;
  readonly VITE_MUSIC_CANT_STOP_THE_FEELING: string;
  readonly VITE_MUSIC_WHAT_IS_LOVE: string;
  readonly VITE_MUSIC_GOOD_VIBRATIONS: string;
  readonly VITE_MUSIC_HAPPY: string;
  readonly VITE_MUSIC_LA_DA_DEE: string;
  readonly VITE_MUSIC_A_FRIEND_LIKE_YOU: string;
  readonly VITE_MUSIC_CUPID: string;
  readonly VITE_MUSIC_EYES_BLUE_LIKE_THE_ATLANTIC: string;
  
  // Image URLs
  readonly VITE_IMAGE_VALENTINES_3D_STEREO_LOVE: string;
  readonly VITE_IMAGE_CUPID_LOVE_ANGEL: string;
  readonly VITE_IMAGE_PIXEL_HEART_RED: string;
  readonly VITE_IMAGE_CA98284D: string;
  readonly VITE_IMAGE_E801AC36: string;
  readonly VITE_IMAGE_E4D8E8C4: string;
  readonly VITE_IMAGE_315E9279: string;
  readonly VITE_IMAGE_PIXEL_HEART_PINK: string;
  readonly VITE_IMAGE_BC3EEC7F: string;
  readonly VITE_IMAGE_1A5F1705: string;
  readonly VITE_IMAGE_D0C21E4E: string;
  readonly VITE_IMAGE_6F339C0C: string;
  readonly VITE_IMAGE_2671486E: string;
  readonly VITE_IMAGE_C674AA93: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
