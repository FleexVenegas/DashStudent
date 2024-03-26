"use client";

import { Student } from "@/Interfaces/ApiStudent";
import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
} from "react";

// Definir el tipo para el contexto
interface StudentContextType {
    student: Student[]; // Puedes reemplazar 'any' con el tipo adecuado de tus objetos de estudiante
    setStudent: Dispatch<SetStateAction<Student[]>>; // Aquí también puedes reemplazar 'any' con el tipo adecuado
    requests: number;
    setRequests: Dispatch<SetStateAction<number>>;
}

// Inicializar el contexto con un valor predeterminado
export const StudentContext = createContext<StudentContextType>({
    student: [],
    setStudent: () => {},
    requests: 0,
    setRequests: () => {},
});

interface Props {
    children: React.ReactNode;
}

export const StudentProvider: React.FC<Props> = ({ children }) => {
    const [student, setStudent] = useState<Student[]>([]); // Inicializar con un array vacío
    const [requests, setRequests] = useState<number>(0);

    return (
        <StudentContext.Provider
            value={{
                student,
                setStudent,
                requests,
                setRequests,
            }}
        >
            {children}
        </StudentContext.Provider>
    );
};
