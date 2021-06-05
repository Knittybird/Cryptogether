import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

/**
 * LineChart: Line Chart Component
 * Props:  series <data<[timstamp, number][]>   array of data
 *                 name <string>                optional name of line to be displayed in on hover tooltip
 *                > []       one element for each line displayed
 *         title <string>   Optional default is no title displayed
 */

interface LineChartProps {
  series: ApexAxisChartSeries
  title?: string
}

type LineChartState = {
  series: ApexAxisChartSeries
  options: ApexOptions
}

class LineChart extends React.Component<LineChartProps, LineChartState> {
  constructor(props) {
    super(props)

    this.state = {
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
          foreColor: '#ffffff',
        },
        grid: {
          borderColor: '#8cc8ff', // bright
        },
        title: {
          text: this.props.title,
          align: 'left',
          style: {
            color: '#d7ecff', // brighter
          },
        },
        tooltip: {
          theme: 'dark',
        },
        xaxis: {
          type: 'datetime',
          labels: {
            style: {
              colors: '#ffffff', // bright
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: '#ffffff', // bright
            },
          },
        },
      },
      series: this.props.series,
    }
  }

  render() {
    return (
      <div id='chart'>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type='line'
          height={350}
        />
      </div>
    )
  }
}

export default LineChart
