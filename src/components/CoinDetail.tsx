import React, { Component } from 'react'
import axios from 'axios'
import CoinIcon from './CoinIcon'
import CoinMarket from './CoinMarket'
import CoinDescription from './CoinDescription'
import CoinMetrics from './CoinMetrics'
import CoinCandlestick from './CandleStick'
interface CoinDetailProps {
  id: string
  currency: string
}
interface CoinImage {
  thumb: string
  small: string
  large: string
}
interface Description {
  en: string
}

interface Coin {
  id: string
  symbol: string
  name: string
  image: CoinImage | null
  description: Description
}
interface CoinState {
  coin: Coin
  loaded: boolean
}

export class CoinDetail extends Component<CoinDetailProps, CoinState> {
  constructor(props) {
    super(props)

    const init = {} as Coin
    this.state = {
      coin: init,
      loaded: false,
    }
  }
  loadData = () => {
    const { id } = this.props
    const url = `https://api.coingecko.com/api/v3/coins/${id}`

    axios
      .get(url)
      .then((response) => {
        const data = response.data

        this.setState({
          coin: data,
          loaded: true,
        })
      })
      .catch((error) => {
        console.log('Something went wrong. ', error)
      })
  }
  componentDidMount() {
    this.loadData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.loadData()
    }
  }

  render() {
    const { coin } = this.state
    const { id, currency } = this.props

    if (coin.image) {
      return (
        <div className='coin-detail-container'>
          <CoinIcon
            name={coin.name}
            symbol={coin.symbol}
            image={coin.image?.small}
          />
          <CoinMarket id={id} currency={currency} />
          <CoinCandlestick id={id} currency={currency} />
          <CoinMetrics id={id} currency={currency} />
          <CoinDescription
            name={coin.name}
            description={coin.description.en}
          />
        </div>
      )
    } else {
      return <div>Loading</div>
    }
  }
}

export default CoinDetail
