import React, { Component } from "react";

class Movement extends Component {
  state = {};

  render() {
    //access to this.props.graphLength which is the length of the graph should be 500 
    //if it is less than 500 there is no need to to have an automate button. 
    console.log("Graph length", this.props.graphLength)
    return (
      <div>
        
        <input
          onChange={this.props.handleChange}
          type="text"
          name="token"
          value={this.props.token}
          
        />
        {this.props.graphLength < 500 ? (
          <div>Find all rooms</div>
        ) : (
          <button>Go to Room</button>
        )}

        {this.props.graphLength < 500 ? <button onClick={this.props.handleAuto}>Find Rooms</button> : <div>Map Complete</div> }
        
      </div>
    );
  }
}

export default Movement;
