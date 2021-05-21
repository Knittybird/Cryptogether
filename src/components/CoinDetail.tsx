import React, { Component } from 'react'
import axios from 'axios';
import CoinIcon from './CoinIcon';
interface CoinDetailProps{
    id:string;
}
interface CoinImage {
    thumb: string ;
    small: string ;
    large: string ;
  }
  interface CoinState{
      coin : Coin;
      loaded: boolean;
  }
  interface Coin {
      id: string,
      symbol: string,
      name: string,
      image: CoinImage | null,
      description: string
    }
export class CoinDetail extends Component<CoinDetailProps,CoinState> {
    constructor(props) {
        super(props)
    
        
        const initial = {} as Coin;
        this.state = {
             coin : initial,
             loaded: false,
             
        }
    }
    loadData = () => {
        const {id} = this.props;
        const url = `https://api.coingecko.com/api/v3/coins/${id}`;
        
        axios.get(url)
          .then(response => {
            const data = response.data
            
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
        if (prevProps !== this.props) {
          this.loadData();
        }
      }
    render() 
    {
        const {loaded, coin} = this.state;
        console.log("coin image:" + coin.image.small)
        return (
            <div>
                <CoinIcon name={coin.name} symbol = {coin.symbol} image={coin.image.small} />
            </div>
        )
    }
}

export default CoinDetail
