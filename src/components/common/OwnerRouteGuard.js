import { Navigate, Outlet, useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../services/AuthContext";
import auth from '../../services/authentication.js';

const OwnerRouteGuard = ({ children }) => {
    const { user } = useContext(AuthContext);
    const { nftId } = useParams();
    const [nft, setNft] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        auth.getOne(nftId)
        .then(result => {
            console.log(result.nft);
            setNft(result.nft);
            if (user._id != result.nft.owner) {
                return navigate('/product/catalog', {replace: true});
            }
        
            return children ? children : <Outlet />;
        });
    
    }, [nftId]);

    
    
}

export default OwnerRouteGuard;