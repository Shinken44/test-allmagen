export interface Chart {
  CTR: number;
  EvPM: number;
  time: Date;
}

export interface TableData {
  impression_count: number;
  event_count: number;
  field: string;
}

export interface Table extends TableData {
  click_count: number;
  CTR: number;
  EvPM: number;
}
