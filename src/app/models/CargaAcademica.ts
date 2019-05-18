export interface CargaAcademicaInterface {
  topic_id: number;
  horario_id: number;
  month_year: string;
  sucursal_cod: string;
  fecha_inicio: string;
  carga_academica_cod?: string;
  personal_cod?: string;
  estado: number;
}

export class CargaAcademica implements CargaAcademicaInterface {
  constructor(
  // tslint:disable-next-line: variable-name
  // tslint:disable-next-line: max-line-length
    public topic_id: number, public horario_id: number, public month_year: string, public sucursal_cod: string, public fecha_inicio: string, public estado: number, public carga_academica_cod?: string, public personal_cod?: string
  ) { }
}
