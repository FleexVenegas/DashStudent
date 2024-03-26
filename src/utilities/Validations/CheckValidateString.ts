export const checkValidateString = (_string: string): boolean => {
    if (_string.length > 8 && /\d/.test(_string) && /[!@#$%^&*(),.?":{}|<>]/.test(_string)) {
        return true; // Retorna true si todas las condiciones se cumplen
    }

    return false; // Retorna false si alguna condición no se cumple
};
