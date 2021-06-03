import { Component } from 'react'
import { Link } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import axios from 'axios'
import './Trending.css'
import 'react-perfect-scrollbar/dist/css/styles.css'

const NUM_TRENDING_TO_SHOW = 7

interface TrendingProps {
}

interface TrendingCoin {
  id: string,
  coin_id: number,
  name: string,
  symbol: string,
  market_cap_rank: number,
  thumb: string,
  small: string,
  large: string,
  slug: string,
  price_btc: number,
  score: number
}

interface TrendingState {
  trending: TrendingCoin[],
  loaded: boolean
}
class Trending extends Component<TrendingProps, TrendingState> {
  constructor(props) {
    super(props)
    this.state = {
      trending: [],
      loaded: false,
    }

  }

  loadData = () => {
    const url = `https://api.coingecko.com/api/v3/search/trending`
    axios.get(url)
      .then(response => {
        const coins = response.data.coins
        const formattedList = coins.map(coin => coin.item)
        this.setState({
          trending: formattedList,
          loaded: true
        })
      })
      .catch((error) => {console.log("Something went wrong. ", error)})
  }

  componentDidMount() {    
    this.loadData()
  }

  render() {
    const { loaded, trending } = this.state
    if (loaded) {
      return (
          <PerfectScrollbar className="trending">
            {trending.slice(0, NUM_TRENDING_TO_SHOW).map((coin, i) =>
              <Link className="trending-coin" key={i} to={"/coin/" + coin.id}>
                <img key="image" src={coin.large} alt={coin.name + " logo"}/>
                <div key="name" className="name">{coin.name}</div>
                <div key="symbol" className="symbol">{coin.symbol}</div>
                <div key="price">{coin.price_btc.toFixed(10)} BTC</div>
                <div key="market-cap"><span className="label">MC rank: </span>{coin.market_cap_rank}</div>
                <div key="link" className="link">details</div>
              </Link>
            )}
          </PerfectScrollbar>
      )
    } else {
      return (
        <div className="trending">
          <div className="loading">
            <h2>Loading</h2>
          </div>
        </div>
      )
    }
  }
}

export default Trending