import { Navigate, Outlet} from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../services/AuthContext";


const RouteGuard = ({children}) => {
    const { user } = useContext(AuthContext);
    if (!user._id) {
        return <Navigate to="/authentication/login" replace />
    }

    return children ? children : <Outlet />;
}

export default RouteGuard;