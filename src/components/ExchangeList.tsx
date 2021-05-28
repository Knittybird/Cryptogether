import React, { Component } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ColorNum from './ColorNum'
import axios from 'axios'
import './ExchangeList.css'
import { Jumbotron } from 'react-bootstrap';
import MultiVolumeChart from './ExchangeMultiVolume';
import { kraken_volume } from '../test_data/kraken_volume'
import { gdax_volume } from '../test_data/gdax_volume'
import { binance_volume }  from '../test_data/binance_volume'

const NUM_PER_PAGE = 50

interface ExchangeListProps {
}

interface Exchange {
  id: string,
  name: string,
  year_established: number,
  country: string,
  description: string,
  url: string,
  image: string,
  has_trading_incentive: boolean,
  trust_score: number,
  trust_score_rank: number,
  trade_volume_24h_btc: number,
  trade_volume_24h_btc_normalized: number
}

interface ExchangeListState {
  exchanges: Exchange[], 
  volume_ids: string[],
  volume_names: string[],
  loaded: boolean
}

class ExchangeList extends Component<ExchangeListProps, ExchangeListState> {
  constructor(props) {
    super(props)
    this.state = {
      exchanges: [],
      volume_ids: [],
      volume_names: [],
      loaded: false,
    }
  }


  loadData = () => {
    const url = `https://api.coingecko.com/api/v3/exchanges?per_page=${NUM_PER_PAGE}`
    axios.get(url)
      .then(response => {
        const data = response.data
        const ids = data.slice(0,3).map(exch => exch.id)
        const names = data.slice(0,3).map(exch => exch.name)
        console.log(ids)
        console.log(names)
        this.setState({
          exchanges: data,
          loaded: true,
          volume_ids: ids,
          volume_names: names,
          // volume_series: [
          //   {
          //     data: binance_volume,
          //     name:   'Binance',
          //   },
          //   {
          //     data: gdax_volume,
          //     name: 'Coinbase'
          //   },
          //   {
          //     data: kraken_volume,
          //     name: 'Kraken'
          //   }
          // ],
        })
      })
      .catch((error) => {console.log("Something went wrong. ", error)})
      
  }

  componentDidMount() {    
    this.loadData()
  }

  render() {
    const { loaded, exchanges, volume_ids, volume_names} = this.state
    if (loaded) {
      return (
        <>
          <h3>Exchanges</h3>
          <Jumbotron>
              <MultiVolumeChart ids={volume_ids} names = {volume_names} title='Top 3 Exchanges'/>
          </Jumbotron>
          <table className="exchangeList table">
            <tbody>
              <tr key={0}>
                <th key={0}>Logo</th>
                <th key={1}>Name</th>
                <th key={2}>Year est.</th>
                <th key={3}>Country</th>
                <th key={4}>URL</th>
                <th key={5}>Incentive</th>
                <th key={6}>Trust</th>
                <th key={7}>Trust rank</th>
                <th key={8}>Vol 24h BTC</th>
              </tr>
              {exchanges.map((exchange, i) => 
                <tr key={i}>
                  <th key={0}>
                    <Link to={"/exchange/" + exchange.id}>
                      <img className="exchange-logo" src={exchange.image}/>
                    </Link>
                  </th>
                  <th key={1}>
                    <Link to={"/exchange/" + exchange.id}>
                      {exchange.name}
                    </Link>
                  </th>
                  <th key={2}>
                    <Link to={"/exchange/" + exchange.id}>
                      {exchange.year_established}
                    </Link>
                  </th>
                  <th key={3}>
                    <Link to={"/exchange/" + exchange.id}>
                      {exchange.country}
                    </Link>
                  </th>
                  <th key={4}>
                    <a href={exchange.url}>URL</a>
                  </th>
                  <th key={5}>
                    <Link to={"/exchange/" + exchange.id}>
                      {exchange.has_trading_incentive ? "yes" : "no"}
                    </Link>
                  </th>
                  <th key={6}>
                    <Link to={"/exchange/" + exchange.id}>
                      {exchange.trust_score}
                    </Link>
                  </th>
                  <th key={7}>
                    <Link to={"/exchange/" + exchange.id}>
                      {exchange.trust_score_rank}
                    </Link>
                  </th>
                  <th key={8}>
                    <Link to={"/exchange/" + exchange.id}>
                      {exchange.trade_volume_24h_btc}
                    </Link>
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )
    } else {
      return (
        <>
          <h2>Exchanges</h2>
          <div className="loading"><h3>Loading</h3></div>
        </>
      )
    }
  }
}

export default ExchangeList