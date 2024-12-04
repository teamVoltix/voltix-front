import { Invoice } from './invoice';
import { Measurement } from './measurement';
import { User } from './user';

export interface ComparisonResults {
  user: User;
  invoice: Invoice;
  measurement: Measurement;
  isComparisonValid: boolean;
  created_at: string;
  updated_at: string;
}

export interface ComparisonResponse {
  comparison_status: string;
  created_at: string;
  invoice_id: number;
  measurement_id: number;
  result: ComparisonMeasurementInvoice;
}

export interface ComparisonMeasurementInvoice {
  coincidencia_general: boolean;
  total_a_pagar: {
    factura: number;
    coincide_total: boolean;
    calculo_medicion: number;
  };
  detalles_consumo: {
    total_consumption_kwh: {
      difference: number;
      invoice: number;
      matches: boolean;
      measurement: number;
    };
  };
  periodo_facturacion: {
    coincide_fechas: boolean;
    dias_facturados: number;
    fecha_fin_factura: string;
    fecha_fin_medicion: string;
    fecha_inicio_factura: string;
    fecha_inicio_medicion: string;
  };
}

