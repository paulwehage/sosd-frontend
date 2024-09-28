/**
 * Interface representing a Pipeline.
 *
 * @interface Pipeline
 * @property {number} id - The unique identifier for the pipeline.
 * @property {string} repoName - The name of the repository associated with the pipeline.
 * @property {string} branch - The branch of the repository.
 * @property {string} cloudProvider - The cloud provider where the pipeline is hosted.
 * @property {string} pipelineName - The name of the pipeline.
 * @property {number} totalCo2 - The total CO2 emissions of the pipeline.
 * @property {string[]} tags - An array of tags associated with the pipeline.
 * @property {KeyMetric} [keyMetrics] - Optional key metrics related to the pipeline.
 */
export interface Pipeline {
  id: number;
  repoName: string;
  branch: string;
  cloudProvider: string;
  pipelineName: string;
  totalCo2: number;
  tags: string[];
  keyMetrics?: KeyMetric;
}

/**
 * Type representing key metrics for a pipeline.
 *
 * @typedef {Object} KeyMetric
 * @property {number} weekly_co2_consumption - The weekly CO2 consumption of the pipeline.
 * @property {number} integration_consumption_last_run - The CO2 consumption during the last integration run.
 * @property {number} deployment_consumption_last_run - The CO2 consumption during the last deployment run.
 */
type KeyMetric = {
  weekly_co2_consumption: number,
  integration_consumption_last_run: number,
  deployment_consumption_last_run: number
}