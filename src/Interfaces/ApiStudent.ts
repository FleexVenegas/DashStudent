export interface Student {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export type CreateStudent = Omit<Student, "_id" | "createdAt" | "updatedAt">;
export type UpdateStudent = Partial<CreateStudent>;
