import qs from "qs";

const baseUrl = process.env.API_BASE_URL || "http://localhost:4005/api";

export function createUrl(url, params) {
  const fullUrl = `${baseUrl}${url}`;
  const queryString = params && qs.stringify(params);

  return queryString ? `${fullUrl}?${queryString}` : fullUrl;
}

// pinksale
export function createPinkSaleTableUrl() {
  return createUrl(`/pinksale/table`);
}

export function createPinkSaleChartUrl(tokenName) {
  return createUrl(`/pinksale/chart`, { tokenName });
}

// cmc
export function createCmcMostVisitedTableUrl() {
  return createUrl(`/coinmarketcap/mostvisited/table`);
}

export function createCmcMostVisitedChartUrl(name) {
  return createUrl(`/coinmarketcap/mostvisited/chart`, { name });
}

export function createCmcTopSearchTableUrl() {
  return createUrl(`/coinmarketcap/topsearch/table`);
}

export function createCmcTopSearchChartUrl(name) {
  return createUrl(`/coinmarketcap/topsearch/chart`, { name });
}

// coingecko
export function createCgTopTrendingUkTableUrl() {
  return createUrl(`/coingecko/topTrendingUk/table`);
}

export function createCgTopTrendingUkChartUrl(name) {
  return createUrl(`/coingecko/topTrendingUk/chart`, { name });
}

export function createCgTopTrendingUsTableUrl() {
  return createUrl(`/coingecko/topTrendingUS/table`);
}

export function createCgTopTrendingUsChartUrl(name) {
  return createUrl(`/coingecko/topTrendingUS/chart`, { name });
}

export function createCgTrendingSearchTableUrl() {
  return createUrl(`/coingecko/trendingSearch/table`);
}

export function createCgTrendingSearchChartUrl(name) {
  return createUrl(`/coingecko/trendingSearch/chart`, { name });
}
