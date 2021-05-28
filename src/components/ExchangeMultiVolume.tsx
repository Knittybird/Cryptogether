import React, { useState, useEffect } from "react";
import axios from 'axios'
import ApexCharts from "apexcharts";
import { ApexOptions } from "apexcharts";
import LineChart from './LineChart'
import { setSyntheticTrailingComments } from "typescript";

interface VolumeChartProps{
  ids: string[],
  names: string[],
  title?: string
}
export default function MultiVolumeChart({ids, names, title}:VolumeChartProps){
  const [Title, setTitle] = useState<string> ();
  const [series, setSeries] = useState<ApexAxisChartSeries>()
  const [loaded, setLoaded] = useState<boolean>(false)
  
  async function foo(id:string, name: string){
      const url = `https://api.coingecko.com/api/v3/exchanges/${id}/volume_chart?days=7`;
      const response = await axios.get(url)
      const v_data:[number, number][] = response.data.map((id) => [id[0], parseInt(id[1])])
      // console.log(`v_data, ${v_data}`)
      console.log(`typeof v_data`, typeof v_data)
      if (series) {
        setSeries(series.concat([{data: v_data, name: name}]))
      }
      else {
        setSeries([{data: v_data, name: name}])
      }
      if (series && series.length === 3) {
        setLoaded(true)
      }
}
  useEffect(() => {
    let volume_series:ApexAxisChartSeries = []
    ids.forEach((id, index) => {
      const blah = foo(id, names[index])
    })

    console.log(`series, ${series}`)
    if (title) {
      setTitle(title)
    }
    if (series){
      console.log(series.length)

    }
  }, [title])

  if (loaded===true) {
  return (
    <>
      <p>  {ids}, {names}</p>
      {series &&(
      // {series && series.length==3 &&(
        <LineChart series={series} title={title}></LineChart>
      )}
      
    </>
  )
      } 
      else {
        return (<>
        <p>Loading</p>
        </>
        )
      }
}