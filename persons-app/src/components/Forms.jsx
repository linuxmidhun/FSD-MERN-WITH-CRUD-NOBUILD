import { Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";

const Forms = (props) => {
  var [temp, setTemp] = useState({
    id: props.data.id,
    name: props.data.name,
    place: props.data.place,
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setTemp((temp) => ({
      ...temp,
      [name]: value,
    }));
  };

  const submit = () => {
    if (props.method === "post") {
      axios
        .post("http://localhost:8080/persons", {
          person_name: temp.name,
          person_place: temp.place,
        })
        .then(() => {
          alert("New entry created successfully");
        })
        .catch(() => {
          alert("Error saving data");
        });
    } else if (props.method === "put") {
      axios
        .put("http://localhost:8080/persons/" + temp.id, {
          person_name: temp.name,
          person_place: temp.place,
        })
        .then(() => {
          alert("Data updated successfully");
          window.location.reload();
        })
        .catch(() => {
          alert("Error saving data");
        });
    }
    setTemp({ id: "", name: "", place: "" });
  };

  return (
    <div>
      <br />
      <TextField
        variant="outlined"
        name="name"
        label="Name"
        value={temp.name}
        onChange={inputHandler}
      />
      <br />
      <br />
      <TextField
        variant="outlined"
        name="place"
        label="Place"
        value={temp.place}
        onChange={inputHandler}
      />
      <br />
      <br />
      <Button variant="outlined" onClick={submit}>
        Submit
      </Button>
      <br />
    </div>
  );
};

export default Forms;
