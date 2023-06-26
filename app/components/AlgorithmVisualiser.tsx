'use client';

import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import VisualisationWindow from './VisualisationWindow';
import ControlBar from './Controlbar';
// import useActiveMediaQuery from '../hooks/useActiveMediaQuery';

const AlgorithmVisualiser = () => {
  const defaultDataArrayData: number[] = [4, 14, 16, 15, 3, 11, 7, 12, 5, 4, 10, 2, 2, 6, 13, 9];
  const [dataArray, setDataArray] = useState<number[]>(defaultDataArrayData);
  const [progress, setProgress] = useState<number>(0);
  const [barsThatWereSwapped, setBarsThatWereSwapped] = useState<[number, number] | undefined>(undefined);
  const [barsThatWereCompared, setBarsThatWereCompared] = useState<[number, number] | undefined>(undefined);
  const [barHeights, setBarHeights] = useState<number[]>([]);
  // const activeMediaQuery = useActiveMediaQuery({
  //   sm: '(min-width: 640px)',
  //   md: '(min-width: 768px)',
  //   lg: '(min-width: 1024px)',
  //   xl: '(min-width: 1280px)',
  //   xxl: '(min-width: 1536px)',
  // });

  useEffect(() => {
    const getNormalizedBarHeights = (dataArray: number[]): number[] => {
      const MIN_HEIGHT = 2;
      const MAX_HEIGHT = 17;
      const min = Math.min(...dataArray);
      const max = Math.max(...dataArray);
      const range = max - min;
      const normalizedArray = dataArray.map(value => MIN_HEIGHT + (MAX_HEIGHT - MIN_HEIGHT) * ((value - min) / range));
      return normalizedArray.map(value => Math.min(Math.max(value, MIN_HEIGHT), MAX_HEIGHT));
    };

    setBarHeights(getNormalizedBarHeights(dataArray));
  }, [dataArray]);

  return (
    <>
      {/* <div className="text-lg font-semibold absolute right-0 top-0 m-7 p-3 bg-accent text-white rounded-md">
        {activeMediaQuery ?? '<sm'}
      </div> */}
      <div className="relative flex lg:w-[55rem] w-full mr-2 ml-2 flex-col">
        <ToastContainer limit={1} className='h-0'/>
        <VisualisationWindow
          barHeights={barHeights}
          progress={progress}
          swappedBars={barsThatWereSwapped}
          comparedBars={barsThatWereCompared}
        />
        <ControlBar
          setDataArray={setDataArray}
          dataArray={dataArray}
          setBarsThatWereCompared={setBarsThatWereCompared}
          setBarsThatWereSwapped={setBarsThatWereSwapped}
          setProgress={setProgress}
          defaultDataArray={defaultDataArrayData}
        />
      </div>
    </>
  );
};

export default AlgorithmVisualiser;
