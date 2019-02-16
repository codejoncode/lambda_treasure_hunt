import React, { Component } from "react";

class WindowView extends Component {
  state = {};

  render() {
    let exits = "";
    for (let exit of this.props.exits) {
      exits += exit + ",";
    }

    return (
      <div className="container">
        <div className="roomTitle">
          <h3>{`${this.props.room_id} ${this.props.room_title}`}</h3>
          <p>{this.props.description}</p>

          {this.props.items.map((item, id) => (
            <span key={id}>{ ` ${item} ` }</span>
          ))}
          {this.props.items.length ? <button onClick = {this.props.take}>Bag Treasure </button> : <div></div>}
        </div>

        <div className="messages">
          {this.props.messages.map((message,id) => (
            <p key={id}>{message}</p>
          ))}
        </div>
        <div className="exits">
          <h4>Available exits: {exits} </h4>
        </div>

        <div className="errors">
          {this.props.errors.map((error, id) => (
            <p key={id}>{error}</p>
          ))}
        </div>
        <div>You have ${this.props.gold} value in Gold!</div>
      </div>
    );
  }
}
export default WindowView;
