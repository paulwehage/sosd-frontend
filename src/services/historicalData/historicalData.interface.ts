/**
 * Interface representing a data point for cross-project historical data.
 *
 * @interface CrossProjectHistoricalDataPoint
 * @property {number} project_id - The unique identifier for the project.
 * @property {string} project_name - The name of the project.
 * @property {string} date - The date of the data point.
 * @property {number} total_co2_consumption - The total CO2 consumption for the project on the given date.
 */
export interface CrossProjectHistoricalDataPoint {
  project_id: number;
  project_name: string;
  date: string;
  total_co2_consumption: number;
}

/**
 * Interface representing a data point for project historical data.
 *
 * @interface ProjectHistoricalDataPoint
 * @property {number} project_id - The unique identifier for the project.
 * @property {string} project_name - The name of the project.
 * @property {string} date - The date of the data point.
 * @property {number} total_co2_consumption - The total CO2 consumption for the project on the given date.
 */
export interface ProjectHistoricalDataPoint {
  project_id: number;
  project_name: string;
  date: string;
  total_co2_consumption: number;
}

/**
 * Interface representing a data point for operations historical data.
 *
 * @interface OperationsHistoricalDataPoint
 * @property {string} date - The date of the data point.
 * @property {string} infrastructure_element_name - The name of the infrastructure element.
 * @property {string} service_name - The name of the service.
 * @property {string} cloud_provider - The cloud provider of the service.
 * @property {number} total_co2_consumption - The total CO2 consumption for the operations on the given date.
 */
export interface OperationsHistoricalDataPoint {
  date: string;
  infrastructure_element_name: string;
  service_name: string;
  cloud_provider: string;
  total_co2_consumption: number;
}

/**
 * Interface representing a data point for infrastructure element historical data.
 *
 * @interface InfrastructureElementHistoricalDataPoint
 * @property {string} infrastructure_type - The type of the infrastructure.
 * @property {string} service_id - The unique identifier for the service.
 * @property {string} date - The date of the data point.
 * @property {number} total_co2_consumption - The total CO2 consumption for the infrastructure element on the given date.
 */
export interface InfrastructureElementHistoricalDataPoint {
  infrastructure_type: string;
  service_id: string;
  date: string;
  total_co2_consumption: number;
}

/**
 * Interface representing a data point for pipeline historical data.
 *
 * @interface PipelineHistoricalDataPoint
 * @property {string} pipeline_name - The name of the pipeline.
 * @property {string} pipeline_id - The unique identifier for the pipeline.
 * @property {string} date - The date of the data point.
 * @property {number} total_co2_consumption - The total CO2 consumption for the pipeline on the given date.
 */
export interface PipelineHistoricalDataPoint {
  pipeline_name: string;
  pipeline_id: string;
  date: string;
  total_co2_consumption: number;
}

/**
 * Interface representing the parameters for historical data.
 *
 * @interface HistoricalDataParams
 * @property {string} startDate - The start date for the historical data.
 * @property {string} endDate - The end date for the historical data.
 */
export interface HistoricalDataParams {
  startDate: string;
  endDate: string;
}