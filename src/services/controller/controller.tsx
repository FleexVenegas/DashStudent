import { formatDate } from "@/utilities/Validations/FormatDate";
import {
    getAxiosApi,
    postAxiosApi,
    studentDeleteApi,
    updateStudent,
} from "../api/Api";
import { CreateStudent, Student, UpdateStudent } from "@/Interfaces/ApiStudent";

export const createStudent = async (data: CreateStudent) => {
    try {
        const response = await postAxiosApi("/api/v1/student", data);
        if (response.status === "ok") {
            const newResponseFormt = response.data.map((data: Student) => {
                return {
                    ...data,
                    createdAt: formatDate(data.createdAt),
                };
            });

            return {
                message: response.message,
                status: response.status,
                data: newResponseFormt[0],
            };
        }
    } catch (error) {
        console.log(error);
    }
};

export const removeStudent = async (id: string) => {
    try {
        const response = await studentDeleteApi(`/api/v1/student/${id}`);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getStudent = async () => {
    try {
        const datasResponse = await getAxiosApi("/api/v1/student");
        const newDatas = datasResponse.map((data: Student) => {
            return {
                ...data,
                createdAt: formatDate(data.createdAt),
            };
        });

        return newDatas;
    } catch (error) {
        return error;
    }
};

export const getOneStudent = async (id: string | undefined) => {
    try {
        const response = await getAxiosApi(`/api/v1/student/${id}`);

        // Filtrar solo los campos que necesitas
        const { _id, createdAt, updatedAt, __v, ...filteredData } = response;
        return filteredData;
    } catch (error) {
        return error;
    }
};

export const updateStudent_ = async (
    data: UpdateStudent,
    id: string | undefined
) => {
    try {
        const response = await updateStudent(`/api/v1/student/${id}`, data);
        if (response.status === "ok") {
            const newResponseFormt = response.data.map((data: Student) => {
                return {
                    ...data,
                    createdAt: formatDate(data.createdAt),
                };
            });

            return {
                message: response.message,
                status: response.status,
                data: newResponseFormt[0],
            };
        }
    } catch (error) {
        console.log(error);
    }
};
