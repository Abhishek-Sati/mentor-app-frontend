import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "./routes";

function App() {
  return (
    <section className="container">
      <Router>{renderRoutes(routes)}</Router>
    </section>
  );
}

export default App;
