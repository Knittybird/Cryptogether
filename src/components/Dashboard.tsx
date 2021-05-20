import React, { Component } from 'react'
import Trending from './Trending'
import CoinList from './CoinList'

interface DashProps {
  currency: string
}

class Dashboard extends Component<DashProps> {
  constructor(props) {
    super(props)
  }

  render() {
    const { currency } = this.props
    return (
      <div className="dashboard">
        <Trending />
        <CoinList currency={currency} />
      </div>
    )
  }
}

export default Dashboard