import { AudioPlayerContextI } from "@type/audioPlayer";
import { secondsToTimeString } from "@util/index";
import { createContext, MouseEventHandler, useContext } from "react";
import css from "./AudioPlayer.module.css";

export const AudioPlayerContext = createContext<AudioPlayerContextI>(null);

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

  const toggle = () => setPlayState(playing ? "pause" : "play");

  const currentAlbumName = currentSong?.fields.album?.fields.title;
  const currentSongName = currentSong?.fields.title;

  return (
    <div className={css.player}>
      <div className={css.info}>
        <p>{currentAlbumName ?? "-"}</p>
        <h2 className={css.info__title}>{currentSongName ?? "-"}</h2>
      </div>

      <div className={css.controls}>
        <div className={css.buttons}>
          <button
            disabled={!currentSong}
            className={css.buttons__button}
            onClick={toggle}
            title={playing ? "pause" : "play"}>
            {playing ? "||" : "▷"}
          </button>
        </div>
        <div className={css.progress}>
          <div className={css.progress__time}>
            <p>{secondsToTimeString(time.currentTime)}</p>
            <p>{secondsToTimeString(time.duration)}</p>
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
