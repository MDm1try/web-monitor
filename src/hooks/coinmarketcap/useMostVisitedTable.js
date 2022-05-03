import useSWR from "swr";

import api from "../../lib/api";

function usePinksaleTable() {
  const { data, error } = useSWR(api.createCmcMostVisitedTableUrl(), api.get, {
    refreshInterval: 10000,
  });

  return { error, data: data || { expectedUpdate: 0 }, isLoading: !error && !data };
}

export default usePinksaleTable;
