import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  animatePresence,
  loadingContainerVariants,
  loadingDotVariants,
} from "../utils/animationUtils";

const loading = () => (
  <AnimatePresence>
    <motion.div initial="hidden" animate="visible" variants={animatePresence}>
      <motion.div
        className="flex items-center justify-center gap-6"
        initial="hidden"
        animate="animate"
        exit="exit"
        variants={loadingContainerVariants}
      >
        <p className="sr-only">Loading...</p>
        {[...Array(3)].map((item) => (
          <motion.span
            key={item}
            aria-hidden="true"
            className="block h-6 w-6 rounded-full bg-blue"
            variants={loadingDotVariants}
          />
        ))}
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

export default loading;
