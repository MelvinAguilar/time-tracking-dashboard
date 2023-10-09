"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { Activity } from "../types/Common";

interface DataContextValue {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  timeEntriesData: Activity[];
  setTimeEntriesData: Dispatch<SetStateAction<Activity[]>>;
}

const DataContext = createContext<DataContextValue>({
  activeTab: 0,
  setActiveTab: () => {},
  timeEntriesData: [],
  setTimeEntriesData: () => {},
});

interface DataContextProviderProps {
  children: React.ReactNode | Array<React.ReactNode>;
}

export const DataContextProvider = function DataContextProvider({
  children,
}: DataContextProviderProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [timeEntriesData, setTimeEntriesData] = useState<Activity[]>([]);

  const memoizedValue = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      timeEntriesData,
      setTimeEntriesData,
    }),
    [activeTab, setActiveTab, timeEntriesData, setTimeEntriesData],
  );

  return (
    <DataContext.Provider value={memoizedValue}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
