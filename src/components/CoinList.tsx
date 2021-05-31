import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ColorNum from './ColorNum'
import SimpleNum from './SimpleNum'
import axios from 'axios'
import SparkLineChart from './SparkLineChart'
import './CoinList.css'

const NUM_PER_PAGE = 50

interface CoinListProps {
  currency: string
}

interface Sparkline {
  price: number[]
}

interface Coin {
  id: string,
  symbol: string,
  name: string,
  image: string,
  current_price: number,
  market_cap: number,
  market_cap_rank: number,
  fully_diluted_valuation: number,
  total_volume: number,
  high_24h: number,
  low_24h: number,
  price_change_24h: number,
  price_change_percentage_24h: number,
  market_cap_change_24h: number,
  market_cap_change_percentage_24h: number,
  circulating_supply: number,
  total_supply: number,
  max_supply: number,
  ath: number,
  ath_change_percentage: number,
  ath_date: Date,
  atl: number,
  atl_change_percentage: number,
  atl_date: Date,
  roi: string,
  last_updated: Date,
  sparkline_in_7d: Sparkline
}

interface CoinListState {
  coins: Coin[], 
  loaded: boolean
}

class CoinList extends Component<CoinListProps, CoinListState> {
  constructor(props) {
    super(props)
    this.state = {
      coins: [],
      loaded: false,
    }

  }

  loadData = () => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.props.currency}&per_page=${NUM_PER_PAGE}&sparkline=true`
    axios.get(url)
      .then(response => {
        const data = response.data
        this.setState({
          coins: data,
          loaded: true
        })
      })
      .catch((error) => {console.log("Something went wrong. ", error)})
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
    const { loaded, coins } = this.state
    let currencySymbol = '$'
    if (currency == 'jpy') {
      currencySymbol = '¥'
    } else if (currency == 'eur') {
      currencySymbol = '€'
    }
    if (loaded) {
      return (
        <table className="coinList table">
          <tbody>
            <tr key={0}>
              <th key={0}>Symbol</th>
              <th key={1} className="d-none d-sm-table-cell">Name</th>
              <th key={2} className="text-end">Price</th>
              <th key={3} className="d-none d-md-table-cell text-end">24h change</th>
              <th key={4} className="text-end">24h change</th>
              <th key={5} className="text-end">Volume</th>
              <th key={6} className="d-none d-lg-table-cell text-center">Trending</th>
            </tr>
            {coins.map((coin, i) => 
              <tr key={i+1}>
                <td key={0} className="symbol">
                  <Link to={"/coin/" + coin.id}>
                    {coin.symbol.toUpperCase()}
                  </Link>
                </td>
                <td key={1} className="d-none d-sm-table-cell">
                  <Link to={"/coin/" + coin.id}>
                    {coin.name}
                  </Link>
                </td>
                <td key={2} className="text-end">{currencySymbol + coin.current_price.toFixed(2)}</td>
                <td key={3} className="d-none d-md-table-cell text-end">
                  <ColorNum value={coin.price_change_24h.toFixed(2)}/>
                </td>
                <td key={4} className="text-end">
                  <ColorNum value={coin.price_change_percentage_24h.toFixed(2)} suffix="%" />
                </td>
                <td key={5} className="text-end"><SimpleNum value={coin.total_volume} prefix={currencySymbol}/></td>
                
                <td key={6} className="d-none d-lg-table-cell"><SparkLineChart price={coin.sparkline_in_7d.price} /></td>
              </tr>
            )}
          </tbody>
        </table>
      )
    } else {
      return <div className="loading"><h2>Loading</h2></div>
    }
  }
}

export default CoinList