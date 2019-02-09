import React, { Component } from 'react';
import WindowView from './WindowView';



class Screen extends Component {
    state = {

    }

    render () {       
        return (
            <div className = "container screen">
                <div className = "row">
                    <div className="errors col">
                        {this.props.errors.map((id, error) => <p key = {id}>{error}</p>)}
                    </div>
                </div>
                
                <div className="led-box">
                    <div className={`led-${this.props.traveling}`}>
                        
                    </div>
                </div>
                <WindowView room_title = {this.props.room_title} room_id = {this.props.room_id} messages = {this.props.messages} exits = {this.props.exits}
                errors = {this.props.errors} description = {this.props.description} items = {this.props.items} players = {this.props.players}
                    traveling = {this.props.traveling}
                />


                
                

            </div>
        )
    }
}

export default Screen;