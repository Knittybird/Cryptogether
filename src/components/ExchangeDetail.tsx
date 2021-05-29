import React, { Component } from 'react'
import axios from 'axios'
import ExchangeCompany from './ExchangeCompany';
import ExchangeTable from './ExchangeTable';
import ExchangeStatusUpdate from './ExchangeStatusUpdate'
import { getLineAndCharacterOfPosition } from 'typescript';
import VolumeChart from './ExchangeVolume';
import ApexCharts from "apexcharts";
import { Jumbotron } from 'react-bootstrap';

const NUM_PER_PAGE = 50
interface ExchangeDetailProps{
    id:string,
    currency:string,
}
interface Market{
    name: string,
    identifier: string,
    has_trading_incentive:string
}
interface ConvertedVolume{
    btc: number,
    eth: number,
    usd: number,
    xrp: number
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
interface Image{
    thumb: string,
    small: string,
    large: string,
}
interface Project{
    type:string,
    id:string,
    name:string,
    image: Image
}
interface StatusUpdate{
    description:string,
    category: string,
    created_at:Date,
    user:string,
    user_title:string,
    pin:boolean,
    project:Project

}
interface Exchange{
    name: string,
    year_established: number,
    country: string,
    url: string,
    image: string,
    facebook_url: string,
    centralized:boolean,
    reddit_url:string,
    other_url_1:string,
    other_url_2:string,
    trust_score:number,
    trust_score_rank:number,
    tickers: Ticker[],
    status_updates:StatusUpdate[]

}
interface ExchangeDetailState{
    loaded: boolean,
    exchange: Exchange;
    volume: [number, number][]
}

export class ExchangeDetail extends Component<ExchangeDetailProps,ExchangeDetailState> {
    constructor(props) {
        super(props)
    
        const init = {} as Exchange;
        this.state = {
             loaded: false,
             exchange: init,
             volume: []
        }
    }
    
    loadData = () => {
        const {id,currency} = this.props;
        const url = `https://api.coingecko.com/api/v3/exchanges/${id}?per_page=${NUM_PER_PAGE}`;
        const volume_url = `https://api.coingecko.com/api/v3/exchanges/${id}/volume_chart?days=7`;
        
        axios.get(url)
          .then(response => {
            const data = response.data
            
            this.setState({
              exchange: data,
              loaded: true
            })
          })
          .catch((error) => {console.log("Something went wrong. ", error)})
    }
      
      componentDidMount() {    
        this.loadData();
      }
    
      componentDidUpdate(prevProps, prevState) {    
        if (prevProps !== this.props) {
          this.loadData();
        }
      }

    render() {
        const {id, currency} = this.props;
        const {exchange, loaded, volume} = this.state;
        if(loaded) {
            return (
                <>
                <Jumbotron>
                    <VolumeChart id={this.props.id} name={exchange.name} title={'Volume over 7 days'} />
                </Jumbotron>
                <div>
                    <ExchangeCompany name={exchange.name} centralized={exchange.centralized}  image={exchange.image} trustScore={exchange.trust_score} trustScoreRank={exchange.trust_score_rank}/>
                    <ExchangeTable tickers={exchange.tickers} currency={currency} />
                    <ExchangeStatusUpdate status_updates={exchange.status_updates} />
                </div>
                </>
            )
        }else{
            return (<div>Loading</div>)
        }
        
    }
}

export default ExchangeDetail
