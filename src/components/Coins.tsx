import React, { Component } from 'react'
import Trending from './Trending'
import CoinList from './CoinList'
import './Coins.css'

interface CoinsProps {
  currency: string
}

class Coins extends Component<CoinsProps> {
  constructor(props) {
    super(props)
  }

  render() {
    const { currency } = this.props
    
    return (
      <div className="coins">
        <h3>Trending Coins</h3>
        <Trending />
        <h3>Cryptocurrency List</h3>
        <CoinList currency={currency} />
      </div>
    )
  }
}

export default Coins