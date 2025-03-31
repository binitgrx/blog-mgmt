import { useEffect, useState } from "react";

const useDebounce = (searchValue, delay = 500) => {
  const [debounceValue, setdebounceValue] = useState(searchValue);

  useEffect(() => {
    const timer = setTimeout(() => setdebounceValue(searchValue), delay);
    return () => clearTimeout(timer);
  }, [searchValue, delay]);

  return debounceValue;
};
export default useDebounce;
