const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = new express();
app.use(cors());
app.use(bodyParser.json());

let Person = require("./person.model");

mongoose.connect(
  "mongodb+srv://<username>:<password>@<cluster-name>.ocvpk12.mongodb.net/<Database-name>?retryWrites=true&w=majority"
);
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});


app.get("/", (req, res) => {
  res.json("Hello");
});

// To get the list of persons from the databases
app.get("/persons", async (req, res) => {
  let data = await Person.find().catch(() => {
    res.json("Error finding data");
  });
  res.json(data);
});

// To create a new person entry in the database.
app.post("/persons", (req, res) => {
  console.log(req.body);
  let person = new Person(req.body);
  person
    .save()
    .then(() => {
      res.json("Data Saved");
    })
    .catch(() => {
      res.json("Not Saved");
    });
});

// To get a person on the selected Id from the database.
app.get("/persons/:id", async (req, res) => {
  let id = req.params.id;
  let data = await Person.findById(id).catch(() => {
    res.json("Error finding data");
  });
  if (!data) {
    res.json("no data");
  } else {
    res.json(data);
  }
});

// To delete a selected person from the database.
app.delete("/persons/:id", async (req, res) => {
  let id = req.params.id;
  await Person.findByIdAndDelete(id)
    .then(() => {
      res.json("Data Removed suuccessfully");
    })
    .catch(() => {
      res.json("Failed deleting data");
    });
});

// To update the details of a selected person
app.put("/persons/:id", (req, res) => {
  let id = req.params.id;
  Person.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.json("Details updated successfully");
    })
    .catch(() => {
      res.json("Error updating the details");
    });
});

app.listen("8080", () => {
  console.log("Started server on 8080");
});
