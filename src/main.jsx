import "./app/assets/styles/index.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import Modal from 'react-modal';

import App from "./app/App";
import { store } from "./app/redux-store/store";
Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>

);
