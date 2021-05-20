import React, { useState, useEffect } from 'react'
import ColorNum from './ColorNum'
import axios from 'axios'



interface CoinOHLC {
  timestamp: Date | number,
  open: number,
  high: number,
  low: number,
  close: number
}

interface CoinOHLCState {
  coinDay: CoinOHLC[],
  loaded: boolean
}

export default function  CoinOHLC() {
  const [coinsOHLC, setCoinsOHLC] = useState<number[][]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!loaded) {
      const url = `https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=7`
      axios.get(url)
        .then(response => {
          setLoaded(true);
          console.log(response.data)
          setCoinsOHLC(response.data)
            coinsOHLC.forEach(item => {
              const date = new Date(item[0]);
              const [open, high, low, close] = item.slice(1)
              console.log(date.toDateString(), open, high, low, close)})
        })
        .catch((error) => {console.log("Something went wrong. ", error)})
    }
  }, [coinsOHLC])
  
    return (
      <div className="dashboard">
        <h1>CandleStick Chart</h1>
        <p>Records loaded</p>
      </div>
    )
  
}

