import { ChangeEvent, useState } from "react";

// Components
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import Title from "@/components/atoms/Title/Title";
import ContainerStudent from "@/components/molecules/ContainerStudent/ContainerStudent";
import InputSelect from "@/components/atoms/InputSelect/InputSelect";
import { Successfully } from "@/components/molecules/Modal/SweetAlertModal";

// Styles
import Cstyle from "./StudentCreate.module.scss";

// Validations
import { Validations } from "@/utilities/Validations/Validations";
import { generatePassword as gp } from "@/utilities/Validations/GeneratePassword";

// Services
import { createStudent } from "@/services/controller/controller";
import { useStudent } from "@/Context/UseStudent";

interface StudentCreateProps {
    setCancelCreate?: (value: boolean) => void;
    setCloseCeate?: string;
}

const StudentCreate = ({ setCancelCreate }: StudentCreateProps) => {
    const { student, setStudent } = useStudent();

    const [studentData, setStudentData] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        status: "inactive",
    });
    const [hiddenModal, setHiddenModal] = useState<boolean>(false);

    const handleCancelEdit = () => {
        // Quitamos el scroll de navegacion
        document.body.classList.remove("no-scroll");

        setHiddenModal(true);
        const timerId = setTimeout(() => {
            setCancelCreate?.(false);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { value, name } = e.currentTarget;
        setStudentData({
            ...studentData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validation = Validations(studentData);
        if (validation) {
            const response = await createStudent(studentData);
            if (response?.status === "ok") {
                Successfully(response.message);
                setStudent([...student, response.data]);
                handleCancelEdit();
            }
        }
    };

    // Genera una password segura para el estudiante
    const generatePassword = () => {
        const genePassword = gp(8);
        setStudentData({
            ...studentData,
            password: genePassword,
        });
    };

    return (
        <ContainerStudent statusControl={hiddenModal}>
            <div className={Cstyle.blockHeader}>
                <Title title="Add" description="new student" />
            </div>
            <form onSubmit={handleSubmit} className={Cstyle.form}>
                <div className={Cstyle.secct_div}>
                    <Input
                        text="Name"
                        name="name"
                        value={studentData.name}
                        onChange={handleChange}
                    />
                    <Input
                        text="Lastname"
                        name="lastname"
                        value={studentData.lastname}
                        onChange={handleChange}
                    />
                </div>
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    value={studentData.email}
                    onChange={handleChange}
                />
                <div className={Cstyle.secct_div}>
                    <Input
                        text="Password"
                        type="password"
                        name="password"
                        value={studentData.password}
                        onChange={handleChange}
                    />
                    <button
                        className={Cstyle.g_pass}
                        type="button"
                        onClick={generatePassword}
                    >
                        Generate password
                    </button>
                </div>
                <InputSelect
                    text="Student Status"
                    name="status"
                    value={studentData.status}
                    onChange={handleChange}
                />
                <div className={Cstyle.cntButtons}>
                    <Button
                        className={Cstyle.btn_cancel}
                        typeButton="cancel"
                        text="Cancel"
                        type="button"
                        onClick={handleCancelEdit}
                    />
                    <Button
                        text="Save"
                        type="submit"
                        className={Cstyle.btn_submit}
                    />
                </div>
            </form>
        </ContainerStudent>
    );
};

export default StudentCreate;
