import { Outlet } from 'react-router-dom';
import { Footer } from "../Footer";
import { Sidebar } from "../Sidebar";
import { Navbar } from "../Navbar";
import { Settings } from "../Settings";

export const PageLayout = () => (
    <>
        <Navbar />
        <Settings />
        <div className="container-fluid page-body-wrapper pt-0">
            <Sidebar />
            <Outlet />
        </div>
        <Footer />
    </>
);