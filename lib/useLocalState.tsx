import { useEffect, useState } from "react";

export const useLocalState = <T,>(
  key: string,
  initialValue?: any
): [T, (_arg: T) => void] => {
  const [localVal, _setLocalVal] = useState<T>(initialValue);

  const setLocalVal = (val: T) => {
    localStorage.setItem(key, JSON.stringify(val));
    _setLocalVal(val);
  };

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      _setLocalVal(JSON.parse(saved));
    }
  }, [key]);

  return [localVal, setLocalVal];
};
