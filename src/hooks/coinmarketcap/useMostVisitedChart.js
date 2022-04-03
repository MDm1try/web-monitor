import useSWR from "swr";

import api from "../../lib/api";

function usePinkSaleChart(name) {
  const { data, error } = useSWR(api.createMostVisitedChartUrl(name), api.get);

  const defaultValue = {
    chart: { increased: [], decreased: [], all: [] },
    name: "",
    names: [],
  };
  return { error, data: data || defaultValue, isLoading: !error && !data };
}

export default usePinkSaleChart;
