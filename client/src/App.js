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
const apiTake = "https://lambda-treasure-hunt.herokuapp.com/api/adv/take/"; // {name : 'treasure'}
const apiSell = "https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/"; // {name: 'treasure', "confirm" : "yes"}
const apiStatus = "https://lambda-treasure-hunt.herokuapp.com/api/adv/status/"; // {}  empty body
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
      myItems: [],
      travelPath: [],
      treasureBag: [],
      gold: 0
    };
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
        const graph = Object.assign({}, this.state.graph);

        const roomId = response.data.room_id;
        const players = response.data.players;
        const roomTitle = response.data.title;
        const items = response.data.items;
        const cooldown = response.data.cooldown;
        const coordinates = response.data.coordinates;
        const errors = response.data.errors;
        const exits = response.data.exits;

        /*if the roomId not in the graph create object of question marks */
        if (!(roomId in graph)) {
          graph[response.data.room_id] = this.setQuestionMark(exits);
        }
        const description = response.data.description;
        const graphXY = Object.assign({}, this.state.graphXY);
        const graphExits = Object.assign({}, this.state.graphExits);

        if (!(roomId in graphExits)) {
          graphExits[roomId] = exits;
        }

        if (!(roomId in graphXY)) {
          graphXY[roomId] = this.manipulateCoors(coordinates);
        }
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
            traveling: "blue"
          },
          this.handleStartTimer()
        );
      })
      .catch(error => {
        this.setState({ traveling: "red" });
        console.log(error.response);
      });
  }

  goToShop = () => {
    /* Once a user gets something to sell in their bag they can then travel to the shop */

    /*Get a path to room 1 where the shop is located */
    const travelPath = this.pathFinder(this.state.roomId, 1);
    /*Set the path and then go travel SetPath*/
    this.setState({ travelPath }, () => this.travelSetPath());
  };

  checkStatus = () => {
    /*Check the status player strength emcumbrance speed, gold and inventory */
    const token = `Token ${process.env.REACT_APP_SECRET_CODE}`;
    const body = {};
    const promise = axios.post(apiStatus, body, {
      headers: { Authorization: token },
      "Content-Type": "application/json"
    });
    promise
      .then(response => {
        localStorage.setItem(
          "treasureBag",
          JSON.stringify(response.data.inventory)
        );
        localStorage.setItem("gold", JSON.stringify(response.data.gold));
        this.setState({
          treasureBag: response.data.inventory,
          cooldown: response.data.cooldown,
          gold: response.data.gold
        });
        setTimeout(console.log("waiting"), (response.data.cooldown + 2) * 1000);
      })
      .catch(error => {
        console.error("PROBLEMS WHILE CHECKING STATUS");
        this.setState({ cooldown: error.data.cooldown });
      });
  };

  takeTreasureAndBagIt = () => {
    /*This function will take the items available*/

    /*Get copy of array of available items for the room currently in */
    const itemsAvailable = this.state.items.slice();
    this.checkStatus();
    const item = itemsAvailable.pop();
    const treasureBag = this.state.treasureBag.slice();
    treasureBag.push(item);
    const body = { name: item };
    const token = `Token ${process.env.REACT_APP_SECRET_CODE}`;
    let cooldown = 0;
    const promise = axios.post(apiTake, body, {
      headers: { Authorization: token }
    });
    promise
      .then(response => {
        cooldown = response.data.cooldown;
        this.setState({
          cooldown: response.data.cooldown,
          items: itemsAvailable,
          treasureBag
        });
        if (itemsAvailable.length > 0) {
          setTimeout(this.takeTreasureAndBagIt, cooldown * 1000);
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ cooldown: error.data.cooldown });
        setTimeout(this.takeTreasureAndBagIt, error.data.cooldown * 1000);
      });
    /*Start again if the itemsAvailable is large*/
  };

  sellItemsInBag = () => {
    if (this.state.roomId === 1) {
      this.checkStatus();
      const treasureBag = JSON.parse(localStorage.getItem("treasureBag"));
      if (treasureBag.length > 0) {
        const name = treasureBag.pop();
        const confirm = "yes";
        const body = { name, confirm };
        const token = `Token ${process.env.REACT_APP_SECRET_CODE}`;
        const promise = axios.post(apiSell, body, {
          headers: { Authorization: token }
        });
        promise
          .then(response => {
            this.setState({ cooldown: response.data.cooldown, treasureBag });
            if (treasureBag.length > 0) {
              setTimeout(this.sellItemsInBag, response.data.cooldown * 1000);
            }
          })
          .catch(error => {
            console.log(error.response);
          });
      }
    } else {
      alert("You can only sell your items in the shop located at room 1");
    }
  };

  manipulateCoors = coordinates => {
    /*Take the string (60, 56) and return an array of length two featuring integers */
    const first = Number(coordinates.slice(1, 3));
    const second = Number(coordinates.slice(4, 6));

    return [first, second];
  };

  setQuestionMark = exits => {
    /*Creates a object with question marks or null for the direction 
      this depends on whether the direction is available totake from the room. 
      returns the object
    */
    const options = ["n", "s", "e", "w"];
    const temp = {};
    for (let option of options) {
      temp[option] = exits.includes(option) ? "?" : null;
    }
    return temp;
  };

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

  handleMove = (direction, setPath = false) => {
    if (direction === null) {
      console.log("NO NULL DIRECTIONS");
      return;
    }
    this.setState({ traveling: "Yellow" });
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
        /*Set the direction of the current room to equal the room we went in.  */
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

        graphXY[roomId] = this.manipulateCoors(coordinates);
        const graphExits = Object.assign({}, this.state.graphExits);
        graphExits[roomId] = exits;

        /*Only want to do it this way if in fact we have not made been in this room */
        if (!(response.data.room_id in graph)) {
          graph[roomId] = this.setQuestionMark(exits);
        }
        graph[this.state.roomId][
          direction
        ] = roomId; /* Set current id on state and direction received to new room */
        graph[roomId][
          opposite
        ] = this.state.roomId; /*take the current room and opposite direction a set to id on state
        which serves as previous id*/
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
            traveling: "green"
          },
          this.handleStartTimer()
        );

        if (Object.keys(this.state.graph).length < 500) {
          setTimeout(this.automateMovement, this.state.cooldown * 1000);
        }
        if (setPath === true) {
          setTimeout(this.travelSetPath, this.state.cooldown * 1000);
        }
      })
      .catch(error => {
        this.setState({ traveling: "red", cooldown : error.response.cooldown }, () => this.handleStartTimer());
        console.log(error);
      });
  };

  handleClick = () => {
    this.handleMove(this.state.direction);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  automateMovement = () => {
    this.setState({ traveling: "yellow" });
    let travelPath = this.state.travelPath.slice();
    let chosen_direction = null;

    if (travelPath.length === 0) {
      chosen_direction = this.travel();
    }

    if (chosen_direction === null && travelPath.length === 0) {
      /*Only need to find a path if chosen_direction is null and travelPath is emtpy*/
      travelPath = this.pathFinder(this.state.roomId);
      this.setState({ travelPath });
    }

    /* This is to make sure I always take the set path until empty */
    if (travelPath.length > 0) {
      /* use the point already set as the quickest path*/
      chosen_direction = travelPath.shift();
      /*Take care of handleMove after setting the state */
      this.setState({ travelPath }, this.handleMove(chosen_direction));
    } else {
      /* this.travel() has a truthy value */
      this.handleMove(chosen_direction);
    }
    /*this is going to keep it going until all rooms have been located*/

    this.setState({ traveling: "blue" });
  };

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

  /* decided which direction to travel */
  travel = () => {
    /*This function will return the direction to go in next*/
    for (let exit in this.state.graph[this.state.roomId]) {
      if (this.state.graph[this.state.roomId][exit] === "?") {
        return exit;
      }
    }
    /*If no '?' has been found this line will trigger */
    return null;
  };

  makeDirectiousOutOfRoomNumbers = (path, start) => {
    /*path comes in as room numbers and then turned into directions*/
    let room = start;
    const directions = [];
    let count = 1;
    while (count < path.length) {
      for (let exit in this.state.graph[room]) {
        if (this.state.graph[room][exit] === path[count]) {
          directions.push(exit);
          break; /*only looking for one so once found end loop */
        }
      }
      room = path[count];
      count += 1;
    }
    return directions;
  };
  /* find a nearest path */
  pathFinder = (start, target = "?") => {
    /* keep track of explored rooms */
    const graph = Object.assign({}, this.state.graph);
    const explored = [];
    /* keep track of all the paths to be checked */
    const queue = new Queue();

    queue.enqueue([start]);
    // const queue = [[start]]

    /* Keeps looping until all possible paths have been checked */
    while (queue.size > 0) {
      /* pop the first path from the queue */
      const path = queue.dequeue();
      /*get the last node from the path */
      const node = path[path.length - 1];
      if (explored.includes(node) === false) {
        explored.push(node);
        /* go through all neighbour nodes, construct a new path and push it into the queue */
        for (let neighbour in graph[node]) {
          if (String(graph[node][neighbour]) === String(target)) {
            if (target !== "?") {
              /*If it is not a question mark direct directions needed*/
              path.push(graph[node][neighbour]);
            }
            return this.makeDirectiousOutOfRoomNumbers(path, start);
          } else {
            if (explored.includes(neighbour) === false) {
              const new_path = path.slice();
              new_path.push(graph[node][neighbour]);
              queue.enqueue(new_path);
              /*return path if neighbour is goal */
            }
          }
        }
      }
    }
    return [];
  };

  goToRoom = () => {
    /*Get the travelPath set the travelPath on state and then travel the set path */
    const travelPath = this.pathFinder(
      this.state.roomId,
      this.state.roomNumberToGoTo
    );
    this.setState({ travelPath }, () => this.travelSetPath());
  };

  travelSetPath = () => {
    /*the state should hold the path to travel take a slice */
    const travelPath = this.state.travelPath.slice();
    if (travelPath.length > 0) {
      const direction = travelPath.shift();
      this.setState({ traveling: "yellow", travelPath }, () =>
        this.handleMove(direction, true)
      );
    } else {
      this.setState({ traveling: "green", travelPath: [] });
      return;
    }
  };

  render() {
    const display = Object.assign({}, this.drawOutMap(this.state.graph));
    return (
      <div className="container backGround">
        <Title />
        <Movement
          token={this.state.token}
          handleClick={this.handleClick}
          handleAuto={this.automateMovement}
          handleChange={this.handleChange}
          roomNumberToGoTo={this.state.roomNumberToGoTo}
          graphLength={Object.keys(this.state.graph).length}
          goToRoom={this.goToRoom}
          traveling={this.state.traveling}
          treasureBag={this.state.treasureBag}
          goToShop={this.goToShop}
          roomId={this.state.roomId}
          sellItemsInBag={this.sellItemsInBag}
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
          take={this.takeTreasureAndBagIt}
          gold={this.state.gold}
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
