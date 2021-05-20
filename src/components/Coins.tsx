import React, { Component } from 'react'

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
      <div className="coinsView">
        <p>Coins</p>
      </div>
    )
  }
}

export default Coins