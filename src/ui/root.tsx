import React, { BrowserRouter } from 'react-router-dom';
import 'bootstrap';

import Page from "./page";
import ViewState from './state';

import "./root.scss";

export default function Root() {
  return (
    <ViewState>
      <BrowserRouter basename="/proofs/">
        <Page/>
      </BrowserRouter>
    </ViewState>
  );
}
