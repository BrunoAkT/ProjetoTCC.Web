import RoutesPrivated from "./routesPrivated.jsx";
import RoutesOpen from "./routesOpen.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/auth.jsx";

function Routes() {

    const id = localStorage.getItem("sessionID");

    return id ? <RoutesPrivated /> : <RoutesOpen />;
}

export default Routes;