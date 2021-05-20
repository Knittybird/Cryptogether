import React, { Component } from "react";
import Chart from "react-apexcharts";
// import { testData } from "./testData";

class CoinOHLC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "candlestick",
        },
      },
      series: [
        {
          data: [
            [1538856000000, 6593.34, 6600, 6582.63, 6600],
            [1538856900000, 6595.16, 6604.76, 6590.73, 6593.86],
          ],
        },
      ],
    };
  }

  render() {
    return (
      <div className="dashboard">
        <h1>CandleStick Chart</h1>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="candlestick"
          width="500"
        />
      </div>
    );
  }
}

export default CoinOHLC;
