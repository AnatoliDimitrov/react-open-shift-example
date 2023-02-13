import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import authentication from "../../services/authentication";
import { AuthContext } from "../../services/AuthContext";

export const DeleteUser = () => {
    
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const {userLogout} = useContext(AuthContext);

    useEffect(() => {
        authentication.deleteUser(user._id)
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