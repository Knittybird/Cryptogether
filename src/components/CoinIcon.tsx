import React, { Component } from 'react'
import {RouteComponentProps} from 'react-router'
import {Img} from 'react-image'
import axios from 'axios';
import './CoinDetail.css'
interface CoinIconProps{
    name : string;
    symbol: string;
    image : string;
    
}

class CoinIcon extends Component<CoinIconProps> {
    constructor(props) {
        super(props)
    
    }
    
    
      
    render() {
        const {name, symbol, image} = this.props;
        return (
            <div className="coin-icon-container">
                <div className="coin-icon-image"> <img src={image} /></div>
                <div className="coin-icon-name">{name}</div>
                <div className="coin-icon-symbol">{symbol.toUpperCase()}</div>
                
            </div>
        )
    }
}

export default CoinIcon
