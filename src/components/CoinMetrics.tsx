import React, { Component } from 'react'
import axios from 'axios';
interface CoinMetricsProps {
    id: string,
    currency:string
}
interface Coin {
    id: string,
    symbol: string,
    name: string,
    image: string,
    current_price: number,
    market_cap: number,
    market_cap_rank: number,
    fully_diluted_valuation: number,
    total_volume: number,
    high_24h: number,
    low_24h: number,
    price_change_24h: number,
    price_change_percentage_24h: number,
    market_cap_change_24h: number,
    market_cap_change_percentage_24h: number,
    circulating_supply: number,
    total_supply: number,
    max_supply: number,
    ath: number,
    ath_change_percentage: number,
    ath_date: Date,
    atl: number,
    atl_change_percentage: number,
    atl_date: Date,
    roi: string,
    last_updated: Date
  }

  interface CoinMetricsState{
    coin: Coin,
    loaded: boolean
  }
export class CoinMetrics extends Component<CoinMetricsProps,CoinMetricsState> {
    constructor(props) {
        super(props)
    
        const init = {} as Coin;
        this.state = {
            coin: init,
            loaded:false         
        }
    }
    loadData = () => {
        const {id,currency} = this.props;
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
        
        axios.get(url)
          .then(response => {
            const data = response.data[0]
            //console.log(data.market_data.current_price.usd)
            this.setState({
              coin: data,
              loaded: true
            })
          })
          .catch((error) => {console.log("Something went wrong. ", error)})
      }
      componentDidMount() {    
        this.loadData();
      }
    
      componentDidUpdate(prevProps, prevState) {    
        if (prevProps.currency !== this.props.currency) {
          this.loadData();
        }
      }
    render() {
        const {id, currency} = this.props;
        const {loaded, coin} = this.state;
        return (
            <div> Key Metrics:
                <div>24 Hour High {coin.high_24h}</div>
                <div>24 Hour Low {coin.low_24h}</div>
                <div>Net Change {coin.price_change_24h}</div>
                <div>All Time High {coin.ath}</div>
                <div>All Time Low {coin.atl}</div>
                <div>Returns (24h) {coin.price_change_percentage_24h}</div>
                <div>Total Supply {coin.circulating_supply}</div>
            </div>
        )
    }
}

export default CoinMetrics
