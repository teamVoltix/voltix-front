export interface Measurement {
  id: number;
  checked: boolean;
  date: string;
  compare: string;

  initialDate: string;
  endDate: string;
  measuredDays: number;
  consumption: number;
  estimatedAmount: number;
}
