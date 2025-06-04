import React from "react";
import Select from "react-select";
import clsx from "clsx"; // Utility to conditionally apply Tailwind classes

const SelectDropdown = ({ options, value, onChange, placeholder, name, isDisabled = false }) => {
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: "1px solid #B0B3C7",
            borderRadius: "7px",
            fontSize: "14px",
            padding: "1px 1px",
            backgroundColor: "#FFFFFF",
            width: "100%",
            boxShadow: state.isFocused ? "0 0 0 1px rgba(75, 85, 99, 1)" : "",
        }),
        input: (provided) => ({
            ...provided,
            color: "#4B5563",
            fontSize: "14px",
            textAlign: "left"
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "#B0B3C7",
            textAlign: "left",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#4B5563",
            textAlign: "left",
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: "7px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }),
        option: (provided, state) => ({
            ...provided,
            padding: "8px 12px",
            fontSize: "14px",
            backgroundColor: state.isSelected
                ? "#1E40AF"
                : state.isFocused
                    ? "#F1F5F9"
                    : "transparent",
            color: state.isSelected ? "#FFFFFF" : "#4B5563",
            textAlign: "left",
        }),
    };

    return (
        <div className="w-full">
            <Select
                isDisabled={isDisabled}
                options={options}
                value={options.find((option) => option.value === value) || ""}
                onChange={(selectedOption) => onChange(name, selectedOption.value, selectedOption)}
                placeholder={placeholder}
                styles={customStyles}
                classNamePrefix="react-select"
                className={clsx("react-select-container w-full")}
            />
        </div>
    );
};

export default SelectDropdown;