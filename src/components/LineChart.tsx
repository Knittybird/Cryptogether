
import React, { Component } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { ApexOptions } from "apexcharts";
import exchange_volume from "../../test_data/Exchange_volume"  

/**
 * LineChart: Line Chart Component
 * Props:
 */

const opt:ApexOptions = {

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
}

interface LineChartProps{

}

interface LineChartState {
  series: ApexAxisChartSeries,
  options: ApexOptions
}


class LineChart extends Component<LineChartState> {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
          name: "volume",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }],
      options: {
        xaxis: {
          type: 'datetime',
        }
      }
    
    };
  }

  

    render() {
      return (

        <div id="chart">
          <Chart options={opt} 
            series={this.state.series} type="line" height={350} 
          />
        </div>
      );
    }
  }
