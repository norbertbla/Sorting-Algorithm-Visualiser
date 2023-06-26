'use client';

import { useReducer, useEffect, useState } from 'react';
import Bar from './Bar';
import useActiveMediaQuery from '../hooks/useActiveMediaQuery';

interface VisualisationWindowProps {
  barHeights: number[];
  progress: number;
  swappedBars: [number, number] | undefined;
  comparedBars: [number, number] | undefined;
}
type StatisticsState = { comprasions: number; accesses: number };

type StatisticsAction = { type: 'incrementComparisons' } | { type: 'incrementAccesses' } | { type: 'reset' };

const statisticsReducer = (state: StatisticsState, action: StatisticsAction) => {
  switch (action.type) {
    case 'incrementComparisons':
      return { ...state, comprasions: state.comprasions + 1 };
    case 'incrementAccesses':
      return { ...state, accesses: state.accesses + 1 };
    case 'reset':
      return { comprasions: 0, accesses: 0 };
    default:
      throw new Error(`Invalid action type: ${action}`);
  }
};
const VisualisationWindow = ({ barHeights, progress, swappedBars, comparedBars }: VisualisationWindowProps) => {
  const [previousComparedBars, setPreviousComparedBars] = useState<[number, number] | undefined>(undefined);
  const [previousSwappedBars, setPreviousSwappedBars] = useState<[number, number] | undefined>(undefined);
  const activeMediaQuery = useActiveMediaQuery({
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    xxl: '(min-width: 1536px)',
  });
  const [statistics, dispatch] = useReducer(statisticsReducer, {
    comprasions: 0,
    accesses: 0,
  });

  useEffect(() => {
    if (comparedBars && comparedBars != previousComparedBars) dispatch({ type: 'incrementComparisons' });
    if (swappedBars && swappedBars != previousSwappedBars) dispatch({ type: 'incrementAccesses' });
    setPreviousComparedBars(comparedBars);
    setPreviousSwappedBars(swappedBars);
  }, [comparedBars, swappedBars, previousComparedBars, previousSwappedBars]);

  useEffect(() => {
    console.log(progress);
    if (!progress) {
      dispatch({ type: 'reset' });
    }
  }, [progress]);

  return (
    <>
      <div className="mockup-window bg-base-300 border-2 border-base-100 ">
        <div className="absolute text-white right-0 top-16 flex justify-between max-w-max mr-5 font-medium text-sm">
          <span className=" h-8 px-2">{statistics.comprasions} comprasions</span>
          <span className=" h-8 px-2">{statistics.accesses} array accesses</span>
        </div>
        <div className="progress w-56 absolute top-4 right-4 border-2 border-base-200 h-3 flex">
          <div
            className="progress-bar bg-accent h-full transition-width duration-100 ease-in-out"
            style={{ width: `${progress + 5}%` }}
          ></div>
        </div>
        <div className="flex justify-center px-4 py-4 h-[25rem] bg-base-200 items-end ">
          {barHeights.map((height, index) => (
            <Bar
              key={index}
              height={height}
              barCount={barHeights.length}
              isSwaping={swappedBars != null ? index === swappedBars[0] || index === swappedBars[1] : false}
              isComparing={comparedBars != null ? index === comparedBars[0] || index === comparedBars[1] : false}
              activeMediaQuery={activeMediaQuery}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default VisualisationWindow;
