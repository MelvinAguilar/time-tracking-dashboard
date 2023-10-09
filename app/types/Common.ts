export type TimeEntry = {
  title: string;
  current: number;
  previous: number;
};

export type Timeframe = {
  current: number;
  previous: number;
};

export type Timeframes = {
  daily: Timeframe;
  weekly: Timeframe;
  monthly: Timeframe;
};

export type Activity = {
  id: string;
  title: string;
  timeframes: Timeframes;
};

export type Dashboard = {
  title: string;
  reportText: string;
  reportFor: string;
  timeFrames: string[];
};
