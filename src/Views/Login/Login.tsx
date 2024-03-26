"use client";

import Input from "@/components/atoms/Input/Input";
import Lstyle from "./Login.module.scss";
import Button from "@/components/atoms/Button/Button";
import { FormEvent } from "react";

const Login = () => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Le diste clic aquí");
    };

    return (
        <div className={Lstyle.Login}>
            <div className={Lstyle.cnt_form}>
                <h1 className={Lstyle.title_login}>Login</h1>
                <form onSubmit={handleSubmit} className={Lstyle.form}>
                    <Input text="Your email" />
                    <Input text="Your password" type="password" />
                    <Button text="Login" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default Login;
