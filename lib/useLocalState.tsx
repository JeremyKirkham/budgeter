import { useState } from "react";

export const useLocalState = <T,>(
  key: string,
  initalValue?: any
): [T, (_arg: T) => void] => {
  const [localVal, _setLocalVal] = useState<T>(
    localStorage.getItem(key)
      ? (JSON.parse(localStorage.getItem(key)!) as T)
      : initalValue!
  );

  const setLocalVal = (val: T) => {
    localStorage.setItem(key, JSON.stringify(val));
    _setLocalVal(val);
  };

  return [localVal, setLocalVal];
};
