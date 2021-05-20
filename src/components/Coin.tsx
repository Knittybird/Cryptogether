import React, { Component } from 'react'
import {RouteComponentProps} from 'react-router'
import axios from 'axios'
interface CoinProps {
  id: string;
}
interface CoinState{
    coin : Coin;
    loaded: boolean;
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

class Coin extends Component<RouteComponentProps<CoinProps>,CoinState> {
  constructor(props) {
    super(props)
    this.state = {
        coin : {},
        loaded: false,
      }
  }

  loadData = () => {
    const url = `https://api.coingecko.com/api/v3/coin/${this.props.match.params}`
    axios.get(url)
      .then(response => {
        const data = response.data
        this.setState({
          coin: data,
          loaded: true
        })
      })
      .catch((error) => {console.log("Something went wrong. ", error)})
  }
  render() {
    const {id} = this.props.match.params;
    const {coin, loaded} = this.state;
    return (
      <div className="coinView">
        <p>Coin {id}</p>
      </div>
    )
  }
}

export default Coin