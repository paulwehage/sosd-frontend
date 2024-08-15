export interface KeyMetric {
  name: string;
  value: number;
  dataType: 'integer' | 'decimal';
  timestamp: string;
}

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

export interface GetInfrastructureElementsParams {
  tags: string[];
  matchAll: boolean;
}