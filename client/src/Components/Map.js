import React, { Component } from "react";

import { Sigma, RelativeSize } from "react-sigma";
class Map extends Component {
  state = {
    // display : {},
    updated: false
  };
  componentDidMount() {
    this.setState({
      display: this.props.display,
      updated: !this.state.updated
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps.display) !== JSON.stringify(this.props.display)
    ) {
      this.setState({ display: this.props.display, updated: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevProps.display) !== JSON.stringify(this.props.display)
    ) {
      this.setState({ display: this.props.display, updated: true });
    }
  }

  getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  render() {
    const updatedGraph = Object.assign({}, this.props.graph);
    const nodes = [];
    const edges = [];
    const roomId = this.props.roomId;
    for (let g in updatedGraph) {
      let temp = {};
      if (Number(g) === Number(roomId)) {
        temp = {
          id: g,
          label: `${g}`,
          x: this.props.coor[g][0],
          y: this.props.coor[g][1],
          size: 15,
          color: "red",
          borderColor: this.getRandomColor(),
          type: "diamond"
        };
      } else {
        temp = {
          id: g,
          label: `${g}`,
          x: this.props.coor[g][0],
          y: this.props.coor[g][1],
          size: 1,
          color: "#282D31",
          borderColor: this.getRandomColor(),
          type: "equilateral"
        };
      }
      nodes.push(temp);
    }

    let count = 0;
    for (let g in updatedGraph) {
      for (let d in updatedGraph[g]) {
        const id = `id${count}`;
        count += 1;
        if (updatedGraph[g][d] !== null) {
          if (Number(g) === Number(roomId)) {
            const temp = {
              id: id,
              source: g,
              target: updatedGraph[g][d],
              color: "#9E0023",
              type: "curve",
              size: 0.5
            };
            edges.push(temp);
          } else {
            const temp = {
              id: id,
              source: g,
              target: updatedGraph[g][d],
              color: "#282c34",
              type: "arrow",
              size: 0.5
            };
            edges.push(temp);
          }
          // const temp = {id: id, source: g, target: updatedGraph[g][d], color: '#282c34',  type: "arrow", size: 0.5 }
          // edges.push(temp)
        }
      }
    }
    const display = {
      nodes,
      edges
    };
    if (this.props.initialize && this.state.updated) {
      return (
        <div className="changeCanvas">
          {this.props.roomId}
          <div className="mapping">
            <Sigma
              renderer="canvas"
              style={{ maxWidth: "inherit", height: "800px" }}
              settings={{ drawEdges: true, clone: true }}
              graph={display}
            >
              <RelativeSize initialSize={15} />
            </Sigma>
          </div>
        </div>
      );
    } else {
      return <div>MUST INITIALIZE</div>;
    }
  }
}

export default Map;
