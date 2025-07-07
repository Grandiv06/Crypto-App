const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = "CG-gttsCxYKX3zKyj5S48hpBFmG";
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=1&x_cg_demo_api_key=CG-gttsCxYKX3zKyj5S48hpBFmG

const getCoinList = (page, currency) => {
  return `${BASE_URL}/coins/markets?vs_currency=${currency}&per_page=20&page=${page}&x_cg_demo_api_key=${API_KEY}`;
};

const searchCoin = (query) => {
  return `${BASE_URL}/search?query=${query}&x_cg_demo_api_key=${API_KEY}`;
};

const marketChart = (coin) => {
  return `${BASE_URL}/coins/${coin}/market_chart?vs_currency=usd&days=7`;
};

export { getCoinList, searchCoin, marketChart };
