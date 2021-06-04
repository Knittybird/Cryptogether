import React, { Component } from 'react'
import Trending from './Trending'
import CoinList from './CoinList'
import './Coins.css'

interface CoinsProps {
  currency: string
}

interface CoinsState {
  page: number 
}

class Coins extends Component<CoinsProps, CoinsState> {
  constructor(props) {
    super(props)
    this.state = {
      page: 1
    }
  }

  prevPage = () => {
    if (this.state.page > 1) {
      this.setState((state, props) => {
        return {page: state.page - 1}
      })
    }
  }

  nextPage = () => {
    this.setState((state, props) => {
      return {page: state.page + 1}
    })
  }

  render() {
    const { currency } = this.props
    const { page } = this.state
    
    return (
      <div className="coins">
        <h1>Trending Coins</h1>
        <Trending />
        <h1>Cryptocurrency List</h1>
        <div className="pagination">
          <button className="page-button previous-button" onClick={this.prevPage}>&lt; previous</button>
          <button className="page-button next-button" onClick={this.nextPage}>next &gt;</button>
        </div>
        <CoinList currency={currency} page={page}/>
      </div>
    )
  }
}

export default Coins