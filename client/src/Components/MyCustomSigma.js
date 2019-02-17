import React, { Component } from "react";

import { Sigma, RelativeSize } from "react-sigma";

class MyCustomSigma extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentWillReceiveProps() {
    const nodes = this.props.sigma.renderers[0].nodesOnScreen
    console.log(nodes)
    const edges = this.props.sigma.renderers[0].edgesOnScreen
    const roomId = this.props.roomId;
    const edgeReg = "#282c34"
    const edgeSpecial = "#9E0023"
    const nodeReg = "#282D31"
    const nodeSpecial = "red"
    let xCoor = null 
    let yCoor = null 

    /*Update Node */
    for(let node of nodes){
        if(String(node.id) === String(roomId)){
            node.color = nodeSpecial
            node.type = "diamond"
            node.size = 6
            node.label = ``
            xCoor = node.x
            yCoor = node.y
        } else {
            node.color = nodeReg
            node.type = "equilateral"
            node.size = 4
            node.label = `${node.id}`
        }
    }
    /*Update edges */
    for (let edge of edges){
        if(String(edge.source) === String(roomId)){
            edge.color = edgeSpecial;
            edge.type = "curve";
        } else {
            edge.color = edgeReg; 
            edge.type = "arrow";
        }
    }

    /*Adjust the map*/
    this.props.sigma.refresh()

  }

  getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  render() {
    
    console.log(this.props.sigma.camera)
    console.log(this.props.sigma)
    
    return (
      <div></div>
    );
  }
}

export default MyCustomSigma;
