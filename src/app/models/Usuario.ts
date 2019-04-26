export interface UsuarioInterface {
  usuario_cod?: string;
  sucursal_code?: string;
  is_admin?: string;
  estado?: number;
  photo?: string;
  email: string;
  password: string;
}

export class Usuario implements UsuarioInterface {
  constructor(public email: string, public password: string) { }
}
