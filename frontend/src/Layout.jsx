import { Outlet } from "react-router-dom";
import Header from "./pages/Header";

export default function Layout() {
    return (
        <div className="p-1 md:p-3 flex flex-col min-h-screen">
            <Header />
            <Outlet />
        </div>
    )
}