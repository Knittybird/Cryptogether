import React, { Component } from 'react'

class Coins extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { currency } = this.props
    return (
      <div className="coinsView">
        <p>Coins</p>
      </div>
    )
  }
}

export default Coins