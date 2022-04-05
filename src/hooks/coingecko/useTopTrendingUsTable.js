import useSWR from "swr";

import api from "../../lib/api";

function usePinksaleTable() {
  const { data, error } = useSWR(api.createCgTopTrendingUsTableUrl(), api.get, {
    refreshInterval: 10000,
  });

  return { error, data: data || {}, isLoading: !error && !data };
}

export default usePinksaleTable;
