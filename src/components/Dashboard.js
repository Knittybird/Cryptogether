import React, { Component } from 'react'
import Trending from './Trending'
import CoinList from './CoinList'

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { currency } = this.props
    return (
      <div className="dashboard">
        <Trending currency={currency} />
        <CoinList currency={currency} />
      </div>
    )
  }
}

export default Dashboard