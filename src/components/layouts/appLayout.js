import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar";
import { formatString } from "../helper/helper"
import back from "../../assets/icons/back.png"
import logo from "../../assets/icons/acumenVelocityLogo.svg";

const AppLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname.split('/')[1] || "Acumen Vega";
    const navigate = useNavigate()
    return (
        <div className="flex w-full">
            {/* <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} /> */}

            {/* <div
                className={`transition-all duration-300 flex-1 overflow-y-auto  ${isOpen ? "md:ml-64" : "md:ml-16"} ml-16`}
            > */}
            {/* <header className="fixed w-full top-0 bg-gradient-to-r from-gradientColorFrom to-gradientColorTo border-b border-white-600 text-primaryText shadow-md p-4 z-40"> */}
            <header className="fixed w-full top-0 bg-white  text-primaryText shadow-md p-4 z-40">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <img src={logo} alt="Logo" className="w-16 h-auto mr-3 cursor-pointer" onClick={() => navigate('/dashboard')} />
                        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/dashboard')} >{formatString("Acumen Vega")}</h1>
                    </div>
                    <div>
                        <button className="rounded-md py-1 px-3 text-white hover:bg-slate-400" onClick={() => { localStorage.clear(); navigate('/') }} style={{ backgroundColor: "#ff0000" }}>Logout</button>
                    </div>
                </div>
            </header >
            <div className="min-h-screen bg-slate-50 pt-16 w-full">
                <Outlet />
            </div>
            {/* </div> */}
        </div >
    );
};

export default AppLayout;