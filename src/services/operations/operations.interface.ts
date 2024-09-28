/**
 * Interface representing a key metric.
 *
 * @interface KeyMetric
 * @property {string} name - The name of the key metric.
 * @property {number} value - The value of the key metric.
 * @property {'integer' | 'decimal'} dataType - The data type of the key metric.
 * @property {string} timestamp - The timestamp of the key metric.
 */
export interface KeyMetric {
  name: string;
  value: number;
  dataType: 'integer' | 'decimal';
  timestamp: string;
}

/**
 * Interface representing an infrastructure element.
 *
 * @interface InfrastructureElement
 * @property {number} id - The unique identifier for the infrastructure element.
 * @property {string} name - The name of the infrastructure element.
 * @property {string} type - The type of the infrastructure element.
 * @property {string} category - The category of the infrastructure element.
 * @property {string} cloudProvider - The cloud provider of the infrastructure element.
 * @property {string[]} tags - An array of tags associated with the infrastructure element.
 * @property {number} totalCo2 - The total CO2 emissions of the infrastructure element.
 * @property {Object} keyMetrics - The key metrics of the infrastructure element.
 * @property {number} keyMetrics.dailyCo2Consumption - The daily CO2 consumption of the infrastructure element.
 * @property {KeyMetric} keyMetrics.keyMetric1 - The first key metric of the infrastructure element.
 * @property {KeyMetric} keyMetrics.keyMetric2 - The second key metric of the infrastructure element.
 */
export interface InfrastructureElement {
  id: number;
  name: string;
  type: string;
  category: string;
  cloudProvider: string;
  tags: string[];
  totalCo2: number;
  keyMetrics: {
    dailyCo2Consumption: number;
    keyMetric1: KeyMetric;
    keyMetric2: KeyMetric;
  };
}

/**
 * Interface representing detailed information about an infrastructure element.
 *
 * @interface InfrastructureElementDetail
 * @extends InfrastructureElement
 * @property {Metric[]} metrics - An array of metrics associated with the infrastructure element.
 */
export interface InfrastructureElementDetail extends InfrastructureElement {
  metrics: Metric[];
}

/**
 * Interface representing a metric.
 *
 * @interface Metric
 * @property {string} name - The name of the metric.
 * @property {string | number} value - The value of the metric.
 * @property {'integer' | 'decimal' | 'string'} dataType - The data type of the metric.
 * @property {string} timestamp - The timestamp of the metric.
 */
export interface Metric {
  name: string;
  value: string | number;
  dataType: 'integer' | 'decimal' | 'string';
  timestamp: string;
}

/**
 * Interface representing the parameters for fetching infrastructure elements.
 *
 * @interface GetInfrastructureElementsParams
 * @property {string[]} tags - An array of tags to filter the infrastructure elements.
 * @property {boolean} matchAll - Whether to match all tags or any tag.
 */
export interface GetInfrastructureElementsParams {
  tags: string[];
  matchAll: boolean;
}