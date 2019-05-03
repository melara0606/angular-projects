export interface PefilInterface {
  id?: number;
  nombre: string;
  estado?: number;
  icon?: string;
  recursos?: any[];
}

export class Perfil implements PefilInterface {
  constructor(
    public nombre: string,
    public id?: number,
    public estado?: number,
    public recursos?: any[]
  ) { }
}
