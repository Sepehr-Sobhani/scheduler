import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [history, setHistory] = useState([initialMode]);
  const [mode, setMode] = useState(initialMode);

  const transition = (newMode, replace = false) => {
    replace
      ? setHistory((prev) => [...prev.slice(0, -1), newMode])
      : setHistory((prev) => [...prev, newMode]);
    setMode(newMode);
  };

  const back = () => {
    if (history.length < 2) {
      return;
    }
    setMode(history.slice(-2)[0]);
    setHistory((prev) => [...prev.slice(0, -1)]);
  };

  return { mode, transition, back };
}
