export class Usuario {
    id: number;
    username: string;
    password: string;
    activo: number;  
    rol: string;

    constructor(
        id?: number,
        username?: string,
        password?: string,
        activo?: number,
        rol?: string
    ) {
        this.id = id ?? 0;
        this.username = username ?? '';
        this.password = password ?? '';
        this.activo = activo ?? 1;
        this.rol = rol ?? '';
    }
}
