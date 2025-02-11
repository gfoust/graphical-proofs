import React, { BrowserRouter } from 'react-router-dom';
import 'bootstrap';

import Page from "./page";
import ViewState from './state';

import "./root.scss";

export default function Root() {
  return (
    <ViewState>
      <BrowserRouter basename="/gfoust/classes/hnrs2050/proofs/">
        <Page/>
      </BrowserRouter>
    </ViewState>
  );
}
