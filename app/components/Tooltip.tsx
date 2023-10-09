import { AnimatePresence, motion } from "framer-motion";
import React, { forwardRef, useState } from "react";
import { loadingContainerVariants } from "../utils/animationUtils";

type TooltipProps = {
  textToCopy: string;
  tooltipId: string;
};

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
  const { tooltipId, textToCopy } = props;

  const [isCopied, setIsCopied] = useState(false);

  // Handler for the copy button click
  const handleCopyClick = () => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        id={tooltipId}
        role="tooltip"
        className="tooltip | invisible absolute left-1/2 -translate-x-1/2 opacity-0 transition-all"
        ref={ref}
        initial="hidden"
        animate="animate"
        exit="exit"
        variants={loadingContainerVariants}
      >
        <button
          type="button"
          className="rounded-2xl bg-very-light-blue px-4 py-2"
          onClick={handleCopyClick}
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </motion.div>
    </AnimatePresence>
  );
});

Tooltip.displayName = "Tooltip";

export default Tooltip;
