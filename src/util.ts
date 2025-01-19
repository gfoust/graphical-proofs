
export type Maybe<T> = T | undefined;

export function rangeIterator<T>(begin: number, end: number, values?: T[]): Iterator<number|T> {
  begin = Math.trunc(begin);
  end = Math.trunc(end);
  let i = begin, d = begin <= end ? 1 : -1;
  return {
    next() {
      if (i == end) {
        return { done: true } as IteratorReturnResult<number|T>;
      }
      else {
        let value = values ? values[i] : i;
        i += d;
        return { value, done: false };
      }
    }
  }
}

export interface Mapable<T> {
  [Symbol.iterator](): Iterator<T>;
  map<U>(fn: (value: T, index?: number) => U): U[];
}


export function range(begin: number, end: number): Mapable<number>;
export function range<T>(begin: number, end: number, values: T[]): Mapable<T>;
export function range<T>(begin: number, end: number, values?: T[]): Mapable<number|T> {
  return {
    [Symbol.iterator]() {
      return rangeIterator(begin, end, values);
    },

    map<U>(fn: (value: T|number, index?: number) => U) {
      let itr = rangeIterator(begin, end, values), idx = 0;
      let iteration = itr.next();
      let results: U[] = [];
      while (!iteration.done) {
        results.push(fn(iteration.value, idx));
        iteration = itr.next();
        ++idx;
      }
      return results;
    }
  }
}
