import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './ExchangeList.css'
import { Jumbotron } from 'react-bootstrap';
import MultiVolumeChart from './ExchangeMultiVolume';

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
        this.setState({
          exchanges: data,
          loaded: true,
          volume_ids: ids,
          volume_names: names,
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
          <h1>Exchanges</h1>
          <Jumbotron>
              <MultiVolumeChart ids={volume_ids} names={volume_names} title='Top 3 Exchanges'/>
          </Jumbotron>
          <table className="exchangeList table">
            <tbody>
              <tr key={0}>
                <th key={0} className="text-center">Logo</th>
                <th key={1}>Name</th>
                <th key={2} className="text-center">Year est.</th>
                <th key={3} className="d-none d-sm-table-cell">Country</th>
                <th key={4} className="text-center">Site</th>
                <th key={5} className="d-none d-lg-table-cell text-center">Incentive</th>
                <th key={6} className="d-none d-lg-table-cell text-center">Trust</th>
                <th key={7} className="d-none d-md-table-cell text-center">Trust rank</th>
                <th key={8} className="text-end">Vol 24h BTC</th>
              </tr>
              {exchanges.map((exchange, i) => 
                <tr key={i}>
                  <td key={0} className="text-center">
                    <Link to={"/exchange/" + exchange.id}>
                      <img className="exchange-logo" alt={exchange.name + " logo"} src={exchange.image}/>
                    </Link>
                  </td>
                  <td key={1}>
                    <Link to={"/exchange/" + exchange.id}>
                      <strong>{exchange.name}</strong>
                    </Link>
                  </td>
                  <td key={2} className="text-center">
                    {exchange.year_established}
                  </td>
                  <td key={3} className="d-none d-sm-table-cell">
                    {exchange.country}
                  </td>
                  <td key={4} className="text-center">
                    <a href={exchange.url}>🌐</a>
                  </td>
                  <td key={5} className="d-none d-lg-table-cell text-center">
                    {exchange.has_trading_incentive ? "yes" : "no"}
                  </td>
                  <td key={6} className="d-none d-lg-table-cell text-center">
                    {exchange.trust_score}
                  </td>
                  <td key={7} className="d-none d-md-table-cell text-center">
                    {exchange.trust_score_rank}
                  </td>
                  <td key={8} className="text-end">
                    {exchange.trade_volume_24h_btc.toFixed(0)}
                  </td>
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