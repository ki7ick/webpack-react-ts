import "./App.css";
import style2 from "./App.scss";
import "./App2.scss";
import "./App3.scss";
import "./App4.scss";

const App = () => {
  return (
    <div className={style2.root2}>
      <h1>Hello232</h1>
      <button onClick={() => alert("hello")}>Click Me</button>
    </div>
  );
};

export default App;
