import { Navigate, Outlet} from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../services/AuthContext";


const GuestRouteGuard = ({children}) => {
    const { user } = useContext(AuthContext);
    if (user._id) {
        return <Navigate to="/" replace />
    }

    return children ? children : <Outlet />;
}

export default GuestRouteGuard;