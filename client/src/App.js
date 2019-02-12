import React, { Component } from "react";
import "./App.css";
import axios from "axios";
/*Data*/
import data from "./Data/DataForGraph";
import Queue from "./Data/Queue";
/*Data*/

/*Components */
import Screen from "./Components/Screen";
import DirectionChoice from "./Components/DirectionChoice";
import TimerOnScreen from "./Components/TimerOnScreen";
import Movement from "./Components/Movements";
import Map from "./Components/Map";
import Title from "./Components/Title";
/*Components */
require("dotenv").config();

const apiInit = "https://lambda-treasure-hunt.herokuapp.com/api/adv/init/";
const apiMove = "https://lambda-treasure-hunt.herokuapp.com/api/adv/move/"; // {direction : 'n'}
// const apiFly = "https://lambda-treasure-hunt.herokuapp.com/api/adv/dash/"; // {"direction" : "n", "next_room_id": "123"}
// const apiTake = "https://lambda-treasure-hunt.herokuapp.com/api/adv/take/"; // {name : boots}
// const apipDrop = "https://lambda-treasure-hunt.herokuapp.com/api/adv/drop/"; // {name : boots}
// const apiSell = "https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/"; //{name: "treasure", "confirm": "yes"}
// const apiWear = "https://lambda-treasure-hunt.herokuapp.com/api/adv/wear/"; //{name : "boots"} for terrian.

/*BST class is available that features north south east and west and value haven't decided what the value is going to be just yet
  perhaps the room_id ?  
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      initialize: false,
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
      graph: data.graph,
      path: [],
      display: {},
      roomNumberToGoTo: 0,
      myItems: []
    };
    this.automateMovement = this.automateMovement.bind(this);
    this.travelSetPath = this.travelSetPath.bind(this);
  }

  componentDidMount() {
    const token = `Token ${process.env.REACT_APP_SECRET_CODE}`;
    const reqOptions = {
      headers: {
        Authorization: token 
      }
    };

    const promise = axios.get(apiInit, reqOptions);
    promise
      .then(response => {
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

        if (!(roomId in graph)) {
          graph[response.data.room_id] = temp;
        }
        const description = response.data.description;
        const graphXY = Object.assign({}, this.state.graphXY);
        const graphExits = Object.assign({}, this.state.graphExits);

        if (!(roomId in graphExits)) {
          graphExits[roomId] = exits;
        }

        if (!(roomId in graphXY)) {
          const first = Number(coordinates.slice(1, 3));
          const second = Number(coordinates.slice(4, 6));
          graphXY[roomId] = [first, second];
        }
        const display = this.drawOutMap(graph, roomId);
        this.setState(
          {
            initialize: true,
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
            display,
            traveling: "blue"
          },
          this.handleStartTimer()
        );
        /*Pusher is last it will hault the program as other players enter my zone. */
        //   var pusher = new Pusher (process.env.REACT_APP_PUSHER_KEY, {
        //     cluster: 'us2',
        //     forceTLS: true
        //   })
        //   var channel = pusher.subscribe(`p-channel-${response.data.uuid}`);
        //   channel.bind('broadcast', function(data) {
        //   alert(JSON.stringify(data));
        // });
      })
      .catch(error => {
        this.setState({ traveling: "red" });
        console.log(error.response);
      });
  }

  getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  drawOutMap = updatedGraph => {
    const nodes = [];
    const edges = [];
    const roomId = this.state.roomId;
    for (let g in updatedGraph) {
      let temp = {};
      if (Number(g) === Number(roomId)) {
        temp = {
          id: g,
          label: `${g}`,
          x: data.coor[g][0],
          y: data.coor[g][1],
          size: 15,
          color: "red",
          borderColor: this.getRandomColor(),
          type: "diamond"
        };
      } else {
        temp = {
          id: g,
          label: `${g}`,
          x: data.coor[g][0],
          y: data.coor[g][1],
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
        }
      }
    }
    const display = {
      nodes,
      edges
    };

    return display;
  };

  handleMove = direction => {
    if (direction === null) {
      console.log("NO NULL DIRECTIONS");
      return;
    }
    if (this.state.moves.length) {
      if (this.state.roomId === this.state.previousId) {
        console.log(
          "PREVIOUS ID SHOULD NOT BE THE CURRENT ROOM ID unless its the first"
        );

        /* if moves has a length greater than zero than the previousId should not be the current Id */
      }
    }

    const graph = Object.assign({}, this.state.graph);
    const opposite = this.state.opposites[direction];

    /*Push the opposite direction because we can use this to go backwards if we have a room with no exits*/
    const body = { direction };
    const token = `Token ${process.env.REACT_APP_SECRET_CODE}`;
    const promise = axios.post(apiMove, body, {
      headers: { Authorization: token } //this.state.trueToken
    });
    promise
      .then(response => {
        const temp = {};
        /*Set the direction of the current room to equal the room we went in.  */
        if (this.state.roomId !== response.data.room_id) {
          graph[this.state.roomId][direction] = graph[this.state.roomId][
            direction
          ]
            ? response.data.room_id
            : null;
        }

        const moves = this.state.moves.slice();
        moves.push(direction);
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
        if (!(response.data.room_id in graph)) {
          for (let option of options) {
            temp[option] = exits.includes(option) ? "?" : null;
          }
          graph[roomId] = temp;
          if (roomId !== this.state.roomId) {
            graph[roomId][opposite] =
              graph[roomId][opposite] && roomId !== this.state.roomId
                ? this.state.roomId
                : null;
          }
          const display = this.drawOutMap(graph, roomId);
          this.setState(
            {
              previousDirection: direction,
              previousId: this.state.roomId,
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
              graphExits,
              display
            },
            this.handleStartTimer()
          );
        } else {
          /*Make sure you calculate the previousDirection currently timing is important*/

          graph[response.data.room_id][opposite] = this.state.roomId;
          const display = this.drawOutMap(graph, roomId);
          this.setState(
            {
              graph,
              previousDirection: direction,
              previousId: this.state.roomId,
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
              graphExits,
              display
            },
            this.handleStartTimer()
            // this.twoFunctions()
          );
        }
      })
      .catch(error => {
        this.setState({ traveling: "red" });
        console.log(error);
      });
  };

  handleClick = () => {
    this.handleMove(this.state.direction);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  async automateMovement() {
    let count = 0; /* I figure in a efficient algorithm I shouldn't travel more than 3 times the amount of rooms available*/
    let find = [];
    let path_point = [];
    let find_point = null;
    while (
      (Object.keys(this.state.graph).length < 500 || count > 3500) &&
      this.state.stopAuto
    ) {
      const cooldown = this.state
        .cooldown; /* Also may change but I have placed a 1 second cushion to prevent fast starts */
      // const moves = [...this.state.moves]; /* dito */

      let chosen_direction = this.travel();
      await this.sleep((cooldown - cooldown - 1) * 1000);

      if (chosen_direction === null && find.length === 0) {
        /*Only need to find a path if chosen_direction is null and find doesn't already have a path*/

        path_point = this.startSearch();
        await this.sleep(10 * 1000);
        find_point = path_point[0];
        await this.sleep((cooldown - cooldown - 1) * 1000);
        // find = this.prepGraph(this.state.roomId, find_point);
        find = path_point[1];
      }

      /* This is to make sure I always search for the same path until found */
      if (find.length > 0) {
        /* use the point already set as the quickest path*/
        chosen_direction = find.shift();
        // this.setState({path: find})
        await this.sleep((cooldown - cooldown - 1) * 1000);

        this.handleMove(chosen_direction);
      } else {
        /* One note is what if the find array is empty and chosen direction is null? */
        this.handleMove(chosen_direction);
      }

      /*Took 3 off my extra added cooldown */
      await this.sleep(
        cooldown * 1190
      ); /* Should hold everything for 10 seconds */
      /* multiplies the cooldown which is already one more than the actual cool down by 1000 */
      count += 1;
    }
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
    this.setState({
      timerStop: false,
      timer: window.setInterval(this.startTimer, 1000),
      traveling: "yellow"
    });
  };
  handleStop = () => {
    this.setState({ stopAuto: !this.state.stopAuto }, this.resetTimer());
  };

  /* decided which direction to travel */
  travel = () => {
    /*This function will return the direction to go in next*/
    if (
      this.state.exits.includes(this.state.previousDirection) &&
      this.state.graph[this.state.roomId][this.state.previousDirection] === "?"
    ) {
      return this.state.previousDirection;
    } /* added the above if statement to see if this allows to go deeper into a room */ else if (
      this.state.exits.includes("n") &&
      this.state.graph[this.state.roomId]["n"] === "?"
    ) {
      return "n";
    } else if (
      this.state.exits.includes("e") &&
      this.state.graph[this.state.roomId]["e"] === "?"
    ) {
      return "e";
    } else if (
      this.state.exits.includes("s") &&
      this.state.graph[this.state.roomId]["s"] === "?"
    ) {
      return "s";
    } else if (
      this.state.exits.includes("w") &&
      this.state.graph[this.state.roomId]["w"] === "?"
    ) {
      return "w";
    } else if (this.state.exits.length === 1) {
      /* Only one in the choice have to go backwards*/
      return this.state.exits[0];
    } else {
      /* No direction need to search for a path */
      return null;
    }
  };

  /*before the path finder a new graph needs to be created*/
  prepGraph = (start, target) => {
    const newGraph = {};
    for (let g in this.state.graph) {
      const items = [];
      for (let i in this.state.graph[g]) {
        /* using !== null because it will not add the '0' if its not explicityly searching for null or "?" */
        if (this.state.graph[g][i] !== null && this.state.graph[g][i] !== "?") {
          items.push(String(this.state.graph[g][i]));
          if (this.state.graph[g][i] && this.state.graph[g][i] === g) {
            console.log(
              "PROBLEM PROBLEM PROBLEM WITH ",
              g,
              this.state.graph[g][i]
            );
            /* possibly add this to here the push expression */
          }
        }
      }
      newGraph[Number(g)] = items;
    }
    return this.pathFinder(newGraph, start, target);
  };
  /* find a nearest path */
  pathFinder = (graph, start, target) => {
    /* keep track of explored rooms */
    const explored = [];
    /*turn the numbers/strings to directions */
    const directions = [];
    /* keep track of all the paths to be checked */
    const queue = new Queue();

    queue.enqueue([start]);
    // const queue = [[start]]
    /* return path if start is goal */
    if (start === target) {
      return explored;
    }

    /* Keeps looping until all possible paths have been checked */
    while (queue.size > 0) {
      /* pop the first path from the queue */
      const path = queue.dequeue();
      /*get the last node from the path */
      const node = path[path.length - 1];
      if (explored.includes(node) === false) {
        explored.push(node);
        const neighbours = graph[node];
        /* go through all neighbour nodes, construct a new path and push it into the queue */
        for (let neighbour of neighbours) {
          if (explored.includes(neighbour) === false) {
            const new_path = [...path];
            new_path.push(String(neighbour));
            queue.enqueue(new_path);
            /*return path if neighbour is goal */
            if (neighbour === String(target)) {
              /*Make and return directions*/
              /*Currently should be at the starting node so start at index 1 since index 0 is the starting node */
              for (let i = 0; i < new_path.length - 1; i++) {
                for (let dir in this.state.graph[new_path[i]]) {
                  /*so new_path[i+1] is the next*/
                  if (
                    Number(this.state.graph[new_path[i]][dir]) ===
                      Number(new_path[i + 1]) &&
                    this.state.graph[new_path[i]][dir] !== null
                  ) {
                    /*The conditional above is needed to check if everything equals the next but also to avoid issues 
                    for when 0 is the room number. Number(null) evaluates to 0. which will produce incorrect paths anytime 
                    zero is involved. 
                  */
                    directions.push(dir);
                  }
                }
              }
              return directions;
            }
          }
          /*Mark node as explored */
        }
      }
    }
    console.log("No connecting path exists");
    return [];
  };

  /*searching for a path will return a node*/
  startSearch = () => {
    /* Path finder Should now begin */
    let find_path = null;
    /* Set at a large impossible number */
    let try_path = [];
    let min_path = 1000;
    let min_index = null;
    let try_node = null;
    let index = null;
    for (let node in this.state.graph) {
      for (let dir in this.state.graph[node]) {
        if (this.state.graph[node][dir] === "?") {
          const path = this.prepGraph(this.state.roomId, node);
          if (path.length > 0) {
            /* Added to make faster */
            try_path.push(path);
            index = index ? (index += 1) : 0;
            if (min_index === null || path.length < min_path) {
              min_path = path.length;
              try_node = node;
              min_index = index;
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

    if (try_path.length) {
      return [try_node, try_path[min_index]];
    }
    return find_path;
  };

  goToRoom = () => {
    const directionsToTravel = this.prepGraph(
      this.state.roomId,
      this.state.roomNumberToGoTo
    );
    this.travelSetPath(directionsToTravel, this.state.roomNumberToGoTo, 0);
  };
  async travelSetPath(path, target, attempts) {
    const travelPath = path.slice();
    if (path.length > 0) {
      while (travelPath.length > 0) {
        const direction = travelPath.shift();
        this.handleMove(direction);
        this.setState({ traveling: "yellow" });
        await this.sleep((this.state.cooldown + 4.5) * 1190);
      }
      this.setState({ traveling: "green" });
    }
  }

  render() {
    const display = Object.assign({}, this.drawOutMap(this.state.graph));
    return (
      <div className="container backGround">
        <Title />
        <Movement
          token={this.state.token}
          handleClick={this.handleClick}
          handleAuto={this.automateMovement}
          handleStop={this.handleStop}
          handleChange={this.handleChange}
          roomNumberToGoTo={this.state.roomNumberToGoTo}
          graphLength={Object.keys(this.state.graph).length}
          goToRoom={this.goToRoom}
          traveling={this.state.traveling}
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
          traveling={this.state.traveling}
        />

        <DirectionChoice
          exits={this.state.exits}
          handleMove={this.handleMove}
          traveling={this.state.traveling}
        />
        <hr />
        <br />
        <Map
          roomId={this.state.roomId}
          coor={data.coor}
          initialize={this.state.initialize}
          display={display}
          graph={this.state.graph}
        />
      </div>
    );
  }
}

export default App;
