import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

type Props = {
  targetId: string;
};

export const ScrollDownButton = (props: Props) => {
  const { targetId } = props;
  const [visible, setVisible] = useState(true);

  const handleScrollClick = () => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const y = el.getBoundingClientRect().top + window.scrollY + 350; 

    window.scrollTo({
      top: y,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY < 80);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={handleScrollClick}
      aria-label="Scroll to next section"
      className={`
        absolute bottom-10 left-1/2 -translate-x-1/2 
        flex flex-col items-center gap-2 
        text-gray-600 dark:text-white/80
        drop-shadow-[0_0_10px_rgba(99,102,241,0.7)]
        transition-all duration-300
        hover:scale-110
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }
      `}
    >
      {/* arrow */}
      <ArrowDown className="w-6 h-6 animate-bounce" />
    </button>
  );
};
