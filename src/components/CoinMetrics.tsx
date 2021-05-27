import React, { Component } from 'react'
import axios from 'axios';
import SimpleNumber from './SimpleNum'
import SimpleNum from './SimpleNum';
import SimplePercentage from './SimplePercentage'
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
        switch(currency){
          case 'usd':
            return (
              <div className="coin-key-metrics">
                  <div className="metrics-title"> Key Metrics </div>
                  <div className="metrics-container">
                    <table>
                      <tr>
                        <td>
                          <div className="h_high"><div className="title">24 HOUR HIGH </div> <div className="value">$<SimpleNum value={coin.high_24h} /></div></div>
                        </td>
                        <td>
                          <div className="h_low"><div className="title">24 HOUR LOW</div> <div className="value">$<SimpleNum value={coin.low_24h} /></div> </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="net_change"><div className="title">NET CHANGE</div><div className="value">${coin.price_change_24h}</div> </div>
                        </td>
                        <td>
                          <div className="ath"><div className="title">ALL TIME HIGH</div><div className="value">$<SimpleNum value={coin.ath}/></div> </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="atl"><div className="title">ALL TIME LOW</div><div className="value">$<SimpleNum value={coin.atl} /></div> </div>
                        </td>
                        <td>
                        <div className="return"><div className="title">RETURN (24H)</div><div className="value"><SimplePercentage value={coin.price_change_percentage_24h}/></div> </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                        <div className="supply"><div className="title">TOTAL SUPPLY</div><div className="value">$<SimpleNum value={coin.circulating_supply} /></div> </div>
                        </td>
                        <td>
                        </td>
                      </tr>
                    </table>
                  </div> 
              </div>
          )
          case 'jpy':

            return (
              <div className="coin-key-metrics">
                  <div className="metrics-title"> Key Metrics </div>
                  <div className="metrics-container">
                    <table>
                      <tr>
                        <td>
                          <div className="h_high"><div className="title">24 HOUR HIGH </div> <div className="value">¥<SimpleNum value={coin.high_24h} /></div></div>
                        </td>
                        <td>
                          <div className="h_low"><div className="title">24 HOUR LOW</div> <div className="value">¥<SimpleNum value={coin.low_24h} /></div> </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="net_change"><div className="title">NET CHANGE</div><div className="value">¥{coin.price_change_24h}</div> </div>
                        </td>
                        <td>
                          <div className="ath"><div className="title">ALL TIME HIGH</div><div className="value">¥<SimpleNum value={coin.ath}/></div> </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="atl"><div className="title">ALL TIME LOW</div><div className="value">¥<SimpleNum value={coin.atl} /></div> </div>
                        </td>
                        <td>
                        <div className="return"><div className="title">RETURN (24H)</div><div className="value"><SimplePercentage value={coin.price_change_percentage_24h}/></div> </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                        <div className="supply"><div className="title">TOTAL SUPPLY</div><div className="value">¥<SimpleNum value={coin.circulating_supply} /></div> </div>
                        </td>
                        <td>
                        </td>
                      </tr>
                    </table>
                  </div> 
              </div>
          )
          case 'eur':
            return (
              <div className="coin-key-metrics">
                  <div className="metrics-title"> Key Metrics </div>
                  <div className="metrics-container">
                    <table>
                      <tr>
                        <td>
                          <div className="h_high"><div className="title">24 HOUR HIGH </div> <div className="value">€<SimpleNum value={coin.high_24h} /></div></div>
                        </td>
                        <td>
                          <div className="h_low"><div className="title">24 HOUR LOW</div> <div className="value">€<SimpleNum value={coin.low_24h} /></div> </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="net_change"><div className="title">NET CHANGE</div><div className="value">€{coin.price_change_24h}</div> </div>
                        </td>
                        <td>
                          <div className="ath"><div className="title">ALL TIME HIGH</div><div className="value">€<SimpleNum value={coin.ath}/></div> </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="atl"><div className="title">ALL TIME LOW</div><div className="value">€<SimpleNum value={coin.atl} /></div> </div>
                        </td>
                        <td>
                        <div className="return"><div className="title">RETURN (24H)</div><div className="value"><SimplePercentage value={coin.price_change_percentage_24h} /></div> </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                        <div className="supply"><div className="title">TOTAL SUPPLY</div><div className="value">€<SimpleNum value={coin.circulating_supply} /></div> </div>
                        </td>
                        <td>
                        </td>
                      </tr>
                    </table>
                  </div> 
              </div>
          )
        }
        
    }
}

export default CoinMetrics
