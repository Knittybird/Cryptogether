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

  return (
    <>
      <h3>{title}</h3>
      <p>{ids}, {names}</p>
    {/* {series &&(
      // <LineChart series={series} title={title}></LineChart>
    )} */}
    </>
  )
}