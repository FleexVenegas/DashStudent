"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

// Components
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";

// Styles
import Mstyle from "./page.module.scss";

const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const route = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (parseInt(inputValue) === 5) {
            route.push("/dashboard");
        }
    };

    return (
        <div className={Mstyle.MainLogin}>
            <div className={Mstyle.cnt_min_login}>
                <div className={Mstyle.cnt_header}>
                    <h1 className={Mstyle.title_}>DashStudent</h1>
                    <p>
                        ¡Bienvenido al Dashboard de Registro de Alumnos! Aquí
                        podrás registrar y gestionar información sobre nuestros
                        alumnos de manera eficiente.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className={Mstyle.form}>
                    <Input
                        text="Introduce el número 5"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.currentTarget.value)}
                        className={Mstyle.input}
                    />

                    <Button text="Entrar" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default Home;
