export const debounce = <A extends any[]>(fn: (...agrs: A) => any, ms: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: A) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
};
