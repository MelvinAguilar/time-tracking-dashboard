import { motion } from "framer-motion";
import React, { ReactNode, useState } from "react";
import {
  animatePresence,
  staggerContainer,
  textVariants,
} from "../utils/animationUtils";

interface StatisticCardProps {
  title: string;
  current: number;
  previous: number;
  children: ReactNode;
}

const classMap: { [key: string]: string } = {
  Work: "bg-light-red bg-work",
  Play: "bg-soft-blue bg-play",
  Study: "bg-light-red-aux bg-study",
  Exercise: "bg-lime-green bg-exercise",
  Social: "bg-violet bg-social",
  "Self Care": "bg-soft-orange bg-self-care",
};

const StatisticCard: React.FC<StatisticCardProps> = function StatisticCard({
  title,
  current,
  previous,
  children,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const cardClass = `min-h-[15.25rem] icon-bg relative flex justify-end flex-col h-full rounded-2xl transition-all ${
    classMap[title] || classMap.Play
  } ${isHovered ? "pt-[2.5rem]" : "pt-[2.8125rem]"}`;

  return (
    <motion.div
      className={cardClass}
      initial="hidden"
      animate="visible"
      variants={animatePresence}
    >
      <motion.div
        className="origin-bottom lg:p-card relative h-full rounded-2xl bg-dark-blue p-8 transition-all hover:bg-light-blue"
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div
          className="flex items-center justify-between"
          variants={textVariants}
        >
          <h2 className="mt-[0.1875rem] font-medium">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" className="card-link">
              <span className="sr-only">Details for </span>
              {title}
            </a>
          </h2>
          <div className="relative flex">{children}</div>
        </motion.div>

        <motion.p
          className="font-hours lg:p-card-hours font-light leading-[4.125rem]"
          variants={textVariants}
        >
          {current}
          hrs
        </motion.p>
        <motion.p
          className="text-[0.9375rem] text-pale-blue"
          variants={textVariants}
        >
          Last Week -
          {` ${previous}`}
          hrs
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default StatisticCard;
