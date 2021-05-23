import { AudioPlayerContextI } from "@components/AudioPlayer";
import { DARK_THEME, LIGHT_THEME } from "@constants/colorSchemes";
import { CTSong } from "@type/content";
import { Entry } from "contentful";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Helper to use useLayoutEffect without console warnings.
 * (it runs as useEffect on the server side and useLayoutEffect on the client side)
 * @see https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Hook to use when providing value to ThemeContext.Provider
 */
export const useColorScheme = () => {
  const query = "(prefers-color-scheme: dark)";

  const [current, setCurrent] = useState<"dark" | "light" | "auto">("auto");
  const [dark, setDark] = useState(false);

  const theme = dark ? DARK_THEME : LIGHT_THEME;

  useIsomorphicLayoutEffect(() => {
    const userChoice = localStorage.getItem("color-scheme") as "dark" | "light";

    if (userChoice) {
      setCurrent(userChoice);
      setDark(userChoice === "dark");
      return;
    }

    setCurrent("auto");
    setDark(window.matchMedia(query).matches);
  }, []);

  const setColorScheme = (value: "dark" | "light" | "auto") => {
    if (value === "auto") {
      localStorage.removeItem("color-scheme");

      setCurrent("auto");
      setDark(window.matchMedia(query).matches);
      return;
    }

    setCurrent(value);
    setDark(value === "dark");
    localStorage.setItem("color-scheme", value);
  };

  return { theme, setColorScheme, current, dark };
};

export const useLoadingState = () => {
  const [loading, setLoading] = useState(true);
  const { events } = useRouter();

  useIsomorphicLayoutEffect(() => setLoading(false), []);

  events?.on("routeChangeStart", () => setLoading(true));
  events?.on("routeChangeComplete", () => setLoading(false));
  events?.on("routeChangeError", () => setLoading(false));

  return { loading };
};

export const useAudioPlayer = (): AudioPlayerContextI => {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState({ currentTime: 0, duration: 0 });
  const [currentSong, setCurrentSong] = useState<Entry<CTSong>>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // sync play state
  useEffect(() => {
    setPlaying(!audioRef.current?.paused);
  }, [audioRef.current?.paused]);

  // event handling
  useEffect(() => {
    if (!audioRef.current) {
      setTime({ currentTime: 0, duration: 0 });
      return;
    }

    audioRef.current.ontimeupdate = () => {
      const { currentTime, duration } = audioRef.current;
      setTime({ currentTime, duration: !isNaN(duration) ? duration : 0 });
    };

    return () => {
      audioRef.current.ontimeupdate = null;
      audioRef.current?.pause();
      audioRef.current?.remove();
    };
  }, [audioRef.current]);

  // clean-up on unmount
  useEffect(() => {
    return () => {
      if (!audioRef.current) return;
      audioRef.current.src = null;
      audioRef.current.pause();
      audioRef.current.remove();
    };
  }, []);

  /**
   * Loads a new song and removes the previous one.
   * @param song
   * @returns
   */
  const load = (song: Entry<CTSong>, playOnLoad?: boolean) => {
    if (!song.fields.audioFile?.fields.file.url) return;

    if (!audioRef.current) audioRef.current = new Audio();

    audioRef.current.src = song.fields.audioFile.fields.file.url;
    audioRef.current.currentTime = 0;
    audioRef.current.pause();
    setCurrentSong(song);

    if (playOnLoad) audioRef.current.play();
  };

  const setPlayState = (state: "play" | "pause" | "stop") => {
    if (!audioRef.current) return;

    switch (state) {
      case "play":
        audioRef.current.play();
        break;
      case "pause":
        audioRef.current.pause();
        break;
      case "stop":
        audioRef.current.currentTime = 0;
        audioRef.current.pause();
        break;
    }
  };

  const seek = (time: number) => {
    if (!audioRef.current || !isFinite(time)) return;
    audioRef.current.currentTime = time;
  };

  return {
    setPlayState,
    load,
    seek,
    playing,
    time,
    currentSong,
    audio: audioRef.current,
  };
};
