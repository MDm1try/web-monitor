import useSWR from "swr";

import api from "../../lib/api";

function usePinksaleTable() {
  const { data, error } = useSWR(api.createCmcTopSearchTableUrl(), api.get, {
    refreshInterval: 10000,
  });

  return { error, data: data || { expectedUpdate: 5 * 60 }, isLoading: !error && !data };
}

export default usePinksaleTable;
