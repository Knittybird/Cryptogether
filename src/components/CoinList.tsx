import React, { Component } from 'react'
import ColorNum from './ColorNum'
import SimpleNum from './SimpleNum'
import axios from 'axios'
import './CoinList.css'

const NUM_PER_PAGE = 50

interface CoinListProps {
  currency: string
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
  last_updated: Date
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
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.props.currency}&per_page=${NUM_PER_PAGE}`
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
    const { loaded, coins } = this.state
    if (loaded) {
      return (
        <table className="coinList table">
          <tbody>
            <tr key={0}>
              <th key={0}>Symbol</th>
              <th key={1}>Name</th>
              <th key={2}>Price</th>
              <th key={3}>24h change</th>
              <th key={4}>24h change %</th>
              <th key={5}>Volume</th>
            </tr>
            {coins.map((coin, i) => 
              <tr key={i+1}>
                <td key={0} className="symbol">{coin.symbol.toUpperCase()}</td>
                <td key={1}>{coin.name}</td>
                <td key={2}>{coin.current_price}</td>
                <td key={3}>
                  <ColorNum value={coin.price_change_24h}/>
                </td>
                <td key={4}>
                  <ColorNum value={coin.price_change_percentage_24h} suffix="%" />
                </td>
                <td key={5}><SimpleNum value={coin.total_volume} /></td>
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