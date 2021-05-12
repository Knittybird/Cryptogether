import React, { Component } from 'react'

class Trending extends Component {
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