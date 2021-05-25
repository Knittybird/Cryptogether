
import React, { Component } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { ApexOptions } from "apexcharts";

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
  data: any,
  title?: string

}

type LineChartState = {
  series: ApexAxisChartSeries,
  options: ApexOptions
}


class LineChart extends React.Component<LineChartProps, LineChartState> {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
          data: this.props.data,
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
          <Chart options={this.state.options} 
            series={this.state.series} type="line" height={350} 
          />
        </div>
      );
    }
  }

  export default LineChart
