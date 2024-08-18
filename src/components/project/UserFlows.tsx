import React from 'react';
import { Paper, Typography, List, ListItem, Box } from '@mui/material';
import LoadingCircle from '../LoadingCircle.tsx';

interface UserFlow {
  id: number;
  name: string;
  co2Consumption: number;
}

interface UserFlowsProps {
  flows: UserFlow[];
  loading: boolean;
}

const UserFlows: React.FC<UserFlowsProps> = ({ flows, loading }) => {
  if (loading) return <LoadingCircle />;

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>User Flows SCI</Typography>
      <List sx={{ width: '100%' }}>
        {flows.map((flow) => (
          <Paper key={flow.id} elevation={3} sx={{ mb: 2, width: '100%' }}>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 2,
                px: 3,
              }}
            >
              <Typography variant="body1">{flow.name}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography variant="h5" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  {flow.co2Consumption}
                </Typography>
                <Typography variant="body2" component="span">
                  gCO2
                </Typography>
              </Box>
            </ListItem>
          </Paper>
        ))}
      </List>
    </Paper>
  );
};

export default UserFlows;