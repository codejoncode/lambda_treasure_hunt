import React, { Component } from "react";
import "./App.css";
import axios from "axios";


/*Data*/
import graph from "./Data/Data"
import data from "./Data/DataForGraph"
/*Data*/

/*Components */
import Screen from "./Components/Screen";
import DirectionChoice from "./Components/DirectionChoice";
import TimerOnScreen from "./Components/TimerOnScreen";
import Movement from "./Components/Movements";
import Map from "./Components/Map";
/*Components */
require('dotenv').config()

const apiInit = "https://lambda-treasure-hunt.herokuapp.com/api/adv/init/";
const apiMove = "https://lambda-treasure-hunt.herokuapp.com/api/adv/move/";


/*BST class is available that features north south east and west and value haven't decided what the value is going to be just yet
  perhaps the room_id ?  
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      initialize : false,
      so: 0,
      st: 0,
      sm: 0,
      tm: 0,
      timerCount: 0,
      timerStop: false,
      timer: "",
      reqOptions: {},
      direction: "",
      messages: [],
      description: "",
      roomTitle: "",
      cooldown: null,
      response: {},
      moves: [],
      exits: [],
      previousId: null,
      roomId: "",
      players: [],
      items: [],
      coordinates: "",
      errors: [],
      previousDirection: null,
      stopAuto: true,
      opposites: { n: "s", e: "w", s: "n", w: "e" },
      graphXY: data.coor,
      graphExits: data.exits, 
      graph : data.graph,
      path : [],
    };
    this.automateMovement = this.automateMovement.bind(this);
  }

  componentDidMount() {
    const token = `Token ${process.env.REACT_APP_SECRET_CODE}`
    const reqOptions = {
      headers: {
        Authorization: token //this.state.trueToken
      }
    };

    const promise = axios.get(apiInit, reqOptions);
    promise
      .then(response => {
        console.log(response.data);
        const temp = {};
        const options = ["n", "s", "e", "w"];
        const graph = Object.assign({}, this.state.graph);
        
        const roomId = response.data.room_id;
        const players = response.data.players;
        const roomTitle = response.data.title;
        const items = response.data.items;
        const cooldown = response.data.cooldown;
        const coordinates = response.data.coordinates;
        const errors = response.data.errors;
        const exits = response.data.exits;
        for (let option of options) {
          temp[option] = exits.includes(option) ? "?" : null;
        }

        if(!(roomId in graph)){
          graph[response.data.room_id] = temp;
        }
        const description = response.data.description;
        const graphXY = Object.assign({}, this.state.graphXY);
        const graphExits = Object.assign({}, this.state.graphExits);

        if(!(roomId in graphExits)){
          graphExits[roomId] = exits;
        }
        
        
        if(!(roomId in graphXY)){
          const first = Number(coordinates.slice(1, 3));
          const second = Number(coordinates.slice(4, 6));
          graphXY[roomId] = [first, second];
        }
        this.setState({
          initialize : true,
          roomId,
          players,
          roomTitle,
          items,
          cooldown,
          coordinates,
          errors,
          exits,
          description,
          graph,
          graphXY,
          reqOptions,
          graphExits,
        });
      })
      .catch(error => {
        console.log(error.response);
      });


  }

  drawOutMap = () => {

  }

  handleMove = (direction) => {
    if (direction === null){
      console.log("NO NULL DIRECTIONS")
      return 
    }
    if (this.state.moves.length){
      if (this.state.roomId === this.state.previousId){
        console.log("PREVIOUS ID SHOULD NOT BE THE CURRENT ROOM ID unless its the first")
        
        /* if moves has a length greater than zero than the previousId should not be the current Id */
      }
    }
    
    console.log("Attempting to go in the following direction : ", direction);
    const graph = Object.assign({}, this.state.graph);
    const opposite = this.state.opposites[direction];
    
    /*Push the opposite direction because we can use this to go backwards if we have a room with no exits*/
    const body = { direction };
    const token = `Token ${process.env.REACT_APP_SECRET_CODE}`
    const promise = axios.post(apiMove, body, {
      headers: { Authorization: token } //this.state.trueToken
    });
    promise
      .then(response => {
        const temp = {};
        /*Set the direction of the current room to equal the room we went in.  */
        if(this.state.roomId !== response.data.room_id){
          graph[this.state.roomId][direction] = graph[this.state.roomId][direction] ? response.data.room_id : null;
        }
        
        const moves = this.state.moves.slice();
        moves.push(direction)
        const previousId = this.state.roomId;
        const roomId = response.data.room_id;
        const players = response.data.players;
        const roomTitle = response.data.title;
        const items = response.data.items;
        const cooldown = response.data.cooldown;
        const coordinates = response.data.coordinates;
        const errors = response.data.errors;
        const exits = response.data.exits;
        const graphXY = Object.assign({}, this.state.graphXY);
        const first = Number(coordinates.slice(1, 3));
        const second = Number(coordinates.slice(4, 6));
        graphXY[roomId] = [first, second];
        const graphExits = Object.assign({}, this.state.graphExits);
        graphExits[roomId] = exits;
        const options = ["n", "s", "e", "w"];

        /*Only want to do it this way if in fact we have not made been in this room */
          if (!(response.data.room_id in graph)){
          
          for (let option of options) {
            temp[option] = exits.includes(option) ? "?" : null;
          }
          graph[roomId] = temp;
          if (roomId !== this.state.roomId){
            graph[roomId][opposite] = graph[roomId][opposite] && roomId !== this.state.roomId ? this.state.roomId : null; 
          }
          
          this.setState(
            {
              previousDirection: direction,
              previousId : this.state.roomId,
              graph,
              roomId,
              players,
              roomTitle,
              items,
              cooldown,
              coordinates,
              errors,
              moves,
              exits,
              graphXY,
              graphExits
            },
            this.handleStartTimer()
          );
        } else {
          /*Make sure you calculate the previousDirection currently timing is important*/
          if (this.state.previousDirection.length && this.state.previousId) {
            console.log(
              "been here before",
              previousId,
              this.state.previousDirection
            );
            
          }
          graph[response.data.room_id][opposite] = this.state.roomId
          
          this.setState(
            {
              graph,
              previousDirection: direction,
              previousId : this.state.roomId,
              roomId,
              players,
              roomTitle,
              items,
              cooldown,
              coordinates,
              errors,
              moves,
              exits,
              graphXY,
              graphExits
            },
            this.handleStartTimer()
          );
        }
      })
      .catch(error => {
        console.log(error);
        
      });
    
  };

  handleClick = () => {
    this.handleMove(this.state.direction);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  sleep = (ms, cb = null) => {
    if(cb){
      cb()
    }
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  async automateMovement() {
    let count = 0; /* I figure in a efficient algorithm I shouldn't travel more than 3 times the amount of rooms available*/
    let find = [];
    let path_point = []
    let find_point = null;
    while (
      (Object.keys(this.state.graph).length < 500 || count > 3500) &&
      this.state.stopAuto
    ) {
      console.log("at the top");
      
      const cooldown =
        this.state.cooldown; /* Also may change but I have placed a 1 second cushion to prevent fast starts */
      // const moves = [...this.state.moves]; /* dito */
      
      let chosen_direction = this.travel();
      console.log(chosen_direction)
      await this.sleep(
        (cooldown - cooldown -1) * 1000
      );
      
      if(chosen_direction === null && find.length === 0){
        /*Only need to find a path if chosen_direction is null and find doesn't already have a path*/
        console.log("Path finder starting")

        path_point = this.startSearch()
        await this.sleep(
          (10) * 1000
        );
        console.log("Should be an Array of two", path_point)
        find_point = path_point[0]
        await this.sleep(
          (cooldown - cooldown -1) * 1000
        );
        console.log("Node to fine = ::: >> ", find_point)
        // find = this.prepGraph(this.state.roomId, find_point);
        find = path_point[1]; 
        console.log(find, "find array path")
      } 

      
      /* This is to make sure I always search for the same path until found */
      if (find.length > 0){
        /* use the point already set as the quickest path*/
        chosen_direction = find.shift()
        // this.setState({path: find})
        await this.sleep(
          (cooldown - cooldown -1) * 1000
        );
        console.log("Current Path>>>", find)
        
        console.log(chosen_direction, "chosen direction with path");
        this.handleMove(chosen_direction)
      } else {
        console.log(chosen_direction, "chosen direction no path");
        /* One note is what if the find array is empty and chosen direction is null? */
        this.handleMove(chosen_direction)
      }

      
      console.log(
        `sleep for ${cooldown} seconds.`
      ); /*Took 3 off my extra added cooldown */
      await this.sleep(
        (cooldown) * 1190
      ); /* Should hold everything for 10 seconds */
      /* multiplies the cooldown which is already one more than the actual cool down by 1000 */
      count += 1;
      console.log(count, "moved");
      localStorage.setItem("graph", JSON.stringify(this.state.graph));
      localStorage.setItem("graphXY", JSON.stringify(this.state.graphXY));
      localStorage.setItem("graphExits", JSON.stringify(this.state.graphExits));
    }
    console.log("a base case was reached or button pressed to stop.");
    console.log(this.state.graph);
    console.log(this.state.graphXY);
    console.log(this.state.graphExits);
    console.log(this.state.moves);
  }

  startTimer = () => {

    let so = this.state.so; //single ones
    let st = this.state.st; //second tens//
    let sm = this.state.sm; // single minutes
    let tm = this.state.tm; //tens minutes
    so++;
    if (so === 10) {
      st++;
      so = 0;
    }
    if (st === 6) {
      so = 0;
      st = 0;
      sm++;
    }
    if (sm === 10) {
      so = 0;
      st = 0;
      sm = 0;
      tm++;
    }

    this.setState({
      timerCount: this.state.timerCount + 1,
      so,
      st,
      sm,
      tm
    });

    if (this.state.cooldown === this.state.timerCount) {
      this.resetTimer();
    }
    /* This line of code will stop the timer about a second more than the cooldown which should be fine not to run into any issues. */
  };

  stopTimer = () => {
    window.clearInterval(this.state.timer);
    let timerStop = true;
    this.setState({ timerStop: timerStop });
  };
  resetTimer = () => {
    console.log("RESET TIMER");
    window.clearInterval(this.state.timer);
    let timerStop = true;
    this.setState({
      so: 0,
      mh: 0,
      st: 0,
      mt: 0,
      sm: 0,
      tm: 0,
      tick: 0,
      timerCount: 0,
      timerStop: timerStop
    });
  };

  handleStartTimer = () => {
    // this.timer = window.setInterval(this.startTimer, 1000);
    console.log(this.state.exits)
    console.log(this.state.graph);
    console.log(this.state.graphXY);
    console.log(this.state.graphExits);
    console.log(this.state.roomId, "room id to choose direction for");
    this.setState({
      timerStop: false,
      timer: window.setInterval(this.startTimer, 1000)
    });
  };
  handleStop = () => {
    this.setState({ stopAuto: !this.state.stopAuto }, this.resetTimer());
  };

  /* decided which direction to travel */
  travel = () => {
    /*This function will return the direction to go in next*/
    console.log(this.state.exits, "current exits for", this.state.roomId)
    if(this.state.exits.includes(this.state.previousDirection) && this.state.graph[this.state.roomId][this.state.previousDirection] === "?"){
      console.log("keep going in the same direction the path is clear")
      return this.state.previousDirection
    } /* added the above if statement to see if this allows to go deeper into a room */
    else if (this.state.exits.includes("n") && this.state.graph[this.state.roomId]["n"] === "?"){
      console.log("line triggered direction n free", "n", this.state.roomId)
        return "n"
    } else if (this.state.exits.includes("e") && this.state.graph[this.state.roomId]["e"] === "?"){
      console.log("line triggered direction e free", "e", this.state.roomId)
        return "e"
    } else if (this.state.exits.includes("s") && this.state.graph[this.state.roomId]["s"] === "?"){
      console.log("line triggered direction s free", "s", this.state.roomId)
        return "s"
    } else if (this.state.exits.includes("w") && this.state.graph[this.state.roomId]["w"] === "?"){
      console.log("line triggered direction w free", "w", this.state.roomId)
        return "w"
    } else if (this.state.exits.length === 1){
        /* Only one in the choice have to go backwards*/
        console.log("line triggered direction only 1 option", this.state.exits[0],this.state.roomId)
        return this.state.exits[0]
    } 
    else {
        /* No direction need to search for a path */
        return null
    }
  }

  /*before the path finder a new graph needs to be created*/
  prepGraph = (start, target) => {
    const newGraph = {}
    for (let g in this.state.graph){
      const items = []
      for(let i in this.state.graph[g]){
        /* using !== null because it will not add the '0' if its not explicityly searching for null or "?" */
        if(this.state.graph[g][i] !== null && this.state.graph[g][i] !== "?"){
          items.push(String(this.state.graph[g][i]))
          if (this.state.graph[g][i] && this.state.graph[g][i] === g){
            console.log("PROBLEM PROBLEM PROBLEM WITH ", g, this.state.graph[g][i])
            /* possibly add this to here the push expression */
          }
        } 
      }
      newGraph[Number(g)] = items
    }
    return this.pathFinder(newGraph, start, target)
  }
  /* find a nearest path */
  pathFinder = (graph, start, target) => {
    /* keep track of explored rooms */
  console.log(start, target, "<<<searching for path start, target")
  const explored = []
  /*turn the numbers/strings to directions */
  const directions = []
  /* keep track of all the paths to be checked */
  const queue = [[start]]

  /* return path if start is goal */
  if (start === target){
    console.log("ALREADY THERE NO NEED TO FIND SHORTEST PATH")
    return explored 
  }

  /* Keeps looping until all possible paths have been checked */
  while (queue.length){
    /* pop the first path from the queue */
    const path = queue.pop(0)
    /*get the last node from the path */
    const node = path[path.length - 1]
    if (explored.includes(node) === false){
      const neighbours = graph[node]
      /* go through all neighbour nodes, construct a new path and push it into the queue */
      for(let neighbour of neighbours){
        const new_path = [...path]
        new_path.push(neighbour)
        queue.push(new_path)
        /*return path if neighbour is goal */
        if (neighbour === String(target)){
          for (let i = 0 ; i< new_path.length-1; i++){
            for (let dir in this.state.graph[new_path[i]]){
              if(Number(this.state.graph[new_path[i]][dir]) === Number(new_path[i+1])){
                directions.push(dir)
              }
            }
        }
        return directions
        }
        /*Mark node as explored */
        explored.push(node)
      }
    }
  }
  console.log("No connecting path exists")
  return []
  }
  
  /*searching for a path will return a node*/
  startSearch = () => {
    /* Path finder Should now begin */
    let find_path = null 
    console.log("Path Finder Begining");
    /* Set at a large impossible number */
    let try_path = []
    let min_path = 1000
    let min_index = null 
    let try_node = null 
    let index = null
    for (let node in this.state.graph){
        for (let dir in this.state.graph[node]){
            if(this.state.graph[node][dir] === "?"){
                const path = this.prepGraph(this.state.roomId, node)
                if(path.length > 0){
                  /* Added to make faster */
                  try_path.push(path)
                  index = index ? index += 1 : 0 
                  if (min_index === null || path.length < min_path){
                    min_path = path.length 
                    try_node = node 
                    min_index = index
                  }
                  /*stop the search only one dir of "?" needed*/
                  break;
                  /*Added to make faster*/
                } else {
                  /*less than zero means there is no path for this node*/
                  break;
                }
            }
        }
    }
    /*return the node that will provide the shortest amount of nodes*/
    
    if (try_path.length){
      return [try_node, try_path[min_index]]
    }
    return find_path 
  }



  render() {
    return (
      <div className="container backGround">
        
        <Movement token = {this.state.token}
          handleClick = {this.handleClick}
          handleAuto = {this.automateMovement}
          handleStop = {this.handleStop}
          handleChange = {this.handleChange}
          graphLength = {Object.keys(this.state.graph).length}
        />

        <TimerOnScreen
          tensMinute={this.state.tm}
          singleMinute={this.state.sm}
          secondTens={this.state.st}
          secondOnes={this.state.so}
        />

        <Screen
          room_title={this.state.roomTitle}
          room_id={this.state.roomId}
          messages={this.state.messages}
          exits={this.state.exits}
          errors={this.state.errors}
          description={this.state.description}
          items={this.state.items}
          players={this.state.players}
          cooldown={this.state.cooldown}
          timerCount={this.state.timerCount}
        />

        <DirectionChoice exits = {this.state.exits} handleMove = {this.handleMove}/>
        <hr/>
        <br/>
        <Map />
      </div>
    );
  }
}

export default App;
