import { useQuery } from "@tanstack/react-query";
import { getHealth } from "../api/health";
import { healthKeys } from "../constants/query-keys";

export function useHealth() {
  return useQuery({ queryKey: healthKeys.status, queryFn: getHealth });
}
