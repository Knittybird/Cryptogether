import { Component } from 'react'
import { Link } from 'react-router-dom';
import SimpleNum from './SimpleNum';
import SimplePercentage from './SimplePercentage';
import './ExchangeTable.css'

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
        
        const {tickers} = this.props;
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
            <div className="exchangeList-container">
                <div className="exchangeList-overview">
                    <div className="total-trade-volume-24h">
                        <div className="title">TOTAL 24H VOLUME</div>
                        <div className="value"> $<SimpleNum value={totalTradingVolum} /></div>
                    </div>
                    <div className="number-coins">
                        <div className="title">TOTAL COINS</div>
                        <div className="value">{coinList.length}</div>
                    </div>
                    <div className="number-pairs">
                        <div className="title">TOTAL PAIRs</div>
                        <div className="value">{totalPairs}</div>
                    </div>
                </div>
                <table className="exchangeList table">
                    <tbody>
                        <tr key={0}>
                        <th key={0} className="d-none d-sm-table-cell">#</th>
                        <th key={1} className="text-end">Coin</th>
                        <th key={2} className="text-end">Pair</th>
                        <th key={3} className="d-none d-sm-table-cell">Last Price</th>
                        <th key={4} className="d-none d-sm-table-cell">Spread</th>
                        
                        <th key={7} className="text-end">24h Volume</th>
                        <th key={8} className="d-none d-sm-table-cell">Last Traded</th>
                        <th key={9} className="d-none d-sm-table-cell">Trust Score</th>
                        </tr>
                        {tickers.map((ticker, i) => 
                        <tr key={i+1}>
                            <td key={0} className="d-none d-sm-table-cell">{i+1}</td>
                            <td key={1} className="text-end"><Link className="base-coin" to={"/coin/" + ticker.coin_id}>{ticker.base}</Link></td>
                            <td key={2} className="text-end"><a href={ticker.trade_url}>{ticker.base}/{ticker.target}</a></td>
                            <td key={3} className="d-none d-sm-table-cell">${ticker.last}</td>
                            <td key={4} className="d-none d-sm-table-cell"><SimplePercentage value={ticker.bid_ask_spread_percentage} /></td>
                            <td key={7} className="text-end">$<SimpleNum value={ticker.converted_volume.usd} /></td>
                            <td key={8} className="d-none d-sm-table-cell">{new Date(ticker.last_traded_at).toLocaleString()}</td>
                            <td key={9} className="d-none d-sm-table-cell">{
                                ticker.trust_score === 'green' ? <span className="trust-score-green">good</span> :
                                (ticker.trust_score === 'yellow' ? <span className='trust-score-yellow'>fair</span> : <span className="trust-score-red">poor</span>)                            }
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
            
    }
}

export default ExchangeTable
