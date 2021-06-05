import React, { Component } from 'react'
import axios from 'axios'
import SimpleNum from './SimpleNum'
import SimplePercentage from './SimplePercentage'
interface CoinMetricsProps {
  id: string
  currency: string
}
interface Coin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  ath: number
  ath_change_percentage: number
  ath_date: Date
  atl: number
  atl_change_percentage: number
  atl_date: Date
  roi: string
  last_updated: Date
}

interface CoinMetricsState {
  coin: Coin
  loaded: boolean
}
export class CoinMetrics extends Component<
  CoinMetricsProps,
  CoinMetricsState
> {
  constructor(props) {
    super(props)

    const init = {} as Coin
    this.state = {
      coin: init,
      loaded: false,
    }
  }
  loadData = () => {
    const { id, currency } = this.props
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`

    axios
      .get(url)
      .then((response) => {
        const data = response.data[0]

        this.setState({
          coin: data,
          loaded: true,
        })
      })
      .catch((error) => {
        console.log('Something went wrong. ', error)
      })
  }
  componentDidMount() {
    this.loadData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currency !== this.props.currency) {
      this.loadData()
    }
  }

  render() {
    const { currency } = this.props
    const { coin } = this.state
    let currencySymbol = '$'
    if (currency === 'jpy') {
      currencySymbol = '¥'
    } else if (currency === 'eur') {
      currencySymbol = '€'
    }
    return (
      <div className='coin-key-metrics'>
        <div className='metrics-title'> Key Metrics </div>
        <div className='metrics-container'>
          <div className='h-high'>
            <div className='title'>24 HOUR HIGH</div>
            <div className='value'>
              {currencySymbol}
              <SimpleNum value={coin.high_24h} />
            </div>
          </div>
          <div className='h-low'>
            <div className='title'>24 HOUR LOW</div>
            <div className='value'>
              {currencySymbol}
              <SimpleNum value={coin.low_24h} />
            </div>
          </div>
          <div className='net-change'>
            <div className='title'>NET CHANGE</div>
            <div className='value'>
              {currencySymbol}
              {coin.price_change_24h}
            </div>
          </div>
          <div className='ath'>
            <div className='title'>ALL TIME HIGH</div>
            <div className='value'>
              {currencySymbol}
              <SimpleNum value={coin.ath} />
            </div>
          </div>
          <div className='atl'>
            <div className='title'>ALL TIME LOW</div>
            <div className='value'>
              {currencySymbol}
              <SimpleNum value={coin.atl} />
            </div>
          </div>
          <div className='return'>
            <div className='title'>RETURN (24H)</div>
            <div className='value'>
              <SimplePercentage value={coin.price_change_percentage_24h} />
            </div>
          </div>
          {coin.circulating_supply === undefined ? null : (
            <div className='supply'>
              <div className='title'>TOTAL SUPPLY</div>
              <div className='value'>
                {coin.circulating_supply.toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default CoinMetrics
