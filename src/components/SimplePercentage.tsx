import React, { Component } from 'react'
import ColorNumber from './ColorNum'
interface SimplePercentageProps{
    value:number
}
export class SimplePercentage extends Component<SimplePercentageProps> {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        const {value} = this.props;
        const shorten_number = Math.round(value * 100) / 100
        return (
            <span>
                <ColorNumber value={shorten_number} suffix="%" />
            </span>
        )
    }
}

export default SimplePercentage
