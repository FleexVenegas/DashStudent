import { ChildrenProps } from "@/Interfaces/Children";
import c_style from "./Container.module.scss";

const Container = ({ children, className }: ChildrenProps) => {
    return (
        <div className={`${c_style.Container} ${className}`}>{children}</div>
    );
};

export default Container;
