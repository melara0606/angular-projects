export interface SucursalInterface {
  sucursal_cod?: string;
  email?: string;
  nombre: string;
  estado: number;
  telefono: string;
  direccion: string;
  save?: boolean;
}

export class Sucursal implements SucursalInterface {
  constructor(
    public nombre, public telefono, public estado, public direccion, public sucursal_cod, public email, public save = false
  ) { }
}
