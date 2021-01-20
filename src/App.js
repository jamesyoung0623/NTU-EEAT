import "./App.css";
import { BrowserRouter } from "react-router-dom";

import Home from "./js/home.js";

function App() {
  return (
    <BrowserRouter>
      <div className="mybody">
        <Home />
      </div>
    </BrowserRouter>
  );
}

export default App;
