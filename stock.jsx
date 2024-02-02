import { iex } from '../config/iex.jsx';

export const stock = {
  // Fetch the latest stock price using the IEX Cloud API
  latestPrice: (ticker, callback) => {
    fetch(stock.latestPriceURL(ticker))
      .then((response) => response.json())
      .then((data) => callback(stock.formatPriceData(data)));
  },

  // Generate the URL for fetching the latest stock price
  latestPriceURL: (ticker) => {
    return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`;
  },

  // Format the fetched price data
  formatPriceData: (data) => {
    const stockData = data[data.length - 1];
    const formattedData = {
      price: stockData.close,
      date: stockData.date,
      time: stockData.label,
    };
    return formattedData;
  },

  // Fetch yesterday's close price using the IEX Cloud API
  getYesterdaysClose: (ticker, lastTradingDate, callback) => {
    if (lastTradingDate !== "" && lastTradingDate !== undefined) {
      const url = stock.yesterdaysCloseURL(ticker, stock.formatDate(lastTradingDate));
      fetch(url)
        .then((response) => response.json())
        .then((data) => callback(stock.formatPriceData(data)));
    }
  },

  // Fetch the last trading date using the IEX Cloud API
  getLastTradingDate: () => {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const url = `${iex.base_url}/ref-data/us/dates/trade/last/1/${today}?token=${iex.api_token}`;
    return fetch(url).then((res) => res.json());
  },

  // Generate the URL for fetching yesterday's close price
  yesterdaysCloseURL: (ticker, lastTradingDate) => {
    return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&exactDate=${lastTradingDate}&token=${iex.api_token}`;
  },

  // Format the date to the required format for API requests
  formatDate: (date) => {
    return new Date(date).toISOString().split('T')[0].replace(/-/g, '');
  },
};
