import React, { Component } from "react";

class Title extends Component {
  render() {
    const title = "Lambda Treasure Hunt".split("");
    return (
      <div className="animation-title">
        {title.map((letter, id) => (
          <span
            className={
              id % 3 === 0
                ? "title-first"
                : id % 3 === 1
                ? "title-second"
                : "title-third"
            }
            key={id}
          >
            {letter}
          </span>
        ))}
      </div>
    );
  }
}

export default Title;
