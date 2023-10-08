"use client";

import React, { useContext } from "react";
import Image from "next/image";
import useSWR from "swr";
import { motion } from "framer-motion";
import Tabs from "./components/Tabs";
import TabPanel from "./components/TabPanel";
import Loading from "./components/Loading";
import {
  animatePresence,
  profileContainer,
  textVariants,
} from "./utils/animationUtils";
import DataContext from "./store/DataContext";

// A fetcher function to wrap the native fetch function
// and return the result of a call to url in json format
const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/profile", fetcher);

  const { setTimeEntriesData } = useContext(DataContext);

  if (error) {
    return (
      <main>
        <p>Failed to load</p>
      </main>
    );
  }

  if (!data) return <Loading />;

  setTimeEntriesData(data.timeEntries);

  const {
    title,
    reportText,
    reportFor,
    timeFrames,
  } = data.uiText;

  return (
    <main>
      <h1 className="sr-only">{title}</h1>

      <div className="grid max-w-[69.375rem] gap-[1.875rem] lg:grid-cols-[0.9273fr_3fr]">
        <motion.div
          className="rounded-2xl bg-dark-blue"
          initial="hidden"
          animate="visible"
          variants={animatePresence}
        >
          <motion.div
            className="lg:profile flex min-h-[7rem] flex-row items-center gap-5 rounded-2xl bg-blue p-6 lg:flex-col lg:items-start origin-top lg:gap-[2.375rem]"
            initial="hidden"
            animate="visible"
            variants={profileContainer}
          >
            <motion.div variants={textVariants}>
              <Image
                src="/images/image-jeremy.png"
                alt="Jeremy Robson"
                width={84}
                height={84}
                className="w-16 rounded-full border-[0.1875rem] border-white lg:w-[5.25rem]"
                priority
              />
            </motion.div>

            <motion.p
              className="lg:name-padding flex flex-col text-[0.9375rem] text-pale-blue"
              variants={textVariants}
            >
              {reportText}
              <span className="clamp-title font-title font-rubik font-light text-white">
                {reportFor}
              </span>
            </motion.p>
          </motion.div>

          <Tabs timeFrames={timeFrames} />
        </motion.div>
        <div className="h-full">
          {timeFrames.map((mode: string, index: number) => (
            <TabPanel key={mode} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
