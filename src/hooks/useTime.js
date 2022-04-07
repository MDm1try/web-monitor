import { useEffect, useState } from "react";

import useInterval from "./useInterval";

export default function useTime(maxSeconds, duration = 1000) {
  const [seconds, setSeconds] = useState(maxSeconds);

  // useEffect(() => {
  //   setSeconds(maxSeconds)
  // }, [maxSeconds])

  useInterval(() => {
    const s = seconds - 1;
    if (s >= 0) {
      setSeconds(s);
    }
  }, duration);

  return [seconds, setSeconds];
}
