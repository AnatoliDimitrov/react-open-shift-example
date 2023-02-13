import { Link } from "react-router-dom";

export const OwnNft = ({nft}) => {
    return (

        <div className="col-lg-4 col-xl-3 col-md-6 col-sm-6 col-12">
            <Link to={`/product/details/${nft._id}`} className="rn-collection-inner-one">
                <div className="collection-wrapper">
                    <div className="collection-big-thumbnail">
                        <img src={nft.imageUrl} alt="Nft_Profile" />
                    </div>
                    <div className="collection-deg">
                        <h6 className="title">{nft.name}</h6>
                        <span className="items">{nft.likers.length} Likes</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};