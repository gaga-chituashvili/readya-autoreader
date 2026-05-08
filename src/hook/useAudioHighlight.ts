import { useCallback, useEffect, useMemo, useRef } from "react";

type Word = { word: string; start: number; end: number };

export function useAudioHighlight(
  audioRef: React.RefObject<HTMLAudioElement | null>,
  words: Word[],
  playIconRef: React.RefObject<SVGSVGElement | null>,
  pauseIconRef: React.RefObject<SVGSVGElement | null>,
) {
  const isPlayingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const activeIndexRef = useRef(-1);
  const wordsRef = useRef(words);
  const onActiveIndexChangeRef = useRef<((i: number) => void) | null>(null);

  useEffect(() => {
    wordsRef.current = words;
  }, [words]);

  const findIndex = useCallback((time: number): number => {
    const w = wordsRef.current;
    if (!w.length) return -1;
    if (time < w[0].start) return -1;
    if (time >= w[w.length - 1].end) return w.length - 1;
    let lo = 0,
      hi = w.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (time < w[mid].start) hi = mid - 1;
      else if (time >= w[mid].end) lo = mid + 1;
      else return mid;
    }
    return lo > 0 ? lo - 1 : -1;
  }, []);

  const showPlay = useCallback(() => {
    if (playIconRef.current) playIconRef.current.style.display = "block";
    if (pauseIconRef.current) pauseIconRef.current.style.display = "none";
  }, [playIconRef, pauseIconRef]);

  const showPause = useCallback(() => {
    if (playIconRef.current) playIconRef.current.style.display = "none";
    if (pauseIconRef.current) pauseIconRef.current.style.display = "block";
  }, [playIconRef, pauseIconRef]);

  const handlers = useMemo(() => {
    const startLoop = () => {
      const tick = () => {
        if (!audioRef.current || !isPlayingRef.current) return;
        const next = findIndex(audioRef.current.currentTime);
        if (next !== activeIndexRef.current) {
          activeIndexRef.current = next;
          onActiveIndexChangeRef.current?.(next);
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    const stopLoop = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    return {
      onPlay: () => {
        isPlayingRef.current = true;
        showPause();
        startLoop();
      },
      onPause: () => {
        isPlayingRef.current = false;
        showPlay();
        stopLoop();
      },
      onEnded: () => {
        isPlayingRef.current = false;
        showPlay();
        stopLoop();
        activeIndexRef.current = -1;
        onActiveIndexChangeRef.current?.(-1);
      },
      onSeeked: () => {
        if (audioRef.current) {
          const next = findIndex(audioRef.current.currentTime);
          activeIndexRef.current = next;
          onActiveIndexChangeRef.current?.(next);
        }
      },
    };
  }, [findIndex, audioRef, showPlay, showPause]);

  const seekToTime = useCallback(
    (t: number) => {
      const next = findIndex(t);
      activeIndexRef.current = next;
      onActiveIndexChangeRef.current?.(next);
    },
    [findIndex],
  );

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlayingRef.current) audioRef.current.pause();
    else audioRef.current.play();
  }, [audioRef]);

  const registerCallback = useCallback((cb: (i: number) => void) => {
    onActiveIndexChangeRef.current = cb;
  }, []);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  return { handlers, registerCallback, seekToTime, togglePlay };
}
