import React, { Component } from 'react'
import parse from 'html-react-parser'

interface CoinDescriptionProps{
    name :string;
    description:string
}

export class CoinDescription extends Component<CoinDescriptionProps> {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        const {name,description} = this.props;
        console.log("name" + name);
        console.log("description:" +description);
        return (
            <div>
                <div className="description-title">Name: {name}</div>
                <div className="description-content">Description: {parse(description)}</div>
            </div>
        )
    }
}

export default CoinDescription
