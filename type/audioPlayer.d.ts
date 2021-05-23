export type AudioPlayerContextI = {
  currentSong: Entry<CTSong>;
  audio: HTMLAudioElement | null;
  playing: boolean;
  volume: number;
  time: { currentTime: number; duration: number };
  seek: (time: number) => void;
  load: (song: Entry<CTSong>, playOnLoad?: boolean) => void;
  setPlayState: (state: "play" | "pause" | "stop") => void;
  setVolume: (volume: number) => void;
};
