import React, {
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import Image from "next/image";
import StatisticCard from "./StatisticCard";
import Tooltip from "./Tooltip";
import DataContext from "../store/DataContext";

interface CardProps {
  index: number;
  mode: "daily" | "weekly" | "monthly";
  active: boolean;
  setActive: (id: number | null) => void;
  registerRef: (
    ref: React.RefObject<HTMLDivElement>,
    buttonRef: React.RefObject<HTMLButtonElement>,
    index: number
  ) => void;
}

const Card: React.FC<CardProps> = function Card({
  index,
  mode,
  active,
  setActive,
  registerRef,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { timeEntriesData: data } = useContext(DataContext);
  const { title, timeframes } = data[index];
  const { current, previous } = timeframes[mode];

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
    setActive(active ? null : index);
  };

  useEffect(() => {
    if (!active) setIsExpanded(false);
  }, [active]);

  useEffect(() => {
    registerRef(tooltipRef, buttonRef, index);
  }, [registerRef, tooltipRef, buttonRef, index]);

  return (
    <StatisticCard title={title} current={current} previous={previous}>
      <button
        type="button"
        aria-label="More options"
        aria-haspopup="true"
        aria-expanded={active && isExpanded}
        aria-controls={`tooltip-${mode}-${index}`}
        onClick={togglePanel}
        className="toggle-button hover:filter-white z-20 p-1 transition-all"
        ref={buttonRef}
      >
        <Image src="/images/icon-ellipsis.svg" alt="" width={21} height={5} />
      </button>
      <Tooltip
        tooltipId={`tooltip-${mode}-${index}`}
        textToCopy={`${title} - ${current}hrs - Last Week - ${previous}hrs`}
        ref={tooltipRef}
      />
    </StatisticCard>
  );
};

export default Card;
