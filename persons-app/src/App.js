import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Forms from "./components/Forms";
import TableArray from "./components/TableArray";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route
          path="/add"
          element={
            <Forms method="post" data={{ id: "", name: "", place: "" }} />
          }
        />
        <Route path="/" element={<TableArray />} />
      </Routes>
    </div>
  );
}

export default App;
