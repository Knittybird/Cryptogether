import React, { Component } from 'react'

interface ExchangeCompanyProps {
  name: string
  image: string
  centralized: boolean
  trustScore: number
  trustScoreRank: number
}
export class ExchangeCompany extends Component<ExchangeCompanyProps> {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { name, image, centralized, trustScore, trustScoreRank } =
      this.props

    return (
      <div className='container'>
        <div className='company-container'>
          <div className='company-title-container'>
            <div className='company-image'>
              <img src={image} alt={name + ' logo'} />
            </div>
            <div className='company-title'>
              <h1 className='company-name'>{name}</h1>
              <div className='company-centralized'>
                {centralized ? 'Centralized' : ''}
              </div>
            </div>
          </div>
          <div className='company-trust-score'>
            <div className='company-score'>
              <div className='value'>{trustScore}</div>
              <div className='title'>Trust Score</div>
            </div>
            <div className='line'></div>
            <div className='company-rank'>
              <div className='title'>RANK</div>
              <div className='value'>{trustScoreRank}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ExchangeCompany
