import React, { Component } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts"
import { ApexOptions } from "apexcharts"
import axios from "axios";



/**
 * CoinCandlestick: Candlestick chart component
 * Props: id:<string>  id of coin
 *        currancy:<string>  Optional currancy, defaults to usd. 
 *                           If default used, it is not changeable
 *        title:<string>     Optional title, Default no title
 * Will fill parent container
 */


interface CoinCandlestickProps { 
  currency?: string,
  id: string
  title?: string
}

interface CandlestickState {
  // options: ApexOptions,
  series: ApexAxisChartSeries,
  options: ApexOptions
  loaded: boolean
}

class CoinCandlestick extends Component<CoinCandlestickProps, CandlestickState> {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        data: []
      }],
      options: {
        chart: {
          type:'candlestick',
          background: '#000814'
        },
        title: {
          text: this.props.title,
          align: "left",
          offsetY: 11,
          offsetX: 8,
          style: {
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#d7ecff',
          }
        },
        grid: {
          borderColor: '#8cc8ff'  // bright
        },
        plotOptions: {
          candlestick: {
            colors: {
              upward: "#00dd00",  // bright green
              downward: "#ff3333",  // red
            },
          },
        },
        tooltip: {
          theme: 'dark'
        },
        xaxis: {
          type: 'datetime',
          labels: {
            style: {
              colors: '#ffffff'  // brighter
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: '#ffffff'  // brighter
            }
          }
        }
      },
      
      loaded: false
    };
  }

  static defaultProps = {
    currency: "usd",
  };

  loadData = () => {
    const url = `https://api.coingecko.com/api/v3/coins/${this.props.id}/ohlc?vs_currency=${this.props.currency}&days=30`;
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
          options={this.state.options}
          series={this.state.series}
          type="candlestick"
        />
      </div>
    );
  }
}

export default CoinCandlestick;
