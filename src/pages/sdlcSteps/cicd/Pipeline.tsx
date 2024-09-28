import React, { FC, useState, useMemo, useEffect } from 'react';
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

// Main component to display detailed information about a specific CICD pipeline (Layer 4)
const PipelinePage: FC = () => {
  // Get the pipeline ID from the URL parameters
  const { pipelineId } = useParams<{ pipelineId: string }>();
  const pipelineIdNumber = Number(pipelineId); // Convert pipeline ID to a number

  // State for managing selected run within the pipeline
  const [selectedRunId, setSelectedRunId] = useState<number | null>(null);

  // Fetch pipeline details using a custom hook
  const { data: pipelineData, loading: pipelineLoading, error: pipelineError } = usePipeline(pipelineIdNumber);

  // Get the active project context to access its tags and other details
  const { activeProject } = useProjectContext();
  const projectTags = useMemo(() => activeProject?.tags.map(tag => tag.name) || [], [activeProject?.tags]);

  // Set breadcrumb information in the context based on pipeline data for navigation purposes
  const { setBreadcrumbInfo } = useProjectContext();
  useEffect(() => {
    if (pipelineData) {
      setBreadcrumbInfo({ pipelineName: pipelineData.pipelineName });
    }
    // Cleanup breadcrumb info when component is unmounted or pipelineData changes
    return () => {
      setBreadcrumbInfo({ pipelineName: '' });
    };
  }, [pipelineData, setBreadcrumbInfo]);

  // Parameters for fetching historical data related to the pipeline
  const historicalDataParams = useMemo(() => ({
    type: 'pipeline' as const, // Specify type as 'pipeline'
    startDate: dayjs('2024-07-03').startOf('day').toISOString(), // Start date in ISO format
    endDate: dayjs('2024-07-25').endOf('day').toISOString(),     // End date in ISO format
    tags: projectTags, // Filter by project tags
    pipelineId: pipelineId // Filter by pipeline ID
  }), [pipelineId, projectTags]);

  // Fetch historical data using the memoized parameters
  const {
    data: historicalData,
    loading: historicalLoading,
    error: historicalError
  } = useHistoricalData(historicalDataParams);

  // Select the most recent pipeline run once the pipeline data is available
  useEffect(() => {
    if (pipelineData && pipelineData.cicdPipelineRuns.length > 0) {
      const latestRun = pipelineData.cicdPipelineRuns[pipelineData.cicdPipelineRuns.length - 1];
      setSelectedRunId(latestRun.id);
    }
  }, [pipelineData]);

  // Display loading state if either pipeline or historical data is being fetched
  if (pipelineLoading || historicalLoading) return <LoadingCircle />;

  // Display error message if there was an error fetching pipeline or historical data
  if (pipelineError || historicalError) return <div>Error loading data</div>;

  // Get the selected run or default to the most recent run in the pipeline
  const selectedRun = pipelineData.cicdPipelineRuns.find(run => run.id === selectedRunId) || pipelineData.cicdPipelineRuns[pipelineData.cicdPipelineRuns.length - 1];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Left Column: Pipeline details and steps */}
        <Grid item xs={12} md={6}>
          {/* Header for the pipeline, allowing selection of different runs */}
          <PipelineHeader
            pipeline={pipelineData}
            selectedRunId={selectedRunId}
            onRunChange={setSelectedRunId}
          />

          {/* Section Title */}
          <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>Pipeline Steps</Typography>

          {/* Integration Steps of the selected pipeline run */}
          <IntegrationSteps
            steps={selectedRun.cicdPipelineStepMeasurements.filter(step => step.stepName === 'integration')}
          />

          {/* Deployment Steps of the selected pipeline run */}
          <DeploymentSteps
            steps={selectedRun.cicdPipelineStepMeasurements.filter(step => step.stepName === 'deployment')}
          />
        </Grid>

        {/* Right Column: Historical data chart */}
        <Grid item xs={12} md={6}>
          {/* Render historical data chart in a styled paper component */}
          <Paper elevation={3} sx={{ p: 3 }}>
            <PipelineHistoricalChart data={historicalData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PipelinePage;
