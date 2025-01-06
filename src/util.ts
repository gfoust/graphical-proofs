
export type Maybe<T> = T | undefined;

export function range(start: number, end: number) {
  return Array.from({ length: end - start }, (_, i) => start + i);
}
