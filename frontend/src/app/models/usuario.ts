export class Usuario {
    id: number;
    username: string;
    password: string;
    activo: number;  
    rol: string;

    constructor(
        id: number,
        username: string,
        password: string,
        activo: number,
        rol: string
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.activo = activo;
        this.rol = rol;
    }
}
