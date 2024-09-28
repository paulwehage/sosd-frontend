import React, { useMemo } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import useOperations from '../../../hooks/operations/useOperations.ts';
import useHistoricalData from '../../../hooks/historicalData/useHistoricalData.ts';
import InfrastructureElementList from '../../../components/operations/InfrastructureElementList.tsx';
import OperationsHistoricalChart from '../../../components/operations/OperationsHistoricalChart.tsx';
import dayjs from 'dayjs';
import useProjectContext from '../../../hooks/context/useProjectContext.ts';

// Main component to display operations-related information about emissions for a specific project (Layer 3)
const OperationsPage: React.FC = () => {
  // Access the active project context to get details of the currently selected project
  const { activeProject } = useProjectContext();

  // Extract tags from the active project and memoize them for filtering purposes
  const projectTags = useMemo(() =>
      activeProject?.tags.map(tag => tag.name) || [],
    [activeProject?.tags]
  );

  // Fetch infrastructure elements based on the project's tags
  const { data: infrastructureElements, loading: opsLoading, error: opsError } = useOperations({ tags: projectTags });

  // Fetch historical data related to 'operations' using the project's tags and a fixed date range
  const { data: historicalData, loading: historicalLoading, error: historicalError } = useHistoricalData ({
    type: 'operations' as const, // Specify the type for the data query
    startDate: dayjs('2024-05-16').startOf('day').toISOString(), // Start date in ISO format
    endDate: dayjs('2024-07-16').startOf('day').toISOString(),   // End date in ISO format
    tags: projectTags // Use project tags to filter the data
  });

  // If there's no active project, display an appropriate message
  if (!activeProject) return <Typography>No active project selected</Typography>;

  // Display loading state if either infrastructure elements or historical data are being fetched
  if (opsLoading || historicalLoading) return <Typography>Loading...</Typography>;

  // Display error message if any error occurs while fetching operations or historical data
  if (opsError || historicalError) return <Typography>Error loading data</Typography>;

  return (
    <Box p={3}>
      {/* Display the name of the active project and a description of the operations dashboard */}
      <Typography variant="h4" gutterBottom>{activeProject.name} - Operations Dashboard</Typography>

      <Grid container spacing={3}>
        {/* Left Column: List of infrastructure elements */}
        <Grid item xs={12} md={6}>
          {/* Display the infrastructure elements associated with the active project */}
          <InfrastructureElementList elements={infrastructureElements} />
        </Grid>

        {/* Right Column: Chart displaying historical operations data */}
        <Grid item xs={12} md={6}>
          {/* Display the historical operations chart */}
          <OperationsHistoricalChart data={historicalData} loading={historicalLoading} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OperationsPage;
