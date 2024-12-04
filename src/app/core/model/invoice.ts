export interface Invoice {
  id: number,
  comparison_status: string,
  billing_period_start: Date,
  billing_period_end: Date,
  data: {
    mandato: string,
    forma_pago: string,
    fecha_cargo: string,
    fecha_emision: string,
    nombre_cliente: string,
    desglose_cargos: {
      impuestos: string,
      descuentos: string,
      costo_energia: string,
      total_a_pagar: string,
      costo_potencia: string
    },
    detalles_consumo: {
      consumo_punta: string,
      consumo_total: string,
      consumo_valle: string,
      precio_efectivo_energia: string
    },
    numero_referencia: string,
    periodo_facturacion: {
      fin: string,
      dias: string,
      inicio: string,
    }
  },
  created_at: Date,
  updated_at: Date,
  user: number
}