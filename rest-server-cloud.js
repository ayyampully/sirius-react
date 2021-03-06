"use strict";
var fs = require("fs"),
  express = require("express"),
  http = require("http"),
  mongoose = require("mongoose"),
  lodash = require("lodash"),
  pushServer = require("socket.io"),
  createStore = require("redux").createStore,
  reducer = require("./store/reducer");

var store = createStore(reducer);
var io = new pushServer().attach(3031);

store.subscribe(() => {
  console.log(
    "-----------------------------------------------------sss------------------------------"
  );
  io.emit("state", store.getState());
});

io.on("connection", socket => {
  socket.emit("state", store.getState());
  socket.on("action", store.dispatch.bind(store));
  socket.on("addComment", function(request) {
    if (request.notification.type === "ADD_COMMENT") {
      console.log(request.notification);
      store.dispatch({
        type: "NEW_COMMENT",
        payload: request.notification.payload
      });
    }
  });
});

var uri =
  "mongodb://sirius_user:BQkKcMLPHv5SQdfl@sirius-shard-00-00-32vi8.mongodb.net:27017,sirius-shard-00-01-32vi8.mongodb.net:27017,sirius-shard-00-02-32vi8.mongodb.net:27017/siriusdb?ssl=true&replicaSet=sirius-shard-0&authSource=admin";

var SiriusDB = require("./data/Schema")(mongoose, lodash);
var dburl = "mongodb://localhost:27017/siriusdb";

var app = new express();
var router = express.Router();
var bodyParser = require("body-parser");

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "http://localhost:4040");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  response.header("Access-Control-Allow-Resource", "*");
  response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
app.use("/api/v1/", router);
var jsonParser = bodyParser.json();

mongoose.connect(uri);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error..."));
db.once("open", function callback() {
  console.log("db opened");
});

router.get("/getprojectdetails", function(req, res) {
  console.log("projects details request");
  let projectid = req.param("projectid", null);
  if (!projectid) res.send([]).status(200);
  SiriusDB.getProjectDetails(
    projectid,
    function(success) {
      if (!success) {
        res.send(400, "Invalid project id");
        return;
      } else {
        res.send(success).status(200);
      }
    },
    true
  );
});

router.get("/getticketslist", function(req, res) {
  console.log("Tickets list request");
  let projectid = req.param("projectid", null);

  SiriusDB.getTicketsList(projectid, function(success) {
    if (!success) {
      res.send(400, "Invalid project id");
      return;
    } else {
      res.send(success).status(200);
    }
  });
});

router.get("/ticket", function(req, res) {
  console.log("Tickets details request");
  let ticketid = req.param("ticketid", null);
  let projectid = req.param("projectid", null);
  SiriusDB.getTicketDetails(ticketid, projectid, function(success) {
    if (!success) {
      var err = { status: 404, message: "Invalid ticket id" };
      res.send(404, err);
      return;
    } else {
      res.send(success).status(200);
    }
  });
});

router.put("/ticket", jsonParser, function(req, res) {
  console.log("Tickets update request");
  let ticketid = req.param("ticketid", null);
  let ticket = req.body.ticket;

  SiriusDB.updateTicket(ticketid, ticket, function(success) {
    if (!success) {
      var err = { status: 404, message: "Invalid ticket id" };
      res.send(404, err);
      return;
    } else {
      res.send(success).status(200);
    }
  });
});

router.post("/addcomment", jsonParser, function(req, res) {
  console.log("Add comment request");
  let ticketid = req.param("ticketid", null);
  let comment = req.body.comment;
  let activeUser = 1; //todo - get from user session
  //let projectid = req.param('projectid', null);
  if (!comment) res.send([]).status(200);
  SiriusDB.addComment({ ticketid, comment, activeUser }, function(success) {
    if (!success) {
      var err = { status: 404, message: "Invalid ticket id" };
      res.send(404, err);
      return;
    } else {
      store.dispatch({
        type: "NEW_COMMENT",
        payload: { ticketid, comment, activeUser }
      });
      res.send(success).status(200);
    }
  });
});

router.get("/users", jsonParser, function(req, res) {
  console.log("Get users request");
  let query = req.param("query", null);
  //let activeUser = 1//todo - get from user session
  //let projectid = req.param('projectid', null);
  SiriusDB.getUsersList(query, function(success) {
    if (!success) {
      var err = { status: 404, message: "Invalid ticket id" };
      res.send(404, err);
      return;
    } else {
      var data = { data: { status: 200, message: "Success", users: success } };
      res.send(data).status(200);
    }
  });
});

router.get("/saveuser", jsonParser, function(req, res) {
  SiriusDB.saveUser(function(success) {
    if (!success) {
      var err = { status: 404, message: "Invalid ticket id" };
      res.send(404, err);
      return;
    } else {
      res.send(success).status(200);
    }
  });
});
app.listen(3030);
console.log("server is at 3030");
