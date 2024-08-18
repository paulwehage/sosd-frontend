import React, { useMemo } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import useOperations from '../../../hooks/operations/useOperations.ts';
import useHistoricalData from '../../../hooks/historicalData/useHistoricalData.ts';
import InfrastructureElementList from '../../../components/operations/InfrastructureElementList.tsx';
import OperationsHistoricalChart from '../../../components/operations/OperationsHistoricalChart.tsx';
import dayjs from 'dayjs';
import useProjectContext from '../../../hooks/context/useProjectContext.ts';

const OperationsPage: React.FC = () => {
  const { activeProject } = useProjectContext();

  const projectTags = useMemo(() =>
      activeProject?.tags.map(tag => tag.name) || [],
    [activeProject?.tags]
  );

  const { data: infrastructureElements, loading: opsLoading, error: opsError } = useOperations({ tags: projectTags });

  const historicalDataParams = useMemo(() => ({
    type: 'operations' as const,
    startDate: dayjs('2024-05-16').startOf('day').toISOString(),
    endDate: dayjs('2024-07-16').startOf('day').toISOString(),
    tags: projectTags
  }), [projectTags]);

  const { data: historicalData, loading: historicalLoading, error: historicalError } = useHistoricalData(historicalDataParams);

  if (!activeProject) return <Typography>No active project selected</Typography>;
  if (opsLoading || historicalLoading) return <Typography>Loading...</Typography>;
  if (opsError || historicalError) return <Typography>Error loading data</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>{activeProject.name} - Operations Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InfrastructureElementList elements={infrastructureElements} />
        </Grid>
        <Grid item xs={12} md={6}>
          <OperationsHistoricalChart data={historicalData}  loading={historicalLoading}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OperationsPage;