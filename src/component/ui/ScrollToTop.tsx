import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { animateScroll as scroll } from "react-scroll";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const percent = (scrollTop / docHeight) * 100;

      setProgress(percent);
      setVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollTop = () => {
    scroll.scrollToTop({
      duration: 600,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={handleScrollTop}
          initial={{ opacity: 0, scale: 0.6, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 40 }}
          transition={{ duration: 0.25 }}
          className="
            fixed
            bottom-8
            right-8
            z-50
            w-14
            h-14
            flex
            items-center
            justify-center
          "
        >
          <div className="absolute w-14 h-14">
            <CircularProgressbar
              value={progress}
              styles={{
                path: {
                  stroke: "#6366F1", // indigo-500
                  strokeLinecap: "round",
                },
                trail: {
                  stroke: "rgba(99,102,241,0.15)", // subtle indigo
                },
              }}
            />
          </div>

          <div
            className="
    relative
    flex
    items-center
    justify-center
    w-10
    h-10
    rounded-full
    bg-gradient-to-r from-indigo-500 to-purple-500
    text-white
    shadow-lg
    hover:scale-105
    transition
  "
          >
            <ChevronUp size={18} />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
