import { IProductOrder } from './product.interface';

export interface IOrder {
  idMesa: string;
  correo?: string;
  name?: string;
  idOrden: string;
  fechaInicio: Date;
  fechaFin: Date;
  pedido: IProductOrder[];
  totalPagado: number;
  enviado: boolean;
  facturado: boolean;
  user?: any;
}
