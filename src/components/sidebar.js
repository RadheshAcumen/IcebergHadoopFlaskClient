import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    FiHome
} from "react-icons/fi";
import {
    FaChevronLeft,
    FaChevronRight,
    FaChevronDown,
    FaChevronUp
} from "react-icons/fa";
import logo from "../assets/images/acumen_velocity_logo.jpg"
import { SiConvertio } from "react-icons/si";
import converter from "../assets/icons/converter_black.svg";

const Sidebar = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();
    const [isConversionToIceBerg, setIsConversionToIceBerg] = useState(isOpen);
    const [isConversionFromIceBerg, setIsConversionFromIceBerg] = useState(isOpen);
    const companyName = "Acumen Vega";

    const menuItems = [
        { name: "Home", path: "/", icon: <FiHome /> },
    ];

    const convertToIceBergOptions = [
        { name: "BigQuery To Iceberg", path: "/big-query-to-iceberg-converter" },
        { name: "Data Files to Iceberg", path: "/data-files-to-iceberg-converter" },
        { name: "Postgresql to Iceberg", path: "/postgresql-to-iceberg-converter" },
        { name: "SQL-Server to Iceberg", path: "/sql-server-to-iceberg-converter" },
    ];

    const convertFromIceBergOptions = [
        { name: "Iceberg To PostgreSQL", path: "/iceberg-to-postgreSQL-converter" },
        { name: "Iceberg to Snowflake", path: "/iceberg-to-snowflake-conversion" },
    ];

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.clear();
        navigate('/');
    };

    return (
        <div
            className={`${isOpen ? "w-64" : "w-16"}  text-primaryText fixed h-full transition-all duration-300 z-50 flex flex-col border-r`}

        // className={`${isOpen ? "w-64" : "w-16"} bg-gradient-to-b from-gradientColorFrom to-gradientColorTo text-primaryText fixed h-full transition-all duration-300 z-50 flex flex-col`}
        >
            <div
                className="flex items-center justify-between p-4 cursor-pointer border-b"
                onClick={() => {
                    setIsOpen(!isOpen);
                    if (!isOpen) {
                        setIsConversionFromIceBerg(true);
                        setIsConversionToIceBerg(true);
                    } else {
                        setIsConversionFromIceBerg(false);
                        setIsConversionToIceBerg(false)
                    }
                }}
            >
                <span className="text-xl font-bold flex items-center w-full">
                    {isOpen ? (
                        <div className="flex w-full items-center justify-between">
                            <div className="flex gap-3 items-center">
                                <img
                                    src={logo}
                                    alt="Company Logo"
                                    className="object-cover rounded"
                                    // width={40}
                                    style={{ height: '25px', width: '25px' }}
                                />
                                <span title={companyName} className="text-start fs_14 truncate">{companyName ? companyName?.toLocaleUpperCase() : "Iceberg Converter"}</span>
                            </div>
                            <FaChevronLeft className="ml-2" />
                        </div>
                    ) : (
                        <div className="flex w-full items-center justify-between my-1">
                            <FaChevronRight />
                        </div>
                    )}
                </span>
            </div>

            {/* Menu Items */}
            <ul className="flex-grow overflow-y-auto mt-2 text-base fw_500">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <NavLink
                            to={item.path}
                            className="flex items-center p-4 hover:bg-hover rounded-md transition-colors"
                            activeClassName="bg-blue-900"
                        >
                            <span className="text-lg">{item.icon}</span>
                            {isOpen && <span className="ml-4">{item.name}</span>}
                        </NavLink>
                    </li>
                ))}

                <li>
                    <div
                        className="flex items-center p-4 hover:bg-hover rounded-md transition-colors cursor-pointer"
                        onClick={() => { setIsConversionToIceBerg(!isConversionToIceBerg); setIsOpen(true) }}
                    >
                        <span className="text-lg" onClick={() => setIsConversionToIceBerg(!isConversionToIceBerg)} > <SiConvertio /></span>
                        {isOpen && (
                            <>
                                <span className="ml-2" onClick={() => setIsConversionToIceBerg(!isConversionToIceBerg)} >Conversion To Iceberg</span>
                                <span className="ml-auto">
                                    {isConversionToIceBerg ? <FaChevronUp /> : <FaChevronDown />}
                                </span>
                            </>
                        )}
                    </div>
                    {isConversionToIceBerg && (
                        <ul className="ml-6">
                            {convertToIceBergOptions.map((option, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={option.path}
                                        className="flex items-center p-2 hover:bg-hover rounded-md transition-colors"
                                        activeClassName="bg-blue-900"
                                    >
                                        {isOpen && <span className="ml-4">{option.name}</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div
                        className="flex items-center p-4 hover:bg-hover rounded-md transition-colors cursor-pointer"
                        onClick={() => { setIsConversionFromIceBerg(!isConversionFromIceBerg) }}
                    >
                        <span className="" onClick={() => { setIsConversionFromIceBerg(!isConversionFromIceBerg); setIsOpen(true) }} >
                            <img
                                src={converter}
                                alt="Company Logo"
                                className="object-cover rounded"
                                width={20}

                            /> </span>
                        {isOpen && (
                            <>
                                <span className="ml-1" onClick={() => setIsConversionFromIceBerg(!isConversionFromIceBerg)} >Conversion From Iceberg</span>
                                <span className="ml-auto">
                                    {isConversionFromIceBerg ? <FaChevronUp /> : <FaChevronDown />}
                                </span>
                            </>
                        )}
                    </div>
                    {isConversionFromIceBerg && (
                        <ul className="ml-6">
                            {convertFromIceBergOptions.map((option, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={option.path}
                                        className="flex items-center p-2 hover:bg-hover rounded-md transition-colors"
                                        activeClassName="bg-blue-900"
                                    >
                                        {isOpen && <span className="ml-4">{option.name}</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    )}

                </li>
            </ul>

            {/* Logout Option */}
            {/* <div className="pb-8 w-full">
                <button
                    onClick={handleLogout}
                    className="flex items-center p-4 hover:hover transition-colors w-full text-left"
                >
                    <FaSignOutAlt className="text-lg" />
                    {isOpen && <span className="ml-4">Logout</span>}
                </button>
            </div> */}
        </div >
    );
};

export default Sidebar;
