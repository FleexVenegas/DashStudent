import Cookies from 'universal-cookie';

interface CookieOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
}

export const setCookie = (cookieName: string, token: string, options?: CookieOptions) => {
  try {
    const _cookies = new Cookies();
    _cookies.set(cookieName, token, options);
    return { message: 'OK', cookies: true };
  } catch (error) {
    console.error('Error al establecer la cookie:', error);
    return { message: 'Error al establecer la cookie', cookies: false };
  }
};

export const getCookie = (cookieName: string) => {
  try {
    const _cookies = new Cookies();
    return _cookies.get(cookieName);
  } catch (error) {
    console.error('Error al obtener la cookie:', error);
    return null;
  }
};
