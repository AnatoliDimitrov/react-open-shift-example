import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <div className="footer">
          <div className="d-sm-flex justify-content-center justify-content-sm-between">
            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Premium {/* <Link to="/">Bootstrap admin template</Link> from BootstrapDash. */}</span>
            <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Copyright © 2021. All rights reserved.</span>
          </div>
        </div>
    );
}