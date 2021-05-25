import React, { Component } from 'react'
import ExchangeList from './ExchangeList'
import './Exchanges.css'

class Exchanges extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="exchanges">
        <ExchangeList />
      </div>
    )
  }
}

export default Exchanges