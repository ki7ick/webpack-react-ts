import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import "./App.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          Hello world!1111
          <Link to="/work">Click to Work</Link>
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
