'use client';

import { ChangeEvent, useState, KeyboardEventHandler, useEffect, useRef, useCallback } from 'react';
import riseErrorToast from './ErrorToast';
import { sortingAlgorithms } from '../algorithms';

interface NavbarProps {
  setDataArray: (dataArray: number[]) => void;
  dataArray: number[];
  setBarsThatWereCompared: (barsThatWereCompared: [number, number] | undefined) => void;
  setBarsThatWereSwapped: (barsThatWereSwapped: [number, number] | undefined) => void;
  setProgress: (progress: number) => void;
  defaultDataArray: number[];
}

const Controlbar = ({
  setDataArray,
  dataArray,
  setBarsThatWereCompared,
  setBarsThatWereSwapped,
  setProgress,
  defaultDataArray,
}: NavbarProps) => {
  const [sortingAlgorithmIndex, setSortingAlgorithmIndex] = useState<number>(0);
  const [isAnimationRunning, setIsAnimationRunning] = useState<boolean>(false);
  const animationRef = useRef<number | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  const getScaledDelay = (arrayLength: number): number => {
    const delayRange = { min: 1, max: 500 };
    const maxLength = 60;
    const length = Math.min(arrayLength, maxLength);
    const delay = Math.round(((delayRange.min - delayRange.max) / (maxLength - 1)) * (length - 1) + delayRange.max);
    return delay / 2;
  };

  const getShuffledDataArray = useCallback(
    (dataArray: number[]): number[] => {
      setBarsThatWereSwapped(undefined);
      setBarsThatWereCompared(undefined);
      const dataArrayCopy = [...dataArray];
      for (let i = dataArrayCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dataArrayCopy[i], dataArrayCopy[j]] = [dataArrayCopy[j], dataArrayCopy[i]];
      }
      return dataArrayCopy;
    },
    [setBarsThatWereSwapped, setBarsThatWereCompared]
  );

  const cleanUpAfterAnimation = () => {
    setBarsThatWereCompared(undefined);
    setBarsThatWereSwapped(undefined);
  };

  const animateSorting = (dataArray: number[], sortingAlgorithmIndex: number, frameRate: number) => {
    const dataArrayCopy = [...dataArray];

    const animations = sortingAlgorithms[sortingAlgorithmIndex].algorithm(dataArrayCopy).animations;
    let currentIndex = 0;
    let previousTimestamp = 0;

    const animate = (timestamp: number) => {
      const elapsed = timestamp - previousTimestamp;

      if (elapsed >= frameRate && isAnimationRunning) {
        const animation = animations[currentIndex];

        if (animation.type === 'swap' && animation.values) {
          const [index1, index2] = animation.values;
          [dataArray[index1], dataArray[index2]] = [dataArray[index2], dataArray[index1]];
          setDataArray([...dataArray]);
          setBarsThatWereSwapped([index1, index2]);
        } else if (animation.type === 'comparison' && animation.values) {
          const [index1, index2] = animation.values;
          setBarsThatWereCompared([index1, index2]);
        }

        currentIndex++;
        previousTimestamp = timestamp;
      }

      if (currentIndex < animations.length && isAnimationRunning) {
        animationRef.current = requestAnimationFrame(animate);
        setProgress(Math.round((currentIndex / animations.length) * 100));
      } else {
        cleanUpAfterAnimation();
        setIsAnimationRunning(false);
        animationRef.current = undefined;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };
  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = undefined;
    }
  }, []);

  const handleResetdataArray = useCallback(() => {
    setDataArray([...defaultDataArray]);
    setProgress(0);
  }, [setDataArray, defaultDataArray, setProgress]);

  const parseInput = useCallback(
    (input: string) => {
      const separators = input.match(/[^0-9,]/g);
      if (separators?.length === 0) {
        riseErrorToast('Failed to parse input. Please use only numbers and commas.', handleResetdataArray);
        return defaultDataArray;
      }
      let inputCopy = input.trim();
      const regex = new RegExp(`[${separators?.join('')}]`, 'g');
      inputCopy = inputCopy.replace(regex, ',');
      if (inputCopy.endsWith(',')) {
        inputCopy = inputCopy.slice(0, -1);
      }
      const parsedInputValue = inputCopy
        .split(',')
        .map(value => parseInt(value.trim()))
        .filter(value => !isNaN(value));
      return parsedInputValue;
    },
    [handleResetdataArray, defaultDataArray]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => setDataArray([...parseInput(event.target.value)]),
    [setDataArray, parseInput]
  );

  const handleOptionChange = useCallback((event: ChangeEvent<HTMLSelectElement>): void => {
    setSortingAlgorithmIndex(parseInt(event.target.value));
  }, []);

  const handleStop = useCallback((): void => {
    setIsAnimationRunning(false);
    stopAnimation();
    setBarsThatWereCompared(undefined);
    setBarsThatWereSwapped(undefined);
  }, [setIsAnimationRunning, stopAnimation, setBarsThatWereCompared, setBarsThatWereSwapped]);

  const handleRun = useCallback((): void => {
    if (inputRef.current && inputRef.current.value !== '' && dataArray.length < 100) {
      setIsAnimationRunning(true);
      setProgress(0);
    } else {
      if (dataArray.length >= 100) {
        riseErrorToast('Please enter an array with less than 100 elements.', handleResetdataArray);
        handleResetdataArray();
      } else {
        riseErrorToast('Please enter an array.', handleResetdataArray);
      }
    }
  }, [handleResetdataArray, setProgress, dataArray]);

  const handleShuffle = useCallback((): void => {
    if (isAnimationRunning) return;
    const shuffleddataArray = getShuffledDataArray(dataArray);
    setDataArray([...shuffleddataArray]);
    setProgress(0);
  }, [dataArray, isAnimationRunning, setDataArray, setProgress, getShuffledDataArray]);

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    event => {
      if (event.key === 'Enter') {
        const tempDataArray = parseInput(event.currentTarget.value);
        setDataArray([...tempDataArray]);
        event.currentTarget.blur();
      }
    },
    [parseInput, setDataArray]
  );

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = dataArray.join(', ');
  }, [dataArray]);

  useEffect(() => {
    if (isAnimationRunning) {
      const frameRate = getScaledDelay(dataArray.length);
      animateSorting(dataArray, sortingAlgorithmIndex, frameRate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimationRunning]);

  useEffect(() => {
    return () => {
      stopAnimation();
    };
  }, [stopAnimation]);

  return (
    <div className="navbar bg-base-100 mt-5 p-3 rounded-md flex justify-between flex-col sm:flex-row gap-4 sm:gap-8">
      <div className="w-full  sm:w-[70%]">
        <button
          className={!isAnimationRunning ? 'btn self-start w-16 btn-accent' : 'btn  self-start w-16 btn-error'}
          onClick={!isAnimationRunning ? handleRun : handleStop}
        >
          {isAnimationRunning ? 'Stop' : 'Run'}
        </button>
        <button className="btn btn-outline mx-2" onClick={handleShuffle} disabled={isAnimationRunning}>
          Shuffle
        </button>
        <select
          className="select select-accent w-full ml-6 flex-shrink"
          onChange={handleOptionChange}
          disabled={isAnimationRunning}
        >
          {Object.keys(sortingAlgorithms).map((key, index) => (
            <option key={key} value={key}>
              {sortingAlgorithms[index].name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full sm:w-[30%] sm:justify-end">
        <div className="form-control w-full">
          <div className="input-group">
            <input
              type="text"
              placeholder={'x, y, z, ...'}
              className="input input-bordered w-full"
              onBlur={handleBlur}
              disabled={isAnimationRunning}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
            <button
              className="btn btn-square"
              onClick={handleResetdataArray}
              disabled={isAnimationRunning}
              aria-label="Reset array"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="restore">
                <path
                  fill="currentColor"
                  d="M13.25 3c-5.09-.14-9.26 3.94-9.26 9H2.2c-.45 0-.67.54-.35.85l2.79 2.8c.2.2.51.2.71 0l2.79-2.8c.32-.31.09-.85-.35-.85h-1.8c0-3.9 3.18-7.05 7.1-7 3.72.05 6.85 3.18 6.9 6.9.05 3.91-3.1 7.1-7 7.1-1.61 0-3.1-.55-4.28-1.48-.4-.31-.96-.28-1.32.08-.42.43-.39 1.13.08 1.5 1.52 1.19 3.44 1.9 5.52 1.9 5.05 0 9.14-4.17 9-9.26-.13-4.69-4.05-8.61-8.74-8.74zm-.51 5c-.41 0-.75.34-.75.75v3.68c0 .35.19.68.49.86l3.12 1.85c.36.21.82.09 1.03-.26.21-.36.09-.82-.26-1.03l-2.88-1.71v-3.4c0-.4-.33-.74-.75-.74z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controlbar;
