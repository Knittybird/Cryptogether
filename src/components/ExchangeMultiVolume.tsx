import React, { useState, useEffect } from "react";
import axios from 'axios'
import ApexCharts from "apexcharts";
import { ApexOptions } from "apexcharts";
import LineChart from './LineChart'
import { setSyntheticTrailingComments } from "typescript";
import './ExchangeMultiVolume.css'

interface VolumeChartProps{
  ids: string[],
  names: string[],
  title?: string
}
export default function MultiVolumeChart({ids, names, title}:VolumeChartProps){
  const [series, setSeries] = useState<ApexAxisChartSeries>()
  const [loaded, setLoaded] = useState<boolean>(false)
  
  async function getVolume(ids:string[], names: string[]){
      const urlpre = `https://api.coingecko.com/api/v3/exchanges/`;
      const urlpost = `/volume_chart?days=7`;
      const response0 = await axios.get(`${urlpre}${ids[0]}${urlpost}`)
      const response1 = await axios.get(`${urlpre}${ids[1]}${urlpost}`)
      const response2 = await axios.get(`${urlpre}${ids[2]}${urlpost}`)
      const v_data0:[number, number][] = response0.data.map((id) => [id[0], parseInt(id[1])])
      const v_data1:[number, number][] = response1.data.map((id) => [id[0], parseInt(id[1])])
      const v_data2:[number, number][] = response2.data.map((id) => [id[0], parseInt(id[1])])
        setSeries([ {data: v_data0, name: names[0]},    // this is a kluge and not acceptible for the real world
                    {data: v_data1, name: names[1]},
                    {data: v_data2, name: names[2]}])
        setLoaded(true)
}
  useEffect(() => {
    let volume_series:ApexAxisChartSeries = []
    getVolume(ids, names);

    
  }, [])

  if (loaded===true) {
  return (
    <>
      {series &&(
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