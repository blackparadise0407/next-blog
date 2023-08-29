export const partition = <T>(
  arr: Array<T>,
  fn: (value: T, index: number, self: Array<T>) => boolean
) =>
  arr.reduce<T[][]>(
    (acc, val, i, arr) => {
      acc[fn(val, i, arr) ? 0 : 1].push(val);
      return acc;
    },
    [[], []]
  );
