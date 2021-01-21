import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [history, setHistory] = useState([initialMode]);
  const [mode, setMode] = useState(initialMode);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    replace
      ? setHistory([...history.slice(0, -1), newMode])
      : setHistory([...history, newMode]);
  };

  const back = () => {
    if (history.length < 2) {
      return;
    }
    setHistory((prev) => prev.slice(0, -1));
    setMode(history.slice(-2)[0]);
  };

  return { mode, transition, back };
}
