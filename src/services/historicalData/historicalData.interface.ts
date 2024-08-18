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

export interface OperationsHistoricalDataPoint {
  date: string;
  infrastructure_element_name: string;
  service_name: string;
  cloud_provider: string;
  total_co2_consumption: number;
}

export interface InfrastructureElementHistoricalDataPoint {
    infrastructure_type: string;
    service_id: string;
    date: string;
    total_co2_consumption: number;
}

export interface PipelineHistoricalDataPoint {
  pipeline_name: string;
  pipeline_id: string;
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
