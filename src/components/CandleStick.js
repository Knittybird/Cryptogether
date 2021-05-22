import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { testData } from "./testData";

// CoinCadlestick takes a coin id and optionally a currancy. Currency defaults to usd.
// chart displays 7 days worth of open, high, low, close data in 4hr incriments
class CoinCandlestick extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "candlestick",
          height: 350,
          width: 600,
        },
        theme: {
          mode: "dark",
        },
        title: {
          text: "CandleStick Chart",
          align: "left",
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
        plotOptions: {
          candlestick: {
            colors: {
              upward: "#e8503a",
              downward: "#17b861",
            },
          },
        },
      },
      series: [
        {
          data: testData,
        },
      ],
      loaded: false,
    };
  }

  static defaultProps = {
    currency: "usd",
  };

  loadData = () => {
    console.log(this.props.currency);
    const url = `https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=${this.props.currency}&days=7`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        this.setState({
          series: [
            {
              data: data,
            },
          ],
          loaded: true,
        });
        console.log(this.state);
      })
      .catch((error) => {
        console.log("Something went wrong. ", error);
      });
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currency !== this.props.currency) {
      this.loadData();
    }
  }

  render() {
    return (
      <div className="dashboard">
        <h1>CandleStick Chart</h1>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="candlestick"
          height="500"
          width="700"
        />
      </div>
    );
  }
}

export default CoinCandlestick;
