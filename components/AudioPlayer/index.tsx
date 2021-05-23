import { AudioPlayerContextI } from "@type/audioPlayer";
import { secondsToTimeString } from "@util/index";
import { createContext, MouseEventHandler, useContext } from "react";
import css from "./AudioPlayer.module.css";

export const AudioPlayerContext = createContext<AudioPlayerContextI>(null);

const AudioPlayer = () => {
  const { currentSong, time, seek, setPlayState, setVolume, playing, volume } =
    useContext(AudioPlayerContext);

  const handleSeek: MouseEventHandler<HTMLProgressElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const width = rect.right - rect.left;
    const x = e.clientX - rect.left;

    const pointInSong = (x / width) * time.duration;
    seek(pointInSong);
  };

  const handleVolume: MouseEventHandler<HTMLProgressElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const width = rect.right - rect.left;
    const x = e.clientX - rect.left;

    const finalVolume = x / width;
    setVolume(finalVolume);
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
            onClick={handleSeek}
            max={time.duration}
            value={time.currentTime}
          />
        </div>

        <div className={css.volume}>
          <progress
            className={css.volume__bar}
            onClick={handleVolume}
            max={1}
            value={volume}
            title="Volume"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
