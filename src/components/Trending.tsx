import React, { Component } from 'react'

interface TrendingProps {
  currency: string
}

class Trending extends Component<TrendingProps> {
  constructor(props) {
    super(props)
  }

  render() {
    const { currency } = this.props
    return (
      <div className="trending">
        <p>Trending coins</p>
      </div>
    )
  }
}

export default Trending