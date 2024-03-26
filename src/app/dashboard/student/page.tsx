"use client";
import { ChangeEvent, useEffect, useState } from "react";

// Styles
import Sstyle from "./Student.module.scss";

// Assets
import Update from "@/assets/icons/update.png";

// Components
import Container from "@/components/molecules/Container/Container";
import Title from "@/components/atoms/Title/Title";
import Table from "@/components/organims/Table/Table";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";

// Views
import StudentEdit from "@/Views/StudentEdit/StudentEdit";
import StudentCreate from "@/Views/StudentCreate/StudentCreate";

// Validations
import { normalizeString } from "@/utilities/Validations/RemoveAccent";

//Services
import { getStudent, removeStudent } from "@/services/controller/controller";

// Intrefaces
import { Student } from "@/Interfaces/ApiStudent";

// Context
import { useStudent } from "@/Context/UseStudent";

import {
    Question,
    Successfully,
} from "@/components/molecules/Modal/SweetAlertModal";

const Student = () => {
    const columns = [
        {
            header: "ID",
            accessor: "_id",
            width: "8%",
        },
        {
            header: "Name",
            accessor: "name",
            width: "15%",
        },
        {
            header: "Lastname",
            accessor: "lastname",
            width: "15%",
        },
        {
            header: "Email",
            accessor: "email",
            width: "17%",
        },
        {
            header: "Password",
            accessor: "password",
            width: "15%",
        },
        {
            header: "Status",
            accessor: "status",
            width: "10%",
        },
        {
            header: "Created",
            accessor: "createdAt",
            width: "10%",
        },
    ];

    const { student, setStudent, requests } = useStudent();
    const [idInitial, setIdInitial] = useState<string>("");
    const [viewEdit, setViewEdit] = useState<boolean>(false);
    const [viewCreate, setViewCreate] = useState<boolean>(false);
    const [dataBackup, setDataBackup] = useState<Student[]>([]);
    const [search, setSearch] = useState<string>("");
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);

    const handleEdit = (id: string) => {
        // Quitamos el scroll de navegacion
        document.body.classList.add("no-scroll");

        setIdInitial(id);
        setViewEdit(true);
    };

    const handleCreateStudent = () => {
        // Quitamos el scroll de navegacion
        document.body.classList.add("no-scroll");
        setViewCreate(true);
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearch(value);
    };

    const handleInput = () => {
        setIsTyping(true);
        if (typingTimer) {
            clearTimeout(typingTimer);
        }
        const timer = setTimeout(() => {
            setIsTyping(false);
        }, 1500);
        setTypingTimer(timer);
    };

    useEffect(() => {
        if (search.length === 0) {
            setStudent(dataBackup);
        } else if (search.length > 2 && !isTyping) {
            const normalizedSearch = normalizeString(search.toLowerCase());
            const newDatas = dataBackup?.filter(
                (dt) =>
                    (dt.lastname &&
                        normalizeString(dt?.lastname.toLowerCase()) ===
                            normalizedSearch) ||
                    dt?._id?.toLowerCase() === search.toLowerCase()
            );

            setStudent(newDatas);
        }
    }, [search, isTyping]);

    // Aqui empieza las peticiones al backend

    // Funcion para eliminar un estudiante
    const handleDelete = async (id: string) => {
        const confirmation = await Question();
        if (confirmation.isConfirmed) {
            const removalResponse = await removeStudent(id);
            if (removalResponse.status === "ok") {
                Successfully(removalResponse.message);
                setStudent(student.filter((student_) => student_._id !== id));
            }
        }
    };

    // Se obtiene todos los registros de la base de datos.
    const handleGetStudents = async () => {
        const data = await getStudent();
        setStudent(data);
        setDataBackup(data);
    };

    useEffect(() => {
        handleGetStudents();
    }, []);

    return (
        <Container className={Sstyle.Student}>
            <div className={Sstyle.student_layer2}>
                <Title
                    title="Student"
                    description="Aqui podra crear regisros"
                />
                <div className={Sstyle.cnt_button}>
                    <div className={Sstyle.btn_spin}>
                        <button
                            className={Sstyle.btn_update}
                            onClick={handleGetStudents}
                        >
                            <img
                                src={Update.src}
                                alt=""
                                className={Sstyle.img_}
                            />
                        </button>
                        <div className={Sstyle.span_update}>Update table</div>
                    </div>
                    <Input
                        text="Search"
                        className={Sstyle.classInput}
                        name="search"
                        value={search}
                        onChange={handleSearch}
                        onInput={handleInput}
                    />
                    <Button
                        text="Create"
                        className={Sstyle.bnt_create}
                        onClick={handleCreateStudent}
                    />
                </div>
            </div>
            <div className={Sstyle.cntDatas} style={{ width: "100%" }}>
                <Table
                    data={student}
                    columns={columns}
                    rowPorPage={8}
                    functionEdit={handleEdit}
                    functionDelete={handleDelete}
                    actions
                />
            </div>

            {viewCreate && <StudentCreate setCancelCreate={setViewCreate} />}

            {viewEdit && (
                <StudentEdit setCancelEdit={setViewEdit} id={idInitial} />
            )}
        </Container>
    );
};

export default Student;
