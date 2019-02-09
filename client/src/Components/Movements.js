import React, { Component } from "react";

class Movement extends Component {
  state = {};

  noTravel = () => {
    alert("No traveling you are already on a set path");
  }

  render() {
    //access to this.props.graphLength which is the length of the graph should be 500 
    //if it is less than 500 there is no need to to have an automate button. 
    return (
      <div>
        {this.props.graphLength < 500 ? (
          <input
          onChange={this.props.handleChange}
          type="text"
          name="token"
          value={this.props.token}
          
        />
        ) : (<input
        type="range"
        min="0"
        max="499"
        className="slider"
        id="myRange"
        name="roomNumberToGoTo"
        value={this.props.roomNumberToGoTo}
        onChange={this.props.handleChange}
        />)}       
        <br/>
        {this.props.graphLength < 500 ? (
          <div>Find all rooms</div>
        ) : (
          <button onClick = {this.props.goToRoom}>Go to Room {this.props.traveling === 'green' ? this.props.roomNumberToGoTo : this.noTravel}</button>
        )}

        {this.props.graphLength < 500 ? <button onClick={this.props.traveling === 'green' ? this.props.handleAuto : this.noTravel}>Find Rooms</button> : <div></div> }
        
      </div>
    );
  }
}

export default Movement;
