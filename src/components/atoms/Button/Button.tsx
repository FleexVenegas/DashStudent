import Bstyle from "./Button.module.scss";

interface ButtonProps {
    text: string;
    className?: string;
    type?: "submit" | "button" | "reset" | undefined;
    typeButton?: "default" | "cancel" | undefined;
    onClick?: () => void;
}

const Button = ({
    text,
    className,
    type,
    onClick,
    typeButton = "default",
}: ButtonProps) => {
    return (
        <button
            className={`${Bstyle.Button} ${Bstyle.btnEx} ${
                typeButton === "default" ? Bstyle.btn_submit : Bstyle.btn_cancel
            } ${className}`}
            type={type}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
