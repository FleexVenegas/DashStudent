import React, { useEffect, useState } from "react";
import Cstyle from "./ContainerStudent.module.scss";

interface ContainerStudentProps {
    className?: string;
    children?: React.ReactNode;
    time?: number;
    statusControl?: boolean;
    // setCancelModal?: (value: boolean) => void;
}

const ContainerStudent = ({
    className,
    children,
    time = 100,
    statusControl,
}: ContainerStudentProps) => {
    const [viewModal, setViewModal] = useState<boolean>(false);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setViewModal(true);
        }, time);

        return () => {
            clearTimeout(timerId);
        };
    }, []);

    useEffect(() => {
        if (statusControl) {
            setViewModal(false);
        }
    }, [statusControl]);

    return (
        <div className={`${Cstyle.ContainerStudent} ${className}`}>
            <div
                className={`${Cstyle.inside_cnt} ${
                    viewModal ? Cstyle.opacityModal : ""
                }`}
            >
                {children}
            </div>
        </div>
    );
};

export default ContainerStudent;
