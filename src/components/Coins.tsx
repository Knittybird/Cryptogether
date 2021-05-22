import React, { Component } from 'react'
import Trending from './Trending'
import CoinList from './CoinList'

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
        <h2>Coins</h2>
        <Trending />
        <CoinList currency={currency} />
      </div>
    )
  }
}

export default Coins