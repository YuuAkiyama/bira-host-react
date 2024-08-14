import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { initialize as initializeFirebase } from "./lib/firebase";

import "./index.css";
import "./style/loader.css";
import App from "./view/App";

initializeFirebase();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
