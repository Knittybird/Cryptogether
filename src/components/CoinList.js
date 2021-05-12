import React, { Component } from 'react'
import axios from 'axios'

class CoinList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coins: [],
      loaded: false,
    }

  }

  componentDidMount() {    
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.props.currency}&per_page=250`
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

  componentDidUpdate() {    
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.props.currency}&per_page=250`
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

  render() {
    const { loaded, coins } = this.state
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
              <td key={0}>{coin.symbol}</td>
              <td key={1}>{coin.name}</td>
              <td key={2}>{coin.current_price}</td>
              <td key={3}>{coin.price_change_24h}</td>
              <td key={4}>{coin.price_change_percentage_24h}</td>
              <td key={5}>{coin.total_volume}</td>
            </tr>
          )}
        </tbody>
      </table> 
      
    )
  }
}

export default CoinList