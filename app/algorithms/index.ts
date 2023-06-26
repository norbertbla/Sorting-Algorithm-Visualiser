import { SortingAlghorithmData } from '../types';
import bubbleSort from './bubbleSort';
import heapSort from './heapSort';
import quickSort from './quickSort';
import insertionSort from './insertionSort';
import selectionSort from './selectionSort';

type SortingAlgorithms = {
  [index: number]: SortingAlghorithmData;
};

export const sortingAlgorithms: SortingAlgorithms = {
  0: { name: 'Bubble Sort', algorithm: bubbleSort },
  1: { name: 'Selection Sort', algorithm: selectionSort },
  2: { name: 'Insertion Sort', algorithm: insertionSort },
  3: { name: 'Heap Sort', algorithm: heapSort },
  4: { name: 'Quick Sort', algorithm: quickSort },
};
