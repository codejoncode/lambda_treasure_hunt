import React, { Component } from "react";

class Movement extends Component {
  state = {};

  noTravel = () => {
    alert("No traveling you are already on a set path");
  };

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
        ) : (
          <input
            type="range"
            min="0"
            max="499"
            className="slider"
            id="myRange"
            name="roomNumberToGoTo"
            value={this.props.roomNumberToGoTo}
            onChange={this.props.handleChange}
          />
        )}
        <br />
        {this.props.graphLength < 500 ? (
          <div>Find all rooms</div>
        ) : (
          <button
            onClick={
              this.props.traveling === "green" ||
              this.props.traveling === "blue"
                ? this.props.goToRoom
                : this.noTravel
            }
          >
            Go to Room {this.props.roomNumberToGoTo}
          </button>
        )}

        {this.props.treasureBag.length > 0 ? (
          <button onClick={this.props.goToShop}>Go To Shop</button>
        ) : (
          <div />
        )}
        {Number(this.props.roomId) === 1 &&
        this.props.treasureBag.length > 0 && (this.props.traveling === "green" || this.props.traveling === "blue") ? (
          <button onClick={this.props.sellItemsInBag}>Sell Items</button>
        ) : (
          <div />
        )}

        {this.props.graphLength < 500 ? (
          <button
            onClick={
              this.props.traveling === "green" ||
              this.props.traveling === "blue"
                ? this.props.handleAuto
                : this.noTravel
            }
          >
            Find Rooms
          </button>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default Movement;
