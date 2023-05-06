import {
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import Forms from "./Forms";

const TableArray = () => {
  var [edit, setEdit] = useState(false);
  var [selected, setSelected] = useState({});
  var [persons, setPersons] = useState([]);

  const deletePerson = (id) => {
    axios
      .delete("http://localhost:8080/persons/" + id)
      .then(() => {
        alert("Deleted a row");
        window.location.reload();
      })
      .catch(() => {
        alert("Could not delete the row");
      });
  };

  const editPerson = (id) => {
    axios
      .get("http://localhost:8080/persons/" + id)
      .then((response) => {
        setSelected(response.data);
        setEdit(true);
      })
      .catch(() => {
        alert("cannot edit now");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/persons")
      .then((response) => {
        setPersons(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {edit ? (
        <Forms method="put" data={{id: selected._id, name: selected.person_name, place: selected.person_place}} />
      ) : (
        <div>
          <Divider />
          <br />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Place</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {persons.map((value, id) => {
                  return (
                    <TableRow key={id}>
                      <TableCell>{value.person_name}</TableCell>
                      <TableCell>{value.person_place}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => {
                            editPerson(value._id);
                          }}
                          color="success">
                          EDIT
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => {
                            deletePerson(value._id);
                          }}
                          color="error">
                          DELETE
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default TableArray;
