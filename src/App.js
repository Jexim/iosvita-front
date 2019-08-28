import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import CatalogPage from "./pages/CatalogPage";

import "../node_modules/bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={CatalogPage} />
      </Router>
    </Provider>
  );
}

export default App;
