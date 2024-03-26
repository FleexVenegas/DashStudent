import { ChangeEvent, useEffect, useState } from "react";

// Components
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import Title from "@/components/atoms/Title/Title";
import ContainerStudent from "@/components/molecules/ContainerStudent/ContainerStudent";
import InputSelect from "@/components/atoms/InputSelect/InputSelect";
import { Successfully } from "@/components/molecules/Modal/SweetAlertModal";

// Styles
import Estyle from "./StudentEdit.module.scss";

// Validations
import { generatePassword as gp } from "@/utilities/Validations/GeneratePassword";
import { Validations } from "@/utilities/Validations/Validations";

// Interfaces
import { Student, UpdateStudent } from "@/Interfaces/ApiStudent";

// Services
import {
    getOneStudent,
    updateStudent_,
} from "@/services/controller/controller";
import { useStudent } from "@/Context/UseStudent";

interface StudentEditProps {
    setCancelEdit?: (value: boolean) => void;
    id?: string;
}

const StudentEdit = ({ setCancelEdit, id }: StudentEditProps) => {
    const { student, setStudent } = useStudent();

    const [studentData, setStudentData] = useState<UpdateStudent>({
        name: "",
        lastname: "",
        email: "",
        password: "",
        status: "",
    });

    const [hiddenModal, setHiddenModal] = useState<boolean>(false);

    const handleCancelEdit = () => {
        // Quitamos la clase que no nos deja hacer scroll
        document.body.classList.remove("no-scroll");

        setHiddenModal(true);
        const timerId = setTimeout(() => {
            setCancelEdit?.(false);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    };

    // Genera un password para el estudiante
    const generatePassword = () => {
        const genePassword = gp(8);
        setStudentData({
            ...studentData,
            password: genePassword,
        });
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
            const response = await updateStudent_(studentData, id);
            if (response?.status === "ok") {
                Successfully(response?.message);
                const timer = setTimeout(() => {
                    setStudent(
                        student.map((student_) =>
                            student_._id === id
                                ? { ...student_, ...response.data }
                                : student_
                        )
                    );

                    handleCancelEdit();
                }, 2000);

                return () => {
                    clearTimeout(timer);
                };
            }
        }
    };

    useEffect(() => {
        const getStudentApi = async () => {
            const response = await getOneStudent(id);
            setStudentData(response);
        };

        getStudentApi();
    }, []);

    return (
        <ContainerStudent statusControl={hiddenModal}>
            <div className={Estyle.blockHeader}>
                <Title title="Edit" description={`Id: ${id}`} />
            </div>
            <form onSubmit={handleSubmit} className={Estyle.form}>
                <div className={Estyle.secct_div}>
                    <Input
                        text="Name"
                        name="name"
                        value={studentData?.name}
                        onChange={handleChange}
                    />
                    <Input
                        text="Lastname"
                        name="lastname"
                        value={studentData?.lastname}
                        onChange={handleChange}
                    />
                </div>
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    value={studentData?.email}
                    onChange={handleChange}
                />
                <div className={Estyle.secct_div}>
                    <Input
                        text="Password"
                        type="password"
                        name="password"
                        value={studentData?.password}
                        onChange={handleChange}
                    />
                    <button
                        className={Estyle.g_pass}
                        type="button"
                        onClick={generatePassword}
                    >
                        Generate password
                    </button>
                </div>
                <InputSelect
                    text="Student Status"
                    name="status"
                    value={studentData?.status}
                    onChange={handleChange}
                />
                <div className={Estyle.cntButtons}>
                    <Button
                        className={Estyle.btn_cancel}
                        typeButton="cancel"
                        text="Cancel"
                        type="button"
                        onClick={handleCancelEdit}
                    />
                    <Button
                        text="Update"
                        type="submit"
                        className={Estyle.btn_submit}
                    />
                </div>
            </form>
        </ContainerStudent>
    );
};

export default StudentEdit;
