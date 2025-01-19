function rangeIterator(begin, end, values) {
  begin = Math.trunc(begin);
  end = Math.trunc(end);
  let i = begin, d = begin <= end ? 1 : -1;
  return {
    next() {
      if (i == end) {
        return { done: true };
      }
      else {
        let value = values ? values[i] : i;
        i += d;
        return { value, done: false };
      }
    }
  }
}

function range(begin, end, values) {
  return {
    [Symbol.iterator]() {
      return rangeIterator(begin, end, values);
    },

    map(fn) {
      let itr = rangeIterator(begin, end, values), idx = 0;
      let result = itr.next();
      while (!result.done) {
        fn(result.value, idx);
        result = itr.next();
        ++idx;
      }
    }
  }
}

