const animationDuration = 0.0;
const animationDelay = 0.0;

export const animatePresence = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: animationDuration } },
  exit: { opacity: 0, transition: { duration: animationDuration } },
};

export const staggerContainer = {
  hidden: {
    scaleY: 0,
  },
  visible: {
    scaleY: 1,
    transition: {
      delay: animationDelay,
      duration: animationDuration,
      staggerChildren: 0.2,
      delayChildren: animationDuration + animationDelay,
    },
  },
};

export const profileContainer = {
  hidden: {
    scaleY: 0,
  },
  visible: {
    scaleY: 1,
    transition: {
      delay: animationDelay,
      duration: animationDuration,
      staggerChildren: 0.2,
      delayChildren: animationDuration + animationDelay,
    },
  },
};

export const simpleContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: animationDuration,
    },
  },
};

export const textVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationDuration,
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

export const loadingDotVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
    transition: {
      y: {
        duration: 0.5,
        yoyo: Infinity,
        ease: "easeInOut",
      },
    },
  },
};

export const loadingContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
