export interface Measurement {
  id: number;
  comparison_status: string;
  measurement_start: string;
  measurement_end: string;
  data: MeasurementData;
  user: number;
  created_at: string;
  updated_at: string;
  checked?: boolean;
}

export interface MeasurementData {
  consumo_total: number;
  periodo_medicion: MeasurementPeriod;
  tension_promedio: number;
  corriente_promedio: PeakValley;
  eventos_registrados: RecordedEvents;
  potencia_maxima_demandada: PeakValley;
  consumo_por_franja_horaria: PeakValley;
  factor_de_potencia_promedio: number;
}

export interface MeasurementPeriod {
  fin: string;
  inicio: string;
}

export interface PeakValley {
  punta: number;
  valle: number;
}

export interface RecordedEvents {
  interrupciones: number;
  caidas_de_tension: number;
}
