import React, { Component } from 'react'
import Trending from './Trending'
import CoinList from './CoinList'
import './Coins.css'

interface CoinsProps {
  currency: string
}

class Coins extends Component<CoinsProps> {
  render() {
    const { currency } = this.props

    return (
      <div className='coins'>
        <h1>Trending Coins</h1>
        <Trending />
        <h1>Cryptocurrency List</h1>
        <CoinList currency={currency} />
      </div>
    )
  }
}

export default Coins
