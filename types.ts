
export interface ShipData {
  id: string;
  name: string;
  origin: string;
  eta: string;
  status: 'In Transit' | 'Docking' | 'Departed';
  cargo: string;
}

export interface MetricData {
  label: string;
  value: string | number;
  unit?: string;
  trend: 'up' | 'down';
  change: string;
}

export type AspectRatio = '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '9:16' | '16:9' | '21:9';
export type ImageSize = '1K' | '2K' | '4K';
