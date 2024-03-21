import "./App.css";

const App = () => {
  return (
    <div className="root">
      <h1>Hello</h1>
      <button onClick={() => alert("hello")} className="root">
        Click Me
      </button>
    </div>
  );
};

export default App;
