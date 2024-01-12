import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useFilters = () => {
  const [filters, setFilters] = useState<
    { queryKey: string; values: string[] }[]
  >([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    for (let key of searchParams.keys()) {
      console.log(key);
    }
  }, []);

  return {
    filters,
  };
};

export default useFilters;
