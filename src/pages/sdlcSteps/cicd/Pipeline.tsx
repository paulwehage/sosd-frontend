import React, {FC, useState, useMemo, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Paper, Typography } from '@mui/material';
import usePipeline from '../../../hooks/pipelines/usePipeline.ts';
import useHistoricalData from '../../../hooks/historicalData/useHistoricalData.ts';
import LoadingCircle from '../../../components/LoadingCircle.tsx';
import PipelineHeader from '../../../components/pipelines/PipelineHeader.tsx';
import IntegrationSteps from '../../../components/pipelines/IntegrationSteps.tsx';
import DeploymentSteps from '../../../components/pipelines/DeploymentSteps.tsx';
import PipelineHistoricalChart from '../../../components/pipelines/PipelineHistoricalChart.tsx';
import useProjectContext from '../../../hooks/context/useProjectContext.ts';
import dayjs from 'dayjs';

const PipelinePage: FC = () => {
  const { pipelineId } = useParams<{ pipelineId: string }>();
  const pipelineIdNumber = Number(pipelineId);
  const [selectedRunId, setSelectedRunId] = useState<number | null>(null);
  const { data: pipelineData, loading: pipelineLoading, error: pipelineError } = usePipeline(pipelineIdNumber);
  const { activeProject } = useProjectContext();
  const projectTags = useMemo(() => activeProject?.tags.map(tag => tag.name) || [], [activeProject?.tags]);
  const { setBreadcrumbInfo } = useProjectContext();

  useEffect(() => {
    if (pipelineData) {
      setBreadcrumbInfo({ pipelineName: pipelineData.pipelineName });
    }
    return () => {
      setBreadcrumbInfo({ pipelineName: '' });
    };
  }, [pipelineData, setBreadcrumbInfo]);

  const historicalDataParams = useMemo(() => ({
    type: 'pipeline' as const,
    startDate: dayjs('2024-07-03').startOf('day').toISOString(),  // Start of day ISO format
    endDate: dayjs('2024-07-25').endOf('day').toISOString(),        // End of day ISO format
    tags: projectTags,
    pipelineId: pipelineId
  }), [pipelineId, projectTags]);

  const {
    data: historicalData,
    loading: historicalLoading,
    error: historicalError
  } = useHistoricalData(historicalDataParams);

  useEffect(() => {
    if (pipelineData && pipelineData.cicdPipelineRuns.length > 0) {
      const latestRun = pipelineData.cicdPipelineRuns[pipelineData.cicdPipelineRuns.length - 1];
      setSelectedRunId(latestRun.id);
    }
  }, [pipelineData]);

  if (pipelineLoading || historicalLoading) return <LoadingCircle />;
  if (pipelineError || historicalError) return <div>Error loading data</div>;

  const selectedRun = pipelineData.cicdPipelineRuns.find(run => run.id === selectedRunId) || pipelineData.cicdPipelineRuns[pipelineData.cicdPipelineRuns.length - 1];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
            <PipelineHeader
              pipeline={pipelineData}
              selectedRunId={selectedRunId}
              onRunChange={setSelectedRunId}
            />
            <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>Pipeline Steps</Typography>
            <IntegrationSteps
              steps={selectedRun.cicdPipelineStepMeasurements.filter(step => step.stepName === 'integration')}
            />
            <DeploymentSteps
              steps={selectedRun.cicdPipelineStepMeasurements.filter(step => step.stepName === 'deployment')}
            />
        </Grid>

        {/* Rechte Spalte */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <PipelineHistoricalChart data={historicalData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PipelinePage;