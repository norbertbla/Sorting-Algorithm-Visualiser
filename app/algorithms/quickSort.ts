import { Animation } from '../types';

const quickSort = (array: number[]): {
  sortedArray: number[];
  animations: Animation[];
} => {
  const animations: Animation[] = [];

  const partition = (arr: number[], low: number, high: number): number => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      animations.push({ type: 'comparison', values: [j, high] });
      if (arr[j] < pivot) {
        i++;
        animations.push({ type: 'swap', values: [i, j] });
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    animations.push({ type: 'swap', values: [i + 1, high] });
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    return i + 1;
  };

  const quickSortRecursive = (arr: number[], low: number, high: number) => {
    if (low < high) {
      const pivotIndex = partition(arr, low, high);
      quickSortRecursive(arr, low, pivotIndex - 1);
      quickSortRecursive(arr, pivotIndex + 1, high);
    }
  };

  quickSortRecursive(array, 0, array.length - 1);

  console.log('quickSort', animations);
  return { sortedArray: array, animations };
};

export default quickSort;
