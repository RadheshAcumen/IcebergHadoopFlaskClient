import { useNavigate } from "react-router-dom";
import logo from "../assets/icons/acumenVelocityLogo.svg"

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="bg-background shadow-custom-soft rounded-lg text-darkText p-3 px-5 w-full">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src={logo} width={80} className="min-w-[40px]" />
                </div>
                <div>
                <h1 className="fw_700 text-4xl">Acumen Vega Iceberg</h1>
                <h6 className="text-base">Migrate and Unify Your Data to Iceberg on Google Cloud</h6>
                </div>
                <button
                    onClick={() => {
                        localStorage.removeItem("accessToken");
                        navigate("/");
                    }}
                    className="text-white px-3 py-1 text-sm sm:px-4 sm:py-1.5 rounded-md hover:bg-red-400 bg-red-500"
                    // style={{ backgroundColor: "#ff0000" }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;