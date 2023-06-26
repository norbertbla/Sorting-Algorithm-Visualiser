import { Animation } from '../types';

const insertionSort = (array: number[]): {
  sortedArray: number[];
  animations: Animation[];
} => {
  const n = array.length;
  const animations: Animation[] = [];

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    animations.push({ type: 'comparison', values: [i, j] });

    while (j >= 0 && array[j] > key) {
      animations.push({ type: 'swap', values: [j, j + 1] });

      array[j + 1] = array[j];
      j--;

      if (j >= 0) {
        animations.push({ type: 'comparison', values: [i, j] });
      }
    }

    array[j + 1] = key;
  }

  console.log('insertionSort', animations);
  return { sortedArray: array, animations };
};

export default insertionSort;
