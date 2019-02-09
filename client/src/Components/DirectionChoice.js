import React, { Component } from "react";

class DirectionChoice extends Component {
  state = {
    n: "North",
    s: "South",
    e: "East",
    w: "West",
    token: ""
  };

  noTravel = () => {
    alert("No traveling you are already on a set path");
  };

  render() {
    return (
      <div className="buttons">
        {this.props.exits.map((exit, id) => (
          <button
            key={id}
            onClick={() =>
              this.props.traveling === "green" ||
              this.props.traveling === "blue"
                ? this.props.handleMove(exit)
                : this.noTravel
            }
          >
            {this.state[exit]}
          </button>
        ))}
      </div>
    );
  }
}

export default DirectionChoice;
