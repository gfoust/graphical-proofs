import { useReducer } from "react";

import App from "../app";
import { initialModel } from "../model/model";
import { modelReducer } from "../model/reducers";

import Display from "./display";
import { NavBar } from "./navbar";

import "./page.scss";



export default function Page() {
  const [model, dispatch] = useReducer(modelReducer, initialModel({}));
  App.dispatch = dispatch;

  return (
    <proof-page>
      <h1 className="page">Problem 4B</h1>
      <NavBar panel={model.panel}/>
      <Display panel={model.panel}/>
    </proof-page>)
}
