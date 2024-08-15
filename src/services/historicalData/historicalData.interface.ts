export interface CrossProjectHistoricalDataPoint {
  project_id: number;
  project_name: string;
  date: string;
  total_co2_consumption: number;
}

export interface ProjectHistoricalDataPoint {
  project_id: number;
  project_name: string;
  date: string;
  total_co2_consumption: number;
}


export interface HistoricalDataParams {
  startDate: string;
  endDate: string;
}

export interface ProjectSdlcHistoricalDataParams  {
  dateParams: HistoricalDataParams;
  type: string;
  tags: string[];
}

export type HistoricalDataType = 'crossProject' | 'project'  /* | other types */;
