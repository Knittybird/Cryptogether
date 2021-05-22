import React, { Component } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts"
import ApexOptions from "apexcharts"
import axios from "axios";



/**
 * CoinCandlestick: Candlestick chart component
 * Props: id:<string>  id of coin
 *        currancy:<string>  Optional currancy, defaults to usd. 
 *                           If default used, it is not changeable
 */


interface CoinCandlestickProps { 
  currency?: string,
  id: string
}

interface CandlestickState {
  // options: ApexOptions,
  series: ApexAxisChartSeries,
  loaded: boolean
}

class CoinCandlestick extends Component<CoinCandlestickProps, CandlestickState> {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        data: []
      }],
      loaded: false
    };
  }

  static defaultProps = {
    currency: "usd",
  };

  loadData = () => {
    const url = `https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=${this.props.currency}&days=7`;
    axios
      .get(url)
      .then((response) => {
        this.setState({
          series: [
            {
              data: response.data,
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
      <div className="candlestick">
        <Chart
          // options={this.state.option}
          options={{
            chart: {type:'candlestick'},
            // title: {
            //   text: "CandleStick Chart",
            //   align: "left",
            // },
            theme:{mode: 'dark',},
            xaxis: {
              type: "datetime",
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#e8503a",
                  downward: "#17b861",
                },
              },
            },
          }}
          series={this.state.series}
          type="candlestick"
        />
      </div>
    );
  }
}

export default CoinCandlestick;
