import qs from "qs";

const baseUrl = process.env.API_BASE_URL || "http://localhost:4005/api";

export function createUrl(url, params) {
  const fullUrl = `${baseUrl}${url}`;
  const queryString = params && qs.stringify(params);

  return queryString ? `${fullUrl}?${queryString}` : fullUrl;
}

export function createPinkSaleTableUrl() {
  return createUrl(`/table`);
}

export function createPinkSaleChartUrl(tokenName) {
  return createUrl(`/chart`, { tokenName });
}

export function createMostVisitedTableUrl() {
  return createUrl(`/mostvisited/table`);
}

export function createMostVisitedChartUrl(name) {
  return createUrl(`/mostvisited/chart`, { name });
}

export function createTopSearchTableUrl() {
  return createUrl(`/topsearch/table`);
}

export function createTopSearchChartUrl(name) {
  return createUrl(`/topsearch/chart`, { name });
}
