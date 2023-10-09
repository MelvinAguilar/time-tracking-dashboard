import React, { useContext, useRef } from "react";

import { motion } from "framer-motion";
import DataContext from "../store/DataContext";
import { simpleContainer, textVariants } from "../utils/animationUtils";

interface TabsProps {
  timeFrames: string[];
}

const Tabs: React.FC<TabsProps> = function Tabs({ timeFrames }) {
  const { activeTab, setActiveTab } = useContext(DataContext);
  const tabButtonsRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let dir = null;

    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      dir = index - 1;
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      dir = index + 1;
    }

    if (dir !== null) {
      e.preventDefault();
      if (dir >= 0 && dir < timeFrames.length) {
        setActiveTab(dir); // Switch to the adjacent tab

        const newTabButton = tabButtonsRefs.current[dir];
        if (newTabButton) {
          newTabButton.focus(); // Focus the new tab button
        }
      }
    }
  };

  return (
    <motion.ul
      role="tablist"
      aria-label="Time tracking tabs"
      className="flex justify-around lg:flex-col"
      initial="hidden"
      animate="visible"
      variants={simpleContainer}
    >
      {timeFrames.map((timeFrame: string, index: number) => (
        <motion.li
          key={timeFrame}
          role="presentation"
          className="w-full"
          variants={textVariants}
        >
          <button
            ref={(el) => {
              tabButtonsRefs.current[index] = el;
            }}
            type="button"
            id={`tab-button-${index}`}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tab-panel-${index}`}
            tabIndex={activeTab === index ? 0 : -1}
            className="tab-button | lg:tab-button-padding w-full py-6 leading-[21px] text-desaturated-blue hover:text-very-soft-blue"
            onClick={() => setActiveTab(index)}
            onKeyDown={(e) => handleTabKeyDown(e, index)}
          >
            {timeFrame}
          </button>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default Tabs;
