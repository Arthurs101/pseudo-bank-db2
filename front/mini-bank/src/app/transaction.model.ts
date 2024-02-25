
export interface Transaction {
    titular: string;
    descripcion: string;
    autorizacion: number;
    monto: number;
    numeroComprobante: number;
    fecha: Date;
    numeroDocumento: number;
  }
  