import React from "react";
import Dstyle from "./Layout.module.scss";
import Aside from "@/Views/Aside/Aside";
import { StudentProvider } from "@/Context/StudentContext";

interface LayoutProps {
    children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        // <StudentProvider>
        <div className={Dstyle.Layout_dash}>
            <div className={Dstyle.cnt_aside}>
                <Aside />
            </div>
            <div className={Dstyle.cnt_view}>{children}</div>
        </div>
        // </StudentProvider>
    );
};

export default Layout;
