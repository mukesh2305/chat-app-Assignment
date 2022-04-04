import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux';
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import Hii from "./Context/Hii"
ReactDOM.render(
  <Provider store={store}>

    <App />
    {/**  this is for to understand context Api*/}
    {/* <Hii /> */}
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example:x` reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
