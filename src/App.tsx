import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./modules/Home";
import Workbench from "./modules/Workbench";
import "./App.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/workbench",
          element: <Workbench />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
