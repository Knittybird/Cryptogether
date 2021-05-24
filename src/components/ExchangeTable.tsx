import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import CoinName from './CoinName';
import axios from 'axios'
import CoinPrice from './CoinPrice';
const NUM_PER_PAGE = 50
interface ExchangeTableProps{
    id:string,
    currency:string

}
interface Market{
    name: string,
    identifier: string,
    has_trading_incentive:string
}
interface ConvertedVolume{
    btc: number,
    eth: number,
    usd: number
}
interface Ticker{
    base: string,
    target:string,
    market:Market,
    last:number,
    volume:number,
    cost_to_move_up_usd:number,
    cost_to_move_down_usd:number,
    converted_volume:ConvertedVolume,
    trust_score: string,
    bid_ask_spread_percentage: number,
    last_traded_at: Date,
    trade_url: string,
    coin_id: string,
    target_coin_id: string
}
interface ExchangeTableState{
    loaded:boolean,
    tickers: Ticker[]
}
export class ExchangeTable extends Component<ExchangeTableProps,ExchangeTableState> {
    constructor(props) {
        super(props)
    
        this.state = {
             loaded: false,
             tickers: []
        }
    }
    loadData = () => {
        const {id,currency} = this.props;
        const url = `https://api.coingecko.com/api/v3/exchanges/${id}/tickers?depth=true&per_page=${NUM_PER_PAGE}`;
        
        axios.get(url)
          .then(response => {
            const data = response.data.tickers;
            
            this.setState({
              tickers: data,
              loaded: true
            })
          })
          .catch((error) => {console.log("Something went wrong. ", error)})
      }
      componentDidMount() {    
        this.loadData();
      }
    
      componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id) {
          this.loadData();
        }
      }
    render() {
        const {id,currency} = this.props;
        const {tickers, loaded} = this.state;
        let totalTradingVolum = 0
        let totalPairs = 0
        let coinList = [] as string[]
        tickers.forEach(ticker => {
            totalTradingVolum += ticker.converted_volume.usd;
            totalPairs++;
            if(!coinList.includes(ticker.base)){
                coinList.push(ticker.base);
            }
        });

        if(!loaded){
            return (<div>Loading</div>)
        }else
            return (
            <div>
                <div>
                    <div className="total-trade-volume-24h">Total 24h Volume: ${totalTradingVolum}</div>
                    <div className="number-coins">Total coins: {coinList.length}</div>
                    <div className="number-pairs">Total pairs: {totalPairs}</div>
                </div>
                <table className="exchangeList table">
                    <tbody>
                        <tr key={0}>
                        <th key={0}>#</th>
                        <th key={1}>Coin</th>
                        <th key={2}>Pair</th>
                        <th key={3}>Price</th>
                        <th key={4}>Spread</th>
                        <th key={5}>+2% Depth</th>
                        <th key={6}>-2% Depth</th>
                        <th key={7}>24h Volume</th>
                        <th key={8}>Last Traded</th>
                        <th key={9}>Trust Score</th>
                        </tr>
                        {tickers.map((ticker, i) => 
                        <tr key={i+1}>
                            <td key={0}>{i+1}</td>
                            
                            <td key={1}><CoinName id={ticker.coin_id} currency={currency} /></td>
                            <td key={2}><a href={ticker.trade_url}>{ticker.base}/{ticker.target}</a></td>
                            <td key={3}><CoinPrice id={ticker.coin_id} currency={currency} /></td>
                            <td key={4}>{ticker.bid_ask_spread_percentage}</td>
                            <td key={5}>{ticker.cost_to_move_up_usd}</td>
                            <td key={6}>{ticker.cost_to_move_down_usd}</td>
                            <td key={7}>${ticker.converted_volume.usd}</td>
                            <td key={8}>{ticker.last_traded_at}</td>
                            <td key={9}>{ticker.trust_score}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ExchangeTable
