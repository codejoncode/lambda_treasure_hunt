import React, { Component } from 'react';


class WindowView extends Component {

    state = {

    }

    render () {
        let exits = ""
        for(let exit of this.props.exits){
            exits += exit + ","
        }
        
        return (
            <div className = "container">
                <div className="roomTitle">
                    <h3>{`${this.props.room_id} ${this.props.room_title}`}</h3>
                    <p>{this.props.description}</p>
                    
                    {this.props.items.map((id, item) => <span key = {id}>{item}</span>)}
                </div>

                <div className="messages">
                    {this.props.messages.map((id, message) => <p key = {id}>{message}</p>)}
                </div>
                <div className="exits">
                    <h4>Available exits: {exits} </h4>
                </div>

                <div className="errors">
                    {this.props.errors.map((id, error) => <p key = {id}>{error}</p>)}
                </div>
            </div>
        )
    }

}
export default WindowView; 

