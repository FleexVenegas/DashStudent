import { UpdateStudent } from "@/Interfaces/ApiStudent";

export const updateStudent = async (url: string, data: UpdateStudent) => {
    try {
        if (!data) throw new Error("Data is null or undefined");

        const server = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(`${server}${url}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch: ${response.status} ${response.statusText}`
            );
        }

        return await response.json();
    } catch (error) {}
};

export const postAxiosApi = async (url: string, data: any) => {
    try {
        if (!data) {
            throw new Error("Data is null or undefined");
        }

        const server = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(`${server}${url}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch: ${response.status} ${response.statusText}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Error while fetching data:", error);
        throw error;
    }
};

export const getAxiosApi = async (url: string) => {
    try {
        const server = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(`${server}${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch: ${response.status} ${response.statusText}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error;
    }
};

export const studentDeleteApi = async (url: string) => {
    try {
        const server = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(`${server}${url}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(
                `Failed to delete: ${response.status} ${response.statusText}`
            );
        }

        // No es necesario realizar un parseo de la respuesta ya que DELETE no devolverá datos normalmente
        return await response.json(); // No hay datos para devolver en una solicitud DELETE
    } catch (error) {
        console.error("Error during delete request:", error);
        throw error; // Re-lanzar el error para que el código que llama a esta función pueda manejarlo adecuadamente
    }
};

// export const getAxiosApiWithToken = async (url: string, token: string) => {
//     try {
//         const server = import.meta.env.VITE_BACKEND_URL;
//         const response = await axios.get(`${server}${url}`, {
//             withCredentials: true,
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error en la solicitud:", error);
//         throw error;
//     }
// };

// export const postAxiosApiWithToken = async (
//     url: string,
//     form: FormData | null,
//     token: string
// ) => {
//     try {
//         if (form === null) {
//             throw new Error("FormData is null");
//         }

//         const server = import.meta.env.VITE_BACKEND_URL;

//         const response = await axios.post(`${server}${url}`, form, {
//             withCredentials: true,
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         return error;
//     }
// };
