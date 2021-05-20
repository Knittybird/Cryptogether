import React, { Component } from 'react'
import ColorNum from './ColorNum'
import axios from 'axios'

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
  loaded: boolean
}

class ExchangeList extends Component<ExchangeListProps, ExchangeListState> {
  constructor(props) {
    super(props)
    this.state = {
      exchanges: [],
      loaded: false,
    }

  }

  loadData = () => {
    const url = `https://api.coingecko.com/api/v3/exchanges?per_page={NUM_PER_PAGE}`
    axios.get(url)
      .then(response => {
        const data = response.data
        this.setState({
          exchanges: data,
          loaded: true
        })
      })
      .catch((error) => {console.log("Something went wrong. ", error)})
  }

  componentDidMount() {    
    this.loadData()
  }

  render() {
    const { loaded, exchanges } = this.state
    if (loaded) {
      return (
        <>
          <h2>Exchanges</h2>
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
                  <th key={0}><img className="exchange-logo" src={exchange.image}/></th>
                  <th key={1}>{exchange.name}</th>
                  <th key={2}>{exchange.year_established}</th>
                  <th key={3}>{exchange.country}</th>
                  <th key={4}><a href={exchange.url}>URL</a></th>
                  <th key={5}>{exchange.has_trading_incentive ? "yes" : "no"}</th>
                  <th key={6}>{exchange.trust_score}</th>
                  <th key={7}>{exchange.trust_score_rank}</th>
                  <th key={8}>{exchange.trade_volume_24h_btc}</th>
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