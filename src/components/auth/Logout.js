import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import authentication from "../../services/authentication";
import { AuthContext } from "../../services/AuthContext";

export const Logout = () => {
    const navigate = useNavigate();
    const {userLogout} = useContext(AuthContext);

    useEffect(() => {
        authentication.logout()
            .then(() => {
                userLogout();
                navigate('/');
            })
            .catch(() => {
                navigate('/');
            });
    }, []);

    return null;
};