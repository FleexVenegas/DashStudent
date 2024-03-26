import { ChangeEvent, useEffect, useRef, useState } from "react";
import ISstyle from "./InputSelect.module.scss";

interface InputSelectProps {
    text?: string;
    placeholder?: string;
    value?: string;
    type?: string;
    name?: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const InputSelect = ({
    text,
    placeholder,
    type = "text",
    name,
    value,
    onChange,
}: InputSelectProps) => {
    const [activeInput, setActiveInput] = useState<boolean>(false);
    const [lengthData, setLengthData] = useState<string>("");
    const selectRef = useRef<HTMLSelectElement>(null);

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
                    if (selectRef.current) {
                        selectRef.current.blur(); // Quitar el foco del input
                    }
                }
            }, 3000);
        }

        return () => clearTimeout(timeoutId);
    }, [activeInput, lengthData]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setLengthData(value);
        if (onChange) {
            onChange(e); // Llamada a la función onChange externa
        }
    };

    const handleFocus = () => {
        setActiveInput(true);
    };

    return (
        <div className={ISstyle.InputSelect}>
            {text && (
                <span
                    onClick={() => setActiveInput(true)}
                    className={`${ISstyle.text_input} ${
                        activeInput ? ISstyle.move_text : ""
                    }`}
                >
                    {text}
                </span>
            )}
            <select
                ref={selectRef}
                value={value}
                name={name}
                id="select_"
                className={ISstyle.Select}
                onChange={handleChange}
                onFocus={handleFocus}
                required
            >
                <option value=""></option>
                <option value="inactive">Inactive</option>
                <option value="pedding">Pedding</option>
                <option value="active">Active</option>
            </select>
        </div>
    );
};

export default InputSelect;
