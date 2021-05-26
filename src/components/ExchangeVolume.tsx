import React, { useState, useEffect } from "react";
import axios from 'axios'
import ApexCharts from "apexcharts";
import { ApexOptions } from "apexcharts";
import LineChart from './LineChart'

interface VolumeChartProps{
  ids: string[],
  names: string[],
  title?: string
}
export default function VolumeChart({ids, names, title}:VolumeChartProps){
  const [Title, setTitle] = useState<string> ();
  const [series, setSeries] = useState<ApexAxisChartSeries>([])
  
  useEffect(() => {
    let volume_series:ApexAxisChartSeries = []
    ids.forEach((id, index) => {
    const url = `https://api.coingecko.com/api/v3/exchanges/${id}/volume_chart?days=7`;
      axios.get(url)
          .then(response => {
            const v_data:[number, number][] = response.data.map((id) => [id[0], parseInt(id[1])])
            volume_series.push({data: v_data, name: names[index]})
          })
          .catch((error) => {console.log("Something went wrong. ", error)})
          })
    setSeries(volume_series)
    if (title) {
      setTitle(title)
    }
  }, [series, title])

  return (
    <>
      <p>  {ids}, {names}</p>
    {series &&(
      <LineChart series={series} title={title}></LineChart>
    )}
    </>
  )
}