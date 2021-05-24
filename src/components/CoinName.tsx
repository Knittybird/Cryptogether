import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
const NUM_PER_PAGE = 50
interface CoinNameProps{
    id:string,
    currency:string
}
interface CoinImage {
    thumb: string ;
    small: string ;
    large: string ;  
}
interface Description{
    en: string;
}

interface Coin {
    id: string;
    symbol: string;
    name: string;
    image: CoinImage;
    description: Description;
    
  }
interface CoinNameState{
    loaded:boolean,
    coin:Coin
}
export class CoinName extends Component<CoinNameProps, CoinNameState> {
    constructor(props) {
        super(props)
    
        const init = {} as Coin;
        this.state = {
             loaded:false,
             coin:init
        }
    }
    loadData = () => {
        const {id} = this.props;
        const url = `https://api.coingecko.com/api/v3/coins/${id}?per_page=${NUM_PER_PAGE}`;
        
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
    render() {
        const {id,currency} = this.props;
        const {coin, loaded} = this.state;
        
        if(coin.image){
            return (
                <div>
                    <Link className="base-coin" to={"/coin/" + coin.id}><img src={coin.image.thumb} alt="no image"/> {coin.name}</Link>
                </div>
            )
        }else{
            return (<div>Loading</div>)
        }
        
    }
}

export default CoinName
