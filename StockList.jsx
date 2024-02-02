import React, { Component } from 'react';
import { stock } from '../resources/stock.jsx';
import StockRow from './StockRow.jsx';

class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastTradingDate: null,
    };
  }

  // Fetch the latest stock price and last trading date when the component mounts
  componentDidMount() {
    stock.latestPrice(this.props.ticker, this.applyData.bind(this));

    stock.getLastTradingDate().then((data) => {
      this.setState({
        lastTradingDate: data[0].date,
      });
    });
  }

  // Apply the fetched last trading date to the component state
  applyData(data) {
    this.setState({
      lastTradingDate: data[0].date,
    });
  }

  // Render the stock list with StockRow components
  render() {
    const lastTradingDate = this.state.lastTradingDate;
    return (
      <ul className="list-group list-group-flush">
        <StockRow ticker="aapl" lastTradingDate={lastTradingDate} />
        <StockRow ticker="goog" lastTradingDate={lastTradingDate} />
        <StockRow ticker="msft" lastTradingDate={lastTradingDate} />
        <StockRow ticker="tsla" lastTradingDate={lastTradingDate} />
      </ul>
    );
  }
}

export default StockList;
