import { CTSong } from "@type/content";
import { Entry } from "contentful";
import { createContext, MouseEventHandler, useContext } from "react";
import css from "./AudioPlayer.module.css";

export const AudioPlayerContext = createContext<AudioPlayerContextI>(null);

export type AudioPlayerContextI = {
  currentSong: Entry<CTSong>;
  audio: HTMLAudioElement | null;
  playing: boolean;
  time: { currentTime: number; duration: number };
  seek: (time: number) => void;
  load: (song: Entry<CTSong>, playOnLoad?: boolean) => void;
  setPlayState: (state: "play" | "pause" | "stop") => void;
};

const AudioPlayer = () => {
  const { currentSong, time, seek, setPlayState, playing } =
    useContext(AudioPlayerContext);

  // handle seeking to different points in song
  const progressBarOnClick: MouseEventHandler<HTMLProgressElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const width = rect.right - rect.left;
    const x = e.clientX - rect.left;

    const pointInSong = (x / width) * time.duration;
    seek(pointInSong);
  };

  return (
    <div className={css.player}>
      <div className={css.info}>
        <p>Now playing</p>
        <h2 className={css.info__title}>{currentSong?.fields.title ?? "-"}</h2>
      </div>

      <div className={css.controls}>
        <div className={css.buttons}>
          <button className={css.buttons__button}>{"<"}</button>
          <button
            className={css.buttons__button}
            onClick={() => setPlayState(playing ? "pause" : "play")}>
            {playing ? "||" : "▷"}
          </button>
          <button className={css.buttons__button}>{">"}</button>
        </div>
        <div className={css.progress}>
          <div className={css.progress__time}>
            <p>0:00</p>
            <p>2:30</p>
          </div>
          <progress
            className={css.progress__bar}
            onClick={progressBarOnClick}
            max={time.duration}
            value={time.currentTime}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
