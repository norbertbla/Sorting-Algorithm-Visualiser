export type Animation = {
  type: 'swap' | 'comparison';
  values: [number, number] | null;
};

export type SortingAlghorithmData = {
  name: string;
  algorithm: (array: number[]) => {
    sortedArray: number[];
    animations: Animation[];
  };
}

export type MediaQuery = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | undefined;