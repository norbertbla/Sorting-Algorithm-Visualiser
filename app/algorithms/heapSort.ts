import { Animation } from '../types';

const heapSort = (array: number[]): {
  sortedArray: number[];
  animations: Animation[];
} => {
  const animations: Animation[] = [];

  const heapify = (arr: number[], n: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      animations.push({ type: 'comparison', values: [i, largest] });
      animations.push({ type: 'swap', values: [i, largest] });

      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      heapify(arr, n, largest);
    }
  };

  const buildHeap = (arr: number[], n: number) => {
    const startIdx = Math.floor(n / 2) - 1;

    for (let i = startIdx; i >= 0; i--) {
      heapify(arr, n, i);
    }
  };

  const heapSortRecursive = (arr: number[], n: number) => {
    buildHeap(arr, n);

    for (let i = n - 1; i > 0; i--) {
      animations.push({ type: 'swap', values: [0, i] });
      [arr[0], arr[i]] = [arr[i], arr[0]];

      heapify(arr, i, 0);
    }
  };

  heapSortRecursive(array, array.length);

  console.log('heapSort', animations);
  return { sortedArray: array, animations };
};

export default heapSort;
