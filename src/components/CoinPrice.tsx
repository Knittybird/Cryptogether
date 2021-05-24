import React, { Component } from 'react'
import axios from 'axios'
interface CoinPriceProps{
    id:string,
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
  interface CoinPriceState{
      coin:Coin,
      loaded:boolean
  }
export class CoinPrice extends Component<CoinPriceProps, CoinPriceState> {
    constructor(props) {
        super(props)
    
        const init = {} as Coin;
        this.state = {
             loaded:false,
             coin: init
        }
    }
    loadData = () => {
        const {id, currency} = this.props;
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
        console.log(url);
        axios.get(url)
          .then(response => {
            const data = response.data[0]
            console.log(data);
            this.setState({
              coin: data,
              loaded: true
            })
          })
          .catch((error) => {console.log("Something went wrong. ", error)})
      }
    
      componentDidMount() {    
        this.loadData()
      }
    
      componentDidUpdate(prevProps, prevState) {    
        if (prevProps.currency !== this.props.currency) {
          this.loadData()
        }
      }
    render() {
        const {coin, loaded} = this.state;
        //console.log(coin)

        if(loaded){
            return (
                <div>
                    {coin.current_price}
                </div>
            )
        }else{
            return (
                <div>
                    Loading
                </div>
            )
        }
        
    }
}

export default CoinPrice
