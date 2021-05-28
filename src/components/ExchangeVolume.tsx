import React, { useState, useEffect } from "react";
import axios from 'axios'
import ApexCharts from "apexcharts";
import { ApexOptions } from "apexcharts";
import LineChart from './LineChart'
import { setSyntheticTrailingComments } from "typescript";

interface VolumeChartProps{
  id: string
  name: string
  title?: string
}
export default function VolumeChart({id, name, title}:VolumeChartProps){
  const [Title, setTitle] = useState<string> ();
  const [series, setSeries] = useState<ApexAxisChartSeries> ()  
  async function getVolume(id:string, name: string){
      const url = `https://api.coingecko.com/api/v3/exchanges/${id}/volume_chart?days=7`;
      const response = await axios.get(url)
      const v_data = response.data.map((id) => [id[0], parseInt(id[1])])

      console.log(`v_data, ${v_data}`)
      console.log(`typeof v_data`, typeof v_data)
      setSeries([{data: v_data, name: name}])
}
  useEffect(() => {
    getVolume(id, name)
    if (title) {
      setTitle(title)
    }
    if (series) {
      console.log(series.length)
    }
  }, [title])

  return (
    <>
    {series &&(
      <LineChart series={series} title={title}></LineChart>
    )}
    </>
  )
}