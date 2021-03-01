import React from "react";
import { render } from "react-dom";
import { Galaxy } from "~/filter/Galaxy.tsx";

const App = () => {
  return <Galaxy />;
};

render(<App />, document.getElementById("root"));
