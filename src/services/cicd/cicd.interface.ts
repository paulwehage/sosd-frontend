import KeyMetrics from '../../components/infrastructureElements/KeyMetrics.tsx';

export interface GetPipelinesParams {
  tags: string[];
  matchAll: boolean;
}

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

type KeyMetric = {
  weekly_co2_consumption: number,
  integration_consumption_last_run: number,
  deployment_consumption_last_run: number
}