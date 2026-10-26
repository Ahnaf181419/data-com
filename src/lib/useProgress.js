import { useEffect, useState } from 'react';

// Per-device progress: last module/mode, best quiz scores, cards marked known.
const KEY = 'cse2211-progress';

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? {};
  } catch {
    return {};
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(load);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress));
    } catch {
      // private mode or blocked storage: progress just won't persist
    }
  }, [progress]);
  const update = (patch) => setProgress((p) => ({ ...p, ...(typeof patch === 'function' ? patch(p) : patch) }));
  return [progress, update];
}
