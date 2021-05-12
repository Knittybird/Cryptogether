import React, { Component } from 'react'
import 'axios'

class CoinList extends Component {
  constructor(props) {
    super(props)
  }

  

  render() {
    const { currency } = this.props
    return (
      <div className="dashboard">
        <p>Coin List</p>
      </div>
    )
  }
}

export default CoinList