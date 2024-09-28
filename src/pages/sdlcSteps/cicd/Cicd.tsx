import React, { FC, useState, useMemo } from 'react';
import { Box, Grid, Typography, TextField } from '@mui/material';
import { Pagination } from '@mui/material';
import useHistoricalData from '../../../hooks/historicalData/useHistoricalData.ts';
import useProjectContext from '../../../hooks/context/useProjectContext.ts';
import PipelineCard from '../../../components/cicd/PipelineCard.tsx';
import CicdHistoricalChart from '../../../components/cicd/CicdHistoricalChart.tsx';
import LoadingCircle from '../../../components/LoadingCircle.tsx';
import useCicd from '../../../hooks/cicd/useCicd.ts';
import dayjs from 'dayjs';
import { DATE_BEGIN, DATE_END } from '../../../constants';

// Number of items displayed per page
const ITEMS_PER_PAGE = 4;

// Main component to display CICD pipelines emissions and related historical data (Layer 3)
const CicdPage: FC = () => {
  // Access the active project context to get details of the currently selected project
  const { activeProject } = useProjectContext();

  // State for search term used to filter pipelines
  const [searchTerm, setSearchTerm] = useState('');
  // State for managing pagination
  const [page, setPage] = useState(1);

  // Extract tags from the active project and memoize them for filtering purposes
  const projectTags = useMemo(() => activeProject?.tags.map(tag => tag.name) || [], [activeProject?.tags]);

  // Fetch CICD pipeline data based on the project's tags
  const { data: pipelinesData, loading: pipelinesLoading, error: pipelinesError } = useCicd({ tags: projectTags });

  // Historical data query parameters, memoized for efficiency
  const historicalDataParams = useMemo(() => ({
    type: 'cicd' as const, // Specify the type as 'cicd'
    startDate: dayjs(DATE_BEGIN).startOf('day').toISOString(), // Start of day ISO format
    endDate: dayjs(DATE_END).endOf('day').toISOString(),       // End of day ISO format
    tags: projectTags // Use project tags to filter historical data
  }), [projectTags]);

  // Fetch historical data related to CICD using the parameters
  const {
    data: historicalData,
    loading: historicalLoading,
    error: historicalError
  } = useHistoricalData(historicalDataParams);

  // Filter pipelines based on search term (pipeline name or repo name)
  const filteredPipelines = useMemo(() => {
    return pipelinesData.filter(pipeline =>
      pipeline.pipelineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pipeline.repoName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pipelinesData, searchTerm]);

  // Paginate the filtered pipelines based on the current page and items per page
  const paginatedPipelines = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredPipelines.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPipelines, page]);

  // Display a loading spinner if either pipelines or historical data are being fetched
  if (pipelinesLoading || historicalLoading) return <LoadingCircle />;

  // Display error message if there's an error loading either pipelines or historical data
  if (pipelinesError || historicalError) return <Typography color="error">Error loading data</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      {/* Page title */}
      <Typography variant="h4" gutterBottom>CICD Pipelines</Typography>

      <Grid container spacing={3}>
        {/* Left Column: Search and list of pipelines */}
        <Grid item xs={12} md={6}>
          {/* TextField for searching/filtering pipelines */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search pipelines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Render paginated list of pipeline cards */}
          {paginatedPipelines.map((pipeline) => (
            <PipelineCard key={pipeline.id} pipeline={pipeline} />
          ))}

          {/* Pagination control to navigate through pages of pipelines */}
          <Pagination
            count={Math.ceil(filteredPipelines.length / ITEMS_PER_PAGE)} // Total pages
            page={page} // Current page
            onChange={(_, value) => setPage(value)} // Update page state on change
            sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
          />
        </Grid>

        {/* Right Column: Historical data chart */}
        <Grid item xs={12} md={6}>
          {/* Render historical chart with CICD data */}
          <CicdHistoricalChart data={historicalData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CicdPage;
