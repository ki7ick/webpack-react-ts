import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root")!);

const render = () => {
  root.render(<App />);
};

render();

if (module.hot) {
  module.hot.accept("./App", render);
}
