"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Styles
import Astyle from "./Aside.module.scss";
import lyout_style from "../../app/dashboard/Layout.module.scss";

// Assets
import Homes from "@/assets/icons/home.png";
import Student from "@/assets/icons/user.png";
import Arrow from "@/assets/icons/arrow.png";
import { useEffect, useState } from "react";

const Aside = () => {
    const path = usePathname();

    const [growAside, setGrowAside] = useState<boolean>(false);

    const optionSidebar = [
        {
            id: 1,
            text: "Dashboard",
            icon: Homes,
            url: "/dashboard",
        },
        {
            id: 2,
            text: "Student",
            icon: Student,
            url: "/dashboard/student",
        },
        // {
        //     id: 3,
        //     text: "Invoice",
        //     icon: Homes,
        //     url: "/dashboard/invoice",
        // },
    ];

    useEffect(() => {
        const asideClass = document.querySelector(".Layout_Layout_dash__tbnu7");
        // const asideClass = document.querySelector(lyout_style.Layout_dash);
        if (asideClass) {
            asideClass.classList.toggle(lyout_style.dismcnt_tbn, growAside);
        }
    }, [growAside]);

    return (
        <aside className={`${Astyle.Aside}`}>
            <header className={Astyle.Header}>
                <div className={Astyle.block_cnt}>
                    <h1
                        className={`${Astyle.title_block} ${
                            growAside ? Astyle.hiddenH1 : ""
                        }`}
                    >
                        DashStudent
                    </h1>
                    <h1
                        className={`${Astyle.h1_min} ${
                            growAside ? Astyle.hidden_h1 : ""
                        }`}
                    >
                        DS
                    </h1>
                </div>
            </header>
            <div className={Astyle.cnt_list}>
                <ul
                    className={`${Astyle.cntUl} ${
                        growAside ? Astyle.minu_padd : ""
                    }`}
                >
                    {optionSidebar.map((_, idx) => {
                        return (
                            <li
                                className={`${Astyle.option} ${
                                    growAside ? Astyle.option50 : ""
                                } ${path === _.url ? Astyle.active : ""}`}
                                key={idx}
                            >
                                <div className={Astyle.cnt_link}>
                                    <Link
                                        className={`${Astyle.link} ${
                                            growAside ? Astyle.link_pp : ""
                                        }`}
                                        href={_.url}
                                    >
                                        <img src={_.icon?.src} alt="" />
                                        <span
                                            className={`${Astyle.span_} ${
                                                growAside ? Astyle.hidden : ""
                                            }`}
                                        >
                                            {_.text}
                                        </span>
                                    </Link>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <button
                className={`${Astyle.bntOpen} ${
                    growAside ? Astyle.bnt_move : ""
                }`}
                onClick={() => setGrowAside(!growAside)}
            >
                <img
                    src={Arrow.src}
                    alt=""
                    className={`${Astyle.btn_img} ${
                        growAside ? Astyle.img_rotate : ""
                    }`}
                />
            </button>
        </aside>
    );
};

export default Aside;
