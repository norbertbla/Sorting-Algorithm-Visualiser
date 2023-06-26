import { Animation } from '../types';

const bubbleSort = (
  array: number[]
): {
  sortedArray: number[];
  animations: Animation[];
} => {
  const n = array.length;
  const animations: Animation[] = [];
  for (let i = 0; i < n - 1; i++) {
    let isSwapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      animations.push({ type: 'comparison', values: [j, j + 1] });
      if (array[j] > array[j + 1]) {
        animations.push({ type: 'swap', values: [j, j + 1] });
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        isSwapped = true;
      }
    }
    if (!isSwapped) {
      break;
    }
  }
  console.log('bubbleSort', animations);
  return { sortedArray: array, animations };
};

export default bubbleSort;
