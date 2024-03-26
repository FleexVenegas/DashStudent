import React, { ChangeEvent, useEffect, useRef, useState } from "react";

// Styles
import Sestyle from "./Select.module.scss";

interface SelectProps {
    text?: string;
    placeholder?: string;
    value?: string;
    type?: string;
    name?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Select: React.FC<SelectProps> = ({
    text,
    placeholder,
    type = "text",
    name,
    value,
    onChange,
}) => {
    const [activeInput, setActiveInput] = useState<boolean>(false);
    const [lengthData, setLengthData] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [optionOpenModal, setOptionOpenModal] = useState<boolean>(false);
    const [selectValue, setSelectValue] = useState<string>("")

    useEffect(() => {
        // If value prop is provided, set activeInput to true
        if (value !== undefined && value !== null && value !== "") {
            setActiveInput(true);
        }
    }, [value]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (activeInput) {
            timeoutId = setTimeout(() => {
                if (value === "") {
                    setActiveInput(false);
                    setOptionOpenModal(false);
                    if (inputRef.current) {
                        inputRef.current.blur(); // Quitar el foco del input
                    }
                }
            }, 3000);
        }

        return () => clearTimeout(timeoutId);
    }, [activeInput, lengthData]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLengthData(value);
        if (onChange) {
            onChange(e); // Llamada a la función onChange externa
        }
    };

    const handleValueSelect = (value: string) => {
        setSelectValue(value)
    };

    const handleFocus = () => {
        setOptionOpenModal(true);
    };

    const optionsList = [
        {
            id: 1,
            label: "Inactive",
            value: "inactive",
        },
        {
            id: 2,
            label: "Pedding",
            value: "pedding",
        },
        {
            id: 3,
            label: "Active",
            value: "active",
        },
    ];

    return (
        <div className={Sestyle.Select}>
            {text && (
                <span
                    onClick={() => setActiveInput(true)}
                    className={`${Sestyle.text_input} ${
                        activeInput ? Sestyle.move_text : ""
                    }`}
                >
                    {text}
                </span>
            )}

            <div className={Sestyle.cntSelect}>
                <input
                    ref={inputRef}
                    className={Sestyle.select_}
                    type={type}
                    name={name}
                    value={selectValue}
                    placeholder={placeholder}
                    onClick={() => setActiveInput(true)}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    readOnly={true}
                    required
                />

                <button
                    className={Sestyle.btn_arrow}
                    type="button"
                    onClick={() => setActiveInput(!activeInput)}
                >
                    {optionOpenModal ? "\u25B2" : "\u25BC"}
                </button>
                <div
                    className={`${Sestyle.cntOptions} ${
                        optionOpenModal ? Sestyle.showOptions : ""
                    }`}
                >
                    <ul className={Sestyle.cntUl}>
                        {optionsList.map((_, idx) => {
                            return (
                                <li
                                    key={idx}
                                    className={Sestyle.opt_li}
                                    onClick={() =>
                                        handleValueSelect(_.value)
                                    }
                                >
                                    {_.label}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Select;
