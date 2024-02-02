import React, { Component } from 'react';
import { stock } from '../resources/stock.jsx';

class StockRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: null,
      date: null,
      time: null,
      data: null,
      dollar_change: null,
      percent_change: null,
    };
  }

  // Define the style for the dollar_change span based on the value
  changeStyle() {
    return {
      color: this.state.dollar_change > 0 ? '#4caf50' : '#e53935',
      fontSize: '0.8rem',
      marginLeft: 5,
    };
  }

  // Apply the fetched data to the component state
  applyData(data) {
    // Check if 'data' is not null and 'data.price' is a number
    const formattedPrice = data && typeof data.price === 'number' ? data.price.toFixed(2) : null;
  
    this.setState({
      price: formattedPrice,
      data: data && data.date ? data.date : null,
      time: data && data.time ? data.time : null,
    });
  }
  
  

  // Fetch the latest stock price when the component mounts
  componentDidMount() {
    stock.latestPrice(this.props.ticker, this.applyData.bind(this));
  }

  // Update the component when props change, e.g., lastTradingDate
  componentDidUpdate(prevProps) {
    this.setCanRetrieveClose(prevProps);

    if (this.state.canRetrieveClose && this.state.price !== null) {
      // Fetch yesterday's close price and update state
      stock.getYesterdaysClose(this.props.ticker, this.props.lastTradingDate, (yesterday) => {
        const dollar_change = (this.state.price - yesterday.price).toFixed(2);
        const percent_change = ((100 * dollar_change) / yesterday.price).toFixed(2);
        this.setState({
          dollar_change: `$${dollar_change}`,
          percent_change: `(${percent_change})%`,
          canRetrieveClose: false,
        });
      });
    }
  }

  // Set canRetrieveClose in state when lastTradingDate changes
  setCanRetrieveClose(prevProps) {
    if (prevProps.lastTradingDate == null && this.props.lastTradingDate != null) {
      this.setState({
        canRetrieveClose: true,
      });
    }
  }

  // Render the stock row with the fetched data
  render() {
    return (
      <li className="list-group-item">
        <b>{this.props.ticker}</b>${this.state.price}
        <span className="change" style={this.changeStyle()}>
          {this.state.dollar_change}
          &nbsp;{this.state.percent_change}
        </span>
      </li>
    );
  }
}

export default StockRow;
