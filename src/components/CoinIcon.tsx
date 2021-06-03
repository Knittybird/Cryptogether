import React, { Component } from 'react'
import './CoinDetail.css'
interface CoinIconProps{
    name : string;
    symbol: string;
    image : string;
    
}

class CoinIcon extends Component<CoinIconProps> {
    render() {
        const {name, symbol, image} = this.props;
        return (
            <div className="coin-icon-container">
                <div className="coin-icon-image"> <img src={image} alt={name + " logo"}/></div>
                <h1 className="coin-icon-name">{name}</h1>
                <div className="coin-icon-symbol">{symbol.toUpperCase()}</div>
                
            </div>
        )
    }
}

export default CoinIcon
