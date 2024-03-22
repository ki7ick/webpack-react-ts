import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import KPng from "./assets/kickr.png";
import KSvg from "./assets/kickr.svg";
import "./App.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          Hello world!1111
          <Link to="/work">Click to Work</Link>
          <img src={KPng} />
          <img src={KSvg} />
        </div>
      ),
    },
    {
      path: "/work",
      element: <Link to="/home">Work, To Home</Link>,
    },
    {
      path: "/home",
      element: <Link to="/work">Home, To Work</Link>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
