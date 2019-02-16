import React, { Component } from "react";

import { Sigma, RelativeSize } from "react-sigma";
import MyCustomSigma from "./MyCustomSigma";


class Map extends Component {
  state = {
    // display : {},
    updated: false,
    nodes : [],
    edges : [], 
    graph : {edges: [], nodes: []},
    
  };
  componentDidMount() {
    console.log("mount up")
    const updatedGraph = Object.assign({}, this.props.graph)
    let graph = []
    const nodes = [];
    const edges = [];
    const roomId = this.props.roomId;
    console.log(roomId, "roomId")
    for (let g in updatedGraph) {
      let temp = {};
      if (Number(g) === Number(roomId)) {
        console.log(`comparison worked ${g}, ${roomId}`)
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
        const id = `id${count}`
        count += 1;
        if (updatedGraph[g][d] !== null) {
          if (Number(g) === Number(roomId)) {
            console.log(`comparison worked ${g}, ${roomId}, ${count}`)
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
        }
      }
    }
    graph = {
      nodes,
      edges
    };
    
    this.setState({
      display: this.props.display,
      nodes, 
      edges,
      graph,
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("recieving props")
    
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("updating")
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
  }

  renderMap = () => {
    console.log(this.state.edges)
    console.log(this.state.nodes)
    console.log(this.state.edges)
    const nodes = this.state.nodes.slice()
    const edges = this.state.edges.slice() 
    // const graph = {nodes, edges}
    let count = 0
    for(let edge of edges){
        
        if(edge.type === "curve"){
            console.log(edge, count)
        }
        count += 1 
    }
    count = 0
    for (let node of nodes){
        if(node.type === "diamond"){
            console.log(node, count)
        }
    }

    if (nodes.length > 0 && edges.length > 0){
        if (this.props.initialize && this.state.updated) {
            return (
              <div className="changeCanvas">
                <div className="mapping">
                  <Sigma
                    renderer="canvas"
                    style={{ maxWidth: "inherit", height: "800px" }}
                    settings={{ drawEdges: true, clone: false }}
                    graph={{nodes, edges}}
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
    return <div>MUST INITIALIZE</div>

  }
  handleNodeClick = (event) => {
    const sigma = document.getElementsByClassName("sigma-mouse")
    
    console.log(sigma)
    console.log(event)
    console.log(event.data.node)
    event.data.node.color = "blue"
    console.log(event.data.node)
    const nodes = event.data.renderer.nodesOnScreen

    for(let node of nodes){
      node.color = "white";
    }

  }
  handleMapClick = (event) => {
    console.log(event)
  }

  render() {
    // return this.renderMap()
    console.log(this.props.coor)
    if (this.props.initialize && this.state.updated) {
        return (
          <div className="changeCanvas">
            <div className="mapping">
              <Sigma
                onMouseOver = {this.handleMapClick}
                renderer="canvas"
                style={{ maxWidth: "inherit", height: "800px" }}
                settings={{ drawEdges: true, clone: false, immutable: false}}
                graph={this.props.display}
                onClickNode = {this.handleNodeClick}
              >
                <RelativeSize initialSize={15} />
                <MyCustomSigma roomId = {this.props.roomId} display = {this.props.display} coor = {this.props.coor}/>
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

