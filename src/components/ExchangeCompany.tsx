import React, { Component } from 'react'

interface ExchangeCompanyProps{
    name:string,
    image:string,
    centralized:boolean,
    trustScore:number,
    trustScoreRank:number
}
export class ExchangeCompany extends Component<ExchangeCompanyProps> {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        const {name, image,centralized, trustScore, trustScoreRank} = this.props;
        
        return (
            <div className="company-container">
                <div className="company-image"><img src={image} alt="binance image" /></div>
                <div className="company-title">
                    <div className="company-name">{name}</div>
                    <div className="company-centralized">
                        {centralized? 'Centralized' : ''}</div>
                </div>
                <div className="company-trust-score">
                    <div className="company-score">{trustScore}</div>
                    <div className="company-rank">{trustScoreRank}</div>
                </div>
            </div>
        )
    }
}

export default ExchangeCompany
