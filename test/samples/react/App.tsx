import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import RootRouter from "./routes/RootRouter";

// store
import store from "./stores";

/**
 * App
 */
function App() {
  return (
    <Provider store={store}>
      <Router>
        <RootRouter />
      </Router>
    </Provider>
  );
}

export default App;
