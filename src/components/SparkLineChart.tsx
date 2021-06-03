
import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import './SparkLineChart.css'

/**
 * SparkLineChart: Trending or Spark Line Chart Component 
 * Props:  price <number[]> list of trending numbers
 */

interface SparkLineChartProps{
  price: number[]
  title?: string
}

type SparkLineChartState = {
  series: ApexAxisChartSeries,
  options: ApexOptions
}


class SparkLineChart extends React.Component<SparkLineChartProps, SparkLineChartState> {
  constructor(props) {
    super(props);

    const stepsize = Math.floor(this.props.price.length/7)
    let price:number[] = [];
    for (let i=0; i < this.props.price.length; i=i+stepsize){
      price.push(this.props.price[i])
    }

    this.state = {
      options: {
        chart: {
          type: 'line',
          width: 100,
          height: 35,
          sparkline: {
            enabled: true
          }
        },
        colors:['#ffc300'],
        stroke: {
          curve: 'smooth'
        },
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return ''
              }
            }
          },
          theme: 'dark',
          marker: {
            show: false
          }
        }
      },
      series: [{
        data: price,
      }]
    }
    };

  

    render() {
      return (

        <div className="sparkline-chart text-center">
          <Chart options={this.state.options} 
            series={this.state.series} type="line" height={35} width={100}
          />
        </div>
      );
    }
  }

  export default SparkLineChart
