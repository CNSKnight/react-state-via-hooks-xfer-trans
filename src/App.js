import * as React from "react";
import { XferForm } from "./transfer";
import { TransHistory, type TransHistoryAction } from "./transactionsHistory";

const App = () => {
  // don't instantiate w/anything or use a TransHistoryAction?
  const [toDispatch, appDispatch] = React.useState();
  return (
    <div className="App">
      <header>
        <div className="container">
          <span className="logo">
            <span className="flipH">B</span>
            <span>T</span>
            <span>B</span>
          </span>
          <span className="banner">Big Town Bank</span>
        </div>
      </header>
      <main>
        <div className="container">
          <XferForm appDispatch={appDispatch} />
          {
            // unless TransHistory covers the {} state case,
            // `Cannot create `TransHistory` element because  object literal [1] is incompatible with `TransHistoryAction` [2] in property `toDispatch`. Flow(InferError)`
          }
          <TransHistory toDispatch={toDispatch} />
        </div>
      </main>
    </div>
  );
};

export default App;
