import React, { Component } from 'react'
import './ExchangeStatusUpdate.css'
import parse from 'html-react-parser'
interface ExchangeStatusUpdateProps{
    status_updates:StatusUpdate[],
}
interface Image{
    thumb: string,
    small: string,
    large: string,
}
interface Project{
    type:string,
    id:string,
    name:string,
    image: Image
}
interface StatusUpdate{
    description:string,
    category: string,
    created_at:Date,
    user:string,
    user_title:string,
    pin:boolean,
    project:Project

}
export class ExchangeStatusUpdate extends Component<ExchangeStatusUpdateProps> {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        const {status_updates} = this.props;
        return (
            <div> News:
                {status_updates.map((status, i) => 
                    <div className="status-container" key={i+1}>
                      <div className="status-title">Title:{status.user_title}</div>
                      <div className="status-user"><div className="user-name">User:{status.user}</div><div className="created-at">Created at:{status.created_at}</div></div>
                      <div className="status-description">Description:{parse(status.description)}</div>
                    </div>  
                  )}
            </div>
        )
    }
}

export default ExchangeStatusUpdate
