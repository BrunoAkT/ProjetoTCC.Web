import RoutesPrivated from "./routesPrivated.jsx";
import RoutesOpen from "./routesOpen.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/auth.jsx";

function Routes() {
    //const { user } = useContext(AuthContext);
    const user = true

    return user ? <RoutesPrivated /> : <RoutesOpen />;
}

export default Routes;