import React from "react";
import { render } from "react-dom";
import { Galaxy } from "~/filter/Galaxy.tsx";
import { Noise } from "~/filter/CanvasNoise";
import "~/index.css";

const App = () => {
  return <Galaxy />;
};

render(<App />, document.getElementById("root"));
