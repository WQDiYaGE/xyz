import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddItem from "./pages/AddItem";


function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" Component={AddItem} />
      </Routes>
    </Router>

  );
};

export default App;
