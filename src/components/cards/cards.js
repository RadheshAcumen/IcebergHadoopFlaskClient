import React from "react";
import { useNavigate } from "react-router-dom";
import rightArrow from "../../assets/icons/rightArrow.webp";

const Card = ({ fromIcon, icon, title, path }) => {
    const navigate = useNavigate();

    return (
        <div
            className="curved-cards p-4 text-center h-44 md:h-48 lg:h-52 w-full md:w-[22%] cursor-pointer"
            onClick={() => navigate(path)}
        >
            {/* Inner Shadow Effect */}
            <div className="absolute inset-0 rounded-[30px] shadow-inner pointer-events-none"></div>

            {/* Icon */}
            {icon && (
                <div className="flex gap-4">
                    <img src={fromIcon} alt="Icon" className="h-14 w-14 object-contain mb-2" />
                    <img src={rightArrow} alt="Arrow" className="w-6 object-contain mb-2" />
                    <img src={icon} alt="Icon" className="h-14 w-14 object-contain mb-2" />
                </div>
            )}

            {/* Title */}
            {title && (
                <h3 className="text-gray-800 text-sm md:text-base lg:text-lg font-medium text-center">
                    {title}
                </h3>
            )}
        </div>
    );
};

export default Card;