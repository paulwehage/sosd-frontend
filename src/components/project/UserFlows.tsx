import React from 'react';
import { Paper, Typography, List, ListItem, Box } from '@mui/material';
import LoadingCircle from '../LoadingCircle.tsx';

// Interface representing a single user flow
interface UserFlow {
  id: number; // Unique ID of the user flow
  name: string; // Name of the user flow
  co2Consumption: number; // CO2 consumption in grams for this user flow
}

// Props interface for `UserFlows` component
interface UserFlowsProps {
  flows: UserFlow[]; // Array of user flows
  loading: boolean; // Loading state indicating whether data is being fetched
}

// Functional component to render a list of user flows with their CO2 consumption
const UserFlows: React.FC<UserFlowsProps> = ({ flows, loading }) => {
  // Show loading spinner while data is being fetched
  if (loading) return <LoadingCircle />;

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      {/* Title for the User Flows section */}
      <Typography variant="h6" gutterBottom>User Flows SCI</Typography>

      {/* List to display each user flow and its CO2 consumption */}
      <List sx={{ width: '100%' }}>
        {flows.map((flow) => (
          // Each user flow is displayed as a separate `Paper` element for emphasis
          <Paper key={flow.id} elevation={3} sx={{ mb: 2, width: '100%' }}>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 2, // Vertical padding
                px: 3, // Horizontal padding
              }}
            >
              {/* Display flow name */}
              <Typography variant="body1">{flow.name}</Typography>

              {/* Display flow's CO2 consumption */}
              <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography variant="h5" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                  {flow.co2Consumption} {/* Display CO2 consumption in bold */}
                </Typography>
                <Typography variant="body2" component="span">
                  gCO2 {/* Unit for CO2 consumption */}
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
