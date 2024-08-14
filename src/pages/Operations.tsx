import React from 'react';
import { useParams } from 'react-router-dom';
import {Typography, Paper, Box} from '@mui/material';

const OperationsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Operations</Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Details</Typography>
        <Typography>Detailed information about operations for Project {id}</Typography>
        {/* Fügen Sie hier mehr inhaltsspezifische Komponenten für die Operations-Seite hinzu */}
      </Paper>
    </Box>
  );
};

export default OperationsPage;