import React, { Component } from "react";

class MyCustomSigma extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillReceiveProps() {
    const nodes = this.props.sigma.renderers[0].nodesOnScreen;
    const edges = this.props.sigma.renderers[0].edgesOnScreen;
    const roomId = this.props.roomId;
    const edgeReg = "#282c34";
    const edgeSpecial = "#9E0023";
    const nodeReg = "#282D31";
    const nodeSpecial = "red";

    /*Update Node */
    for (let node of nodes) {
      if (String(node.id) === String(roomId)) {
        node.color = nodeSpecial;
        node.type = "diamond";
        node.size = 6;
      } else {
        node.color = nodeReg;
        node.type = "equilateral";
        node.size = 4;
      }
    }
    /*Update edges */
    for (let edge of edges) {
      if (String(edge.source) === String(roomId)) {
        edge.color = edgeSpecial;
        edge.type = "curve";
      } else {
        edge.color = edgeReg;
        edge.type = "arrow";
      }
    }

    /*Adjust the map*/
    this.props.sigma.refresh();
  }

  render() {
    return <div />;
  }
}

export default MyCustomSigma;
