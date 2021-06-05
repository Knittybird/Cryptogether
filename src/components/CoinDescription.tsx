import React, { Component } from 'react'
import parse from 'html-react-parser'

interface CoinDescriptionProps {
  name: string
  description: string
}

export class CoinDescription extends Component<CoinDescriptionProps> {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { name, description } = this.props
    if (description === '') {
      return <div className='coin-description-container'></div>
    } else
      return (
        <div className='coin-description-container'>
          <div className='title'>About {name}</div>
          <div className='content'>{parse(description)}</div>
        </div>
      )
  }
}

export default CoinDescription
