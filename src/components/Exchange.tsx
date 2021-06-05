import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import ExchangeDetail from './ExchangeDetail'
import './ExchangeDetail.css'

type Props = {
  currency: string
}

type ComposedProps = Props &
  RouteComponentProps<{
    id: string
  }>

class Exchange extends Component<ComposedProps> {
  render() {
    const { id } = this.props.match.params
    const { currency } = this.props

    return (
      <div className='exchange-view'>
        <ExchangeDetail id={id} currency={currency} />
      </div>
    )
  }
}

export default withRouter(Exchange)
