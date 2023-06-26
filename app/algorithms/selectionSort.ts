import { Animation } from '../types';

const selectionSort = (
  array: number[]
): {
  sortedArray: number[];
  animations: Animation[];
} => {
  const n = array.length;
  const animations: Animation[] = [];
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      animations.push({ type: 'comparison', values: [minIndex, j] });
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      animations.push({ type: 'swap', values: [i, minIndex] });
      const temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
    }
  }
  return { sortedArray: array, animations};
};

export default selectionSort;
