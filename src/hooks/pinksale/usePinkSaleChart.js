import useSWR from "swr";

import api from "../../lib/api";

function usePinkSaleChart(tokenName) {
  const { data, error } = useSWR(api.createPinkSaleChartUrl(tokenName), api.get);

  const defaultValue = {
    chart: { increased: [], decreased: [], all: [] },
    tokenName: "",
    tokenNames: [],
  };
  return { error, data: data || defaultValue, isLoading: !error && !data };
}

export default usePinkSaleChart;
