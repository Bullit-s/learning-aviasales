import { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";

export const useDebounceValue = <T>(
  value: T,
  delay = 750,
  initialValue?: T
) => {
  const [current, setCurrent] = useState<T>(value);
  const previousValue = useRef(value);

  const debouncedSetValue = useMemo(
    () => debounce(() => setCurrent(value), delay),
    [delay, value]
  );

  useEffect(() => {
    if (value !== previousValue.current) {
      debouncedSetValue();
      previousValue.current = value;
      return debouncedSetValue.cancel;
    }
  }, [debouncedSetValue, value]);

  return current || initialValue;
};
