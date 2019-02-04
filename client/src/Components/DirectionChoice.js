import React, { Component } from "react";

class DirectionChoice extends Component {
  state = {
    n: "North",
    s: "South",
    e: "East",
    w: "West",
    token : "",
  };

  render() {
    return (
      <div className="buttons">
        {this.props.exits.map((exit, id) => (
          <button key={id} onClick={() => this.props.handleMove(exit)}>
            {this.state[exit]}
          </button>
        ))}
        
      </div>
    );
  }
}

export default DirectionChoice;
