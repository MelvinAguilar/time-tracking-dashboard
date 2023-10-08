/* eslint-disable jsx-a11y/no-redundant-roles */
import React, {
  useRef,
  useState,
  useCallback,
  useContext,
} from "react";
import { AnimatePresence } from "framer-motion";
import useClickOutside from "../hooks/useClickOutside";
import Card from "./Card";
import useKeyPress from "../hooks/useKeyPress";
import { Activity } from "../types/Common";
import DataContext from "../store/DataContext";

interface TabPanelProps {
  index: number;
}

const getModeFromNumber = (index: number) => {
  switch (index) {
    case 0:
      return "daily";
    case 1:
      return "weekly";
    case 2:
      return "monthly";
    default:
      return "daily";
  }
};

const TabPanel: React.FC<TabPanelProps> = function TabPanel({ index }) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const { timeEntriesData: data, activeTab } = useContext(DataContext);

  const tooltipRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const buttonRefs = useRef<React.RefObject<HTMLButtonElement>[]>([]);

  const registerRef = useCallback(
    (
      tooltipRef: React.RefObject<HTMLDivElement>,
      buttonRef: React.RefObject<HTMLButtonElement>,
      indexRef: number,
    ) => {
      tooltipRefs.current[indexRef] = tooltipRef;
      buttonRefs.current[indexRef] = buttonRef;
    },
    [],
  );

  useClickOutside([...tooltipRefs.current, ...buttonRefs.current], () => {
    if (activeTab === index) setActiveCard(null);
  });

  useKeyPress("Escape", () => {
    if (activeTab === index) setActiveCard(null);
  });

  if (!data) return null;

  return (
    <div
      role="tabpanel"
      id={`tab-panel-${index}`}
      aria-labelledby={`tab-button-${index}`}
      hidden={activeTab !== index}
      tabIndex={activeTab === index ? 0 : -1}
      className="h-full"
    >
      <ul
        role="list"
        className="grid h-full gap-[1.875rem] sm:grid-cols-2 md:grid-cols-3"
      >
        <AnimatePresence>
          {data.map((item: Activity, indexMap: number) => (
            <li role="listitem" key={item.id}>
              <Card
                index={indexMap}
                mode={getModeFromNumber(index)}
                active={indexMap === activeCard}
                setActive={setActiveCard}
                registerRef={registerRef}
              />
            </li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default TabPanel;
