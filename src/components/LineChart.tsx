
import React, { Component } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { ApexOptions } from "apexcharts";

/**
 * LineChart: Line Chart Component
 * Props:  Data<[timstamp, number][]  array of data to be displayed
 *         title <string>   Optional default is no title displayed
 *         name <string>    Optional name of line to be desplayed on hover tooltip
 */



interface LineChartProps{
  data: any,
  title?: string
  name?: string

}

type LineChartState = {
  series: ApexAxisChartSeries,
  options: ApexOptions
}


class LineChart extends React.Component<LineChartProps, LineChartState> {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar:{
            show: false,
          }
            
        },
        grid: {
          borderColor: '#8cc8ff'
        },
        tooltip: {
          theme: 'dark'
        },
        xaxis: {
          type: 'datetime',
          labels: {
            style: {
              colors: '#d7ecff'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: '#d7ecff'
            }
          }
        }
        // theme: {
        //   mode: 'dark'
        // },
      },
      series: [{
          name: this.props.name,
          data: this.props.data,
      }]
    }
    };

  

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
