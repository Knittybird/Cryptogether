import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import axios from 'axios'

const NUM_PER_PAGE = 50
interface ExchangeTableProps{
    tickers: Ticker[],
    currency: string
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
    
    converted_volume:ConvertedVolume,
    trust_score: string,
    bid_ask_spread_percentage: number,
    last_traded_at: Date,
    trade_url: string,
    coin_id: string,
    target_coin_id: string
}

export class ExchangeTable extends Component<ExchangeTableProps> {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    
    render() {
        
        const {tickers, currency } = this.props;
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
                        <th key={3}>Last Price</th>
                        <th key={4}>Spread</th>
                        
                        <th key={7}>24h Volume</th>
                        <th key={8}>Last Traded</th>
                        <th key={9}>Trust Score</th>
                        </tr>
                        {tickers.map((ticker, i) => 
                        <tr key={i+1}>
                            <td key={0}>{i+1}</td>
                            <td key={1}><Link className="base-coin" to={"/coin/" + ticker.coin_id}>{ticker.base}</Link></td>
                            <td key={2}><a href={ticker.trade_url}>{ticker.base}/{ticker.target}</a></td>
                            <td key={3}>${ticker.last}</td>
                            <td key={4}>{ticker.bid_ask_spread_percentage * 100} %</td>
                            <td key={7}>${ticker.converted_volume.usd}</td>
                            <td key={8}>{new Date(ticker.last_traded_at).toLocaleString()}</td>
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
