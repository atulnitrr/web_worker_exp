const fib = (number) => {
  if (typeof number !== "number") {
    return "NaN";
  }

  if (number < 2) {
    return number;
  }
  return fib(number - 1) + fib(number - 2);
};

onmessage = (e) => {
  const { num } = e.data;
  const startTime = new Date().getTime();
  const fibNum = fib(Number.parseInt(num));
  // const fibNum = 13;

  postMessage({
    numth: num,
    fibNum,
    time: new Date().getTime() - startTime,
    id: Date.now(),
  });
};
