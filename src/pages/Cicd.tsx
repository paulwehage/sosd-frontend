import React, {FC, useState, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {Box, Grid, Typography, TextField, Paper} from '@mui/material';
import {Pagination} from '@mui/material';
import useHistoricalData from '../hooks/historicalData/useHistoricalData';
import useProjectContext from '../hooks/context/useProjectContext';
import PipelineCard from '../components/cicd/PipelineCard';
import CicdHistoricalChart from '../components/cicd/CicdHistoricalChart';
import LoadingCircle from '../components/LoadingCircle';
import useCicd from '../hooks/cicd/useCicd.ts';

const ITEMS_PER_PAGE = 4;

const CicdPage: FC = () => {
  const {id} = useParams<{ id: string }>();
  const projectId = Number(id);
  const {activeProject} = useProjectContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const projectTags = useMemo(() => activeProject?.tags.map(tag => tag.name) || [], [activeProject?.tags]);

  const {data: pipelinesData, loading: pipelinesLoading, error: pipelinesError} = useCicd({tags: projectTags});

  const historicalDataParams = useMemo(() => ({
    type: 'cicd' as const,
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date().toISOString(),
    tags: projectTags
  }), [projectTags]);

  const {
    data: historicalData,
    loading: historicalLoading,
    error: historicalError
  } = useHistoricalData(historicalDataParams);

  const filteredPipelines = useMemo(() => {
    return pipelinesData.filter(pipeline =>
      pipeline.pipelineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pipeline.repoName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pipelinesData, searchTerm]);

  const paginatedPipelines = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredPipelines.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPipelines, page]);

  if (pipelinesLoading || historicalLoading) return <LoadingCircle/>;
  if (pipelinesError || historicalError) return <Typography color="error">Error loading data</Typography>;

  return (
    <Box sx={{p: 3}}>
      <Typography variant="h4" gutterBottom>CICD Pipelines</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search pipelines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{mb: 2}}
          />
          {paginatedPipelines.map((pipeline) => (
            <PipelineCard key={pipeline.id} pipeline={pipeline}/>
          ))}
          <Pagination
            count={Math.ceil(filteredPipelines.length / ITEMS_PER_PAGE)}
            page={page}
            onChange={(_, value) => setPage(value)}
            sx={{mt: 2, display: 'flex', justifyContent: 'center'}}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CicdHistoricalChart data={historicalData}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CicdPage;