import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

interface UserFlow {
  id: number;
  name: string;
  co2Consumption: number;
}

interface UserFlowsProps {
  flows: UserFlow[];
}

const UserFlows: React.FC<UserFlowsProps> = ({ flows }) => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>User Flows SCI</Typography>
      <List>
        {flows.map((flow) => (
          <ListItem key={flow.id}>
            <ListItemText
              primary={flow.name}
              secondary={`${flow.co2Consumption} gCO2`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default UserFlows;