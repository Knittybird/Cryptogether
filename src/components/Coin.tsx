import React, { Component } from 'react'
import {RouteComponentProps} from 'react-router'
import axios from 'axios';

import CurrencySelector from './CurrencySelector';
import CoinDetail from './CoinDetail'
interface CoinProps {
  id: string;
  currency: string;
}
class Coin extends Component<RouteComponentProps<CoinProps>> {
  constructor(props) {
    super(props)
    
  }
  render() {
    const {id} = this.props.match.params;
    const {currency} = this.props;
    return (
        
      <div className="coinView">
        <CoinDetail id={id} />
      </div>
    )
  }
}

export default Coin