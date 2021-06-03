import { Component } from 'react'
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
        if(status_updates.length !== 0)
            return (
                <div className="news-container"> 
                    <h2>Latest News</h2>
                    {status_updates.map((status, i) => 
                        <div className="status-container" key={i+1}>
                        <div className="status-title">{status.user_title}</div>
                        <div className="status-user">
                            <div className="user-name">wrote by: {status.user} </div>
                            <div className="created-at">published by: {new Date(status.created_at).toLocaleString()}</div>
                        </div>
                        <div className="status-description">{parse(status.description)}</div>
                        </div>  
                    )}
                </div>
            )
        else{
            return <div></div>
        }
    }
}

export default ExchangeStatusUpdate
