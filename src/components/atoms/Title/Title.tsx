import React from "react";
import Tstyle from "./Title.module.scss";
import Table from "@/components/organims/Table/Table";

interface TitleProps {
    title: string;
    description?: string;
    className?: string;
}

const Title = ({ title, description, className }: TitleProps) => {
    return (
        <div className={`${Tstyle.Title} ${className}`}>
            <h1 className={Tstyle.title_h1}>{title}</h1>
            <p className={Tstyle.description}>{description}</p>
        </div>
    );
};

export default Title;
