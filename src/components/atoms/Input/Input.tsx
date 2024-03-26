import React, { ChangeEvent, useEffect, useRef, useState } from "react";

// Assets
import ViewPass from "@/assets/icons/eye.svg";
import ViewPassOff from "@/assets/icons/eye_off.svg";

// Styles
import Istyle from "./Input.module.scss";

interface InputProps {
    text?: string;
    placeholder?: string;
    value?: string;
    type?: string;
    name?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onInput?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.ChangeEventHandler<HTMLInputElement>;
    className?: string;
}

const Input: React.FC<InputProps> = ({
    text,
    placeholder,
    type = "text",
    name,
    value,
    onChange,
    onInput,
    onBlur,
    className,
}) => {
    const [activeInput, setActiveInput] = useState<boolean>(false);
    const [lengthData, setLengthData] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [changeType, setChangeType] = useState<boolean>(false);

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

    const handleFocus = () => {
        setActiveInput(true);
    };

    const handleType = () => {
        setChangeType(!changeType);
    };

    return (
        <div className={`${Istyle.Cnt_Input} ${className}`}>
            {text && (
                <span
                    onClick={() => setActiveInput(true)}
                    className={`${Istyle.text_input} ${
                        activeInput ? Istyle.move_text : ""
                    }`}
                >
                    {text}
                </span>
            )}
            <div className={Istyle.cnt_input_pass}>
                <input
                    ref={inputRef}
                    className={Istyle.input}
                    type={changeType ? "text" : type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onClick={() => setActiveInput(true)}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onInput={onInput}
                    onBlur={onBlur}
                    required
                />
                {type === "password" && (
                    <img
                        src={changeType ? ViewPassOff.src : ViewPass.src}
                        alt=""
                        className={Istyle.img_}
                        onClick={handleType}
                    />
                )}
            </div>
        </div>
    );
};

export default Input;
