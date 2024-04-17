import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
//da ti opravq headeraaaa
export default function Layout(){
    //grabs the location of the user
    const location = useLocation();
    return(
        <div className="px-8 flex flex-col min-h-screen overflow-visible">
            {/*if the location is /, the header is sticky */}
            {/* if the location is login or register the header is hidden */}
            {location.pathname !== '/login' && location.pathname !== '/register' && (
                <Header className={location.pathname === '/' ? 'sticky top-0 z-50' : ''}/>
            )}
            <Outlet/>
            {(location.pathname === '/' || location.pathname.startsWith('/place')) && <Footer/>}
        </div>
    );
}