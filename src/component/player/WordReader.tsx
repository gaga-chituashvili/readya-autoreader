import { memo, useEffect, useMemo, useRef } from "react";

type Word = { word: string; start: number; end: number };

const ACTIVE_WORD_CLASS =
  "inline rounded-[4px] px-[3px] py-[1px] mr-[2px] cursor-pointer bg-yellow-300 dark:bg-yellow-400 text-gray-900 font-medium";
const SPOKEN_WORD_CLASS =
  "inline rounded-[4px] px-[3px] py-[1px] mr-[2px] cursor-pointer text-gray-400 dark:text-gray-500";
const UNSPOKEN_WORD_CLASS =
  "inline rounded-[4px] px-[3px] py-[1px] mr-[2px] cursor-pointer text-gray-800 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30";
const ACTIVE_SENTENCE_CLASS =
  "inline bg-yellow-50 dark:bg-yellow-900/20 rounded-[6px] px-[2px]";
const INACTIVE_SENTENCE_CLASS = "inline";

export const WordReader = memo(function WordReader({
  displayWords,
  sentenceIndices,
  registerCallback,
  onWordClick,
}: {
  displayWords: Word[];
  sentenceIndices: number[];
  registerCallback: (cb: (i: number) => void) => void;
  onWordClick: (start: number) => void;
}) {
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sentenceRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const prevActiveRef = useRef(-1);
  const prevSentenceRef = useRef(-1);

  const sentences = useMemo(() => {
    if (!displayWords.length || !sentenceIndices.length) return [];
    const map = new Map<number, number[]>();
    sentenceIndices.forEach((sIdx, wIdx) => {
      if (!map.has(sIdx)) map.set(sIdx, []);
      map.get(sIdx)!.push(wIdx);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a - b);
  }, [displayWords, sentenceIndices]);

  useEffect(() => {
    registerCallback((next: number) => {
      const prev = prevActiveRef.current;

      if (prev >= 0 && wordRefs.current[prev]) {
        wordRefs.current[prev]!.className = SPOKEN_WORD_CLASS;
      }
      if (next > prev) {
        for (let i = Math.max(0, prev + 1); i < next; i++) {
          if (wordRefs.current[i])
            wordRefs.current[i]!.className = SPOKEN_WORD_CLASS;
        }
      }
      if (next >= 0 && wordRefs.current[next]) {
        wordRefs.current[next]!.className = ACTIVE_WORD_CLASS;
        const el = wordRefs.current[next]!;
        const container = el.closest(".overflow-y-auto");
        if (container) {
          const elRect = el.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const isVisible =
            elRect.top >= containerRect.top &&
            elRect.bottom <= containerRect.bottom;
          if (!isVisible) {
            container.scrollTo({
              top:
                container.scrollTop +
                (elRect.top - containerRect.top) -
                containerRect.height / 2 +
                elRect.height / 2,
              behavior: "instant",
            });
          }
        }
      }
      if (next === -1) {
        wordRefs.current.forEach((s) => {
          if (s) s.className = UNSPOKEN_WORD_CLASS;
        });
      }
      prevActiveRef.current = next;

      const currentSentence = next >= 0 ? (sentenceIndices[next] ?? -1) : -1;
      const prevSentence = prevSentenceRef.current;
      if (currentSentence !== prevSentence) {
        if (prevSentence >= 0 && sentenceRefs.current[prevSentence]) {
          sentenceRefs.current[prevSentence]!.className =
            INACTIVE_SENTENCE_CLASS;
        }
        if (currentSentence >= 0 && sentenceRefs.current[currentSentence]) {
          sentenceRefs.current[currentSentence]!.className =
            ACTIVE_SENTENCE_CLASS;
        }
        prevSentenceRef.current = currentSentence;
      }
    });
  }, [registerCallback, sentenceIndices]);

  return (
    <div className="font-serif text-[17px] leading-[2.2] select-none">
      {sentences.map(([sIdx, wordIndices]) => (
        <span
          key={sIdx}
          ref={(el) => {
            sentenceRefs.current[sIdx] = el;
          }}
          className={INACTIVE_SENTENCE_CLASS}
        >
          {wordIndices.map((wIdx) => {
            const w = displayWords[wIdx];
            if (!w) return null;
            return (
              <span key={wIdx}>
                <span
                  ref={(el) => {
                    wordRefs.current[wIdx] = el;
                  }}
                  onClick={() => onWordClick(w.start)}
                  className={UNSPOKEN_WORD_CLASS}
                >
                  {w.word}
                </span>{" "}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
});
