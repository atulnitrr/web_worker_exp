import React from "react";
import { useState } from "react";

function Dummy() {
  const [num, setNum] = useState(0);

  const [res, setRes] = useState([]);

  const runWorker = (num) => {
    const worker = new window.Worker("./fib_worker.js");

    worker.postMessage({ num });
    worker.onerror = (error) => {
      console.log(error);
    };
    worker.onmessage = (response) => {
      setRes((prev) => [response.data, ...prev]);
      worker.terminate();
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runWorker(num);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
        <button type="submit">Calculate</button>
        <button type="reset">Reset</button>
      </form>

      <div>
        {res.map((single) => {
          const { id, time, fibNum, numth } = single;
          return (
            <div key={id}>
              <p>
                {numth} : {fibNum} <em>{time}</em>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dummy;
