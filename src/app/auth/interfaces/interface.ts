export interface DatosUsuario {
    email   : string;
    password: string;
    name?   : string;
}

export interface DatosLogin {
    ok      : boolean;
    uid?    : string;
    name?   : string;
    token?  : string;
    email?  : string;
    msg?    : string;
}

export interface Usuario {
    uid     : string;
    name    : string;
    email   : string
}

export interface LoginError {
    error: {
        ok  : string;
        msg : string
    }
}
