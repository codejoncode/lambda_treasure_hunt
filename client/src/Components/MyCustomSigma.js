import React, { Component } from "react";

import { Sigma, RelativeSize } from "react-sigma";

class MyCustomSigma extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentWillReceiveProps() {
    // this.props.sigma.graph.kill()
    console.log(this.props.sigma)
    // console.log(this.props.sigma.graph.nodes())
      
    // const updatedGraph = Object.assign({}, this.props.display)
    const nodes = this.props.sigma.graph.nodes()
    // for(let node of nodes){
    //     console.log(node)
    //     node.borderColor = "white";
    // }

    const coors  = Object.assign({}, this.props.coor)
    // console.log(coors)
    console.log(coors[0])
    // let graph = []
    // const nodes = [];
    // const edges = [];
    const roomId = this.props.roomId;
    console.log(roomId, "roomId")
    // for (let g in updatedGraph.nodes) {
    // //   this.props.sigma.graph.dropNode(g)
    //   let temp = {};
      
    //   const xCoor = coors[g][0]
    //   const yCoor = coors[g][1]
    //   const key = String(g)
    //   if (Number(g) === Number(roomId)) {
    //     console.log(`comparison worked ${g}, ${roomId}`)
    //     temp = {
    //       id: g,
    //       label: `At ${g}`,
    //       x: xCoor,
    //       y: yCoor,
    //       size: 15,
    //       color: "red",
    //       borderColor: this.getRandomColor(),
    //       type: "diamond"
    //     };
    //   } else {
    //     temp = {
    //       id: g,
    //       label: `${g}`,
    //       x: xCoor,
    //       y: yCoor,
    //       size: 1,
    //       color: "#282D31",
    //       borderColor: this.getRandomColor(),
    //       type: "equilateral"
    //     };
    //   }
    // //   nodes.push(temp);
    // this.props.sigma.graph.addNode(temp)
    // }

    // let count = 0;
    // for (let g in updatedGraph.edges) {
    //   for (let d in updatedGraph[g]) {
    //     const id = `id${count}`
    //     count += 1;
    //     if (updatedGraph[g][d] !== null) {
    //       if (Number(g) === Number(roomId)) {
    //         console.log(`comparison worked ${g}, ${roomId}, ${count}`)
    //         const temp = {
    //           id: id,
    //           source: g,
    //           target: updatedGraph[g][d],
    //           color: "#9E0023",
    //           type: "curve",
    //           size: 0.5
    //         };
    //         // edges.push(temp);
    //         this.props.sigma.graph.AddEdge(temp)
    //       } else {
    //         const temp = {
    //           id: id,
    //           source: g,
    //           target: updatedGraph[g][d],
    //           color: "#282c34",
    //           type: "arrow",
    //           size: 0.5
    //         };
    //         // edges.push(temp);
    //         this.props.sigma.graph.AddEdge(temp)
    //       }
    //     }
    //   }
    // }
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
    console.log(this.props.sigma.graph)
    
    return (
      <div></div>
    );
  }
}

export default MyCustomSigma;
