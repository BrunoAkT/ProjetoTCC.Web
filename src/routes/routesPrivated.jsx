import { useRoutes } from "react-router-dom";
import Dashboard from "../pages/dashboard/dashboard.jsx";
import Home from "../pages/home/home.jsx";
import Data from "../pages/data/data.jsx";
import DataAdd from "../pages/data/dataAdd.jsx";
// import Statistics from "../pages/Statistics";
// import Notifications from "../pages/Notifications";
// import Settings from "../pages/Settings";

function RoutesPrivated() {
  return useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        { path: "", element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "data", element: <Data /> },
        { path: "dataAdd", element: <DataAdd /> },
        // { path: "notifications", element: <Notifications /> },
        // { path: "settings", element: <Settings /> },
      ],
    },
  ]);
}

export default RoutesPrivated;
