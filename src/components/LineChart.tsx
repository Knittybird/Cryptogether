
import React, { Component } from "react";
import Chart from "react-apexcharts";
// import ApexCharts from "apexcharts";
import { ApexOptions } from "apexcharts";
import exchange_volume from "../../test_data/Exchange_volume"  

/**
 * LineChart: Line Chart Component
 * Props:
 */


interface LineChartProps{

}


class LineChart extends Component<ApexOptions, ApexCharts> {
  constructor(props) {
    super(props);

    this.state = {
      // series: [{
      //     name: "volume",
      //     data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      // }],
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Volume1',
          align: 'left'
        },
        xaxis: {
          type: 'datetime',
        }
      },
    
    
    };
  }

  

    render() {
      return (

        <div id="chart">
          <Chart options={this.state.options} 
            series={this.state.series} type="line" height={350} 
          />
        </div>
      );
    }
  }
