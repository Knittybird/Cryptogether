import React, { Component } from 'react'
import {RouteComponentProps, withRouter} from 'react-router'
import axios from 'axios';
import CurrencySelector from './CurrencySelector';
import CoinDetail from './CoinDetail'


type Props = {
  currency: string
}

type ComposedProps = Props & RouteComponentProps<{
  id: string
}>


class Coin extends Component<ComposedProps> {
  constructor(props) {
    super(props)
    
  }
  render() {
    const {id} = this.props.match.params;
    const {currency} = this.props;
    
    return (
        
      <div className="coinView">
        <CoinDetail id={id} currency={currency} />
        
      </div>
    )
  }
}

export default withRouter(Coin)