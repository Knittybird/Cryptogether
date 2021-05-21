import React, { Component } from 'react'
import {RouteComponentProps} from 'react-router'
import {Img} from 'react-image'
import axios from 'axios';
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
            <div className="coin-icon">
                <div className="coin-name">{name}</div>
                <div className="coin-symbol">{symbol.toUpperCase()}</div>
                <div className="coin-image"><Img src= {image} /></div>
            </div>
        )
    }
}

export default CoinIcon
