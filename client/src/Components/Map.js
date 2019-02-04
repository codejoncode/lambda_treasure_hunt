import React, { Component } from 'react';
import graph from "../Data/Data";
import {Sigma, RelativeSize, NodeShapes, EdgeShapes } from "react-sigma"
class Map extends Component {
    state = {}

    render () {
        return (
            <div>
                <div className = "mapping">
                    <Sigma  renderer = "canvas"  style = {{ maxWidth: "inherit", height: "800px"}}settings = {{drawEdges: true, clone: true}} graph ={graph} >
                    <RelativeSize initialSize = {1}/>
                    <EdgeShapes  />
                    <NodeShapes />
                    </Sigma>
                </div>
            </div>
        )
    }
}
 
export default Map; 