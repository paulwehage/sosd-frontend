import React, { FC, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Paper } from '@mui/material';
import usePipeline from '../hooks/pipelines/usePipeline.ts';
import useHistoricalData from '../hooks/historicalData/useHistoricalData.ts';
import LoadingCircle from '../components/LoadingCircle.tsx';
import PipelineHeader from '../components/pipelines/PipelineHeader.tsx';
import IntegrationSteps from '../components/pipelines/IntegrationSteps.tsx';
import DeploymentSteps from '../components/pipelines/DeploymentSteps.tsx';
import PipelineHistoricalChart from '../components/pipelines/PipelineHistoricalChart.tsx';

const PipelinePage: FC = () => {
  const { pipelineId } = useParams<{ pipelineId: string }>();
  const pipelineIdNumber = Number(pipelineId);
  const [selectedRunId, setSelectedRunId] = useState<number | null>(null);

  const { data: pipelineData, loading: pipelineLoading, error: pipelineError } = usePipeline(pipelineIdNumber);

  const historicalDataParams = useMemo(() => ({
    type: 'cicd' as const,
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date().toISOString(),
    serviceId: pipelineId
  }), [pipelineId]);

  const { data: historicalData, loading: historicalLoading, error: historicalError } = useHistoricalData(historicalDataParams);

  if (pipelineLoading || historicalLoading) return <LoadingCircle />;
  if (pipelineError || historicalError) return <div>Error loading data</div>;

  const selectedRun = pipelineData.cicdPipelineRuns.find(run => run.id === selectedRunId) || pipelineData.cicdPipelineRuns[0];

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <PipelineHeader
          pipeline={pipelineData}
          selectedRunId={selectedRunId}
          onRunChange={setSelectedRunId}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <IntegrationSteps steps={selectedRun.cicdPipelineStepMeasurements.filter(step => step.stepName === 'integration')} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DeploymentSteps steps={selectedRun.cicdPipelineStepMeasurements.filter(step => step.stepName === 'deployment')} />
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ p: 2 }}>
        <PipelineHistoricalChart data={historicalData} />
      </Paper>
    </Box>
  );
};

export default PipelinePage;