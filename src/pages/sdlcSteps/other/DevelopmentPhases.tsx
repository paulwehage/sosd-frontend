import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  DesignServices,
  Code,
  BugReport,
  Schedule,
  EnergySavingsLeaf,
} from '@mui/icons-material';

const PhaseWrapper: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <Box sx={{ p: 3 }}>
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon}
        <Typography variant="h4" sx={{ ml: 2 }}>{title}</Typography>
      </Box>
      {children}
    </Paper>
  </Box>
);

export const DesignPage: React.FC = () => (
  <PhaseWrapper title="Design Phase Sustainability" icon={<DesignServices fontSize="large" color="primary" />}>
    <Typography variant="body1" paragraph>
      Measuring sustainability in the Design Phase focuses on creating efficient and long-lasting software architectures.
    </Typography>
    <List>
      <ListItem>
        <ListItemIcon><EnergySavingsLeaf /></ListItemIcon>
        <ListItemText
          primary="Architecture Efficiency Score"
          secondary="Measures how well the DesignServices promotes resource efficiency"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon><EnergySavingsLeaf /></ListItemIcon>
        <ListItemText
          primary="Predicted Energy Consumption"
          secondary="Estimates based on architectural decisions"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon><EnergySavingsLeaf /></ListItemIcon>
        <ListItemText
          primary="Scalability Index"
          secondary="Assesses DesignServices's ability to handle growth sustainably"
        />
      </ListItem>
    </List>
  </PhaseWrapper>
);

export const ImplementationPage: React.FC = () => (
  <PhaseWrapper title="Implementation Phase Sustainability" icon={<Code fontSize="large" color="primary" />}>
    <Typography variant="body1" paragraph>
      During Implementation, we measure the ecological impact of our coding practices and the efficiency of the resulting software.
    </Typography>
    <List>
      <ListItem>
        <ListItemIcon><EnergySavingsLeaf /></ListItemIcon>
        <ListItemText
          primary="Code Efficiency Metrics"
          secondary="Measures like cyclomatic complexity and code reuse percentage"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon><EnergySavingsLeaf /></ListItemIcon>
        <ListItemText
          primary="Resource Usage During Development"
          secondary="CPU, memory, and energy consumption of development tools"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon><EnergySavingsLeaf /></ListItemIcon>
        <ListItemText
          primary="Green Coding Practices Adherence"
          secondary="Percentage of code following sustainable coding guidelines"
        />
      </ListItem>
    </List>
  </PhaseWrapper>
);

export const TestingPage: React.FC = () => (
  <PhaseWrapper title="Testing Phase Sustainability" icon={<BugReport fontSize="large" color="primary" />}>
    <Typography variant="body1" paragraph>
      Sustainability in Testing focuses on efficient test processes and measuring the environmental impact of our quality assurance efforts.
    </Typography>
    <List>
      <ListItem>
        <ListItemIcon><EnergySavingsLeaf /></ListItemIcon>
        <ListItemText
          primary="Test Environment Efficiency"
          secondary="Energy consumption of test servers and CI/CD pipelines"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon><EnergySavingsLeaf /></ListItemIcon>
        <ListItemText
          primary="Sustainable Test Coverage Ratio"
          secondary="Balance between comprehensive testing and resource usage"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon><EnergySavingsLeaf /></ListItemIcon>
        <ListItemText
          primary="Performance Test Sustainability Metrics"
          secondary="Measuring application efficiency under various loads"
        />
      </ListItem>
    </List>
  </PhaseWrapper>
);

export const PlanningPage: React.FC = () => (
  <PhaseWrapper title="Planning Phase Sustainability" icon={<Schedule fontSize="large" color="primary" />}>
    <Typography variant="body1" paragraph>
      In the Planning Phase, we set sustainability goals and define metrics to measure our progress throughout the project lifecycle.
    </Typography>
    <List>
      <ListItem>
        <ListItemIcon><EnergySavingsLeaf /></ListItemIcon>
        <ListItemText
          primary="Sustainability Goal Setting"
          secondary="Defining clear, measurable sustainability objectives"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon><EnergySavingsLeaf /></ListItemIcon>
        <ListItemText
          primary="Resource Allocation Efficiency"
          secondary="Planning for optimal use of development resources"
        />
      </ListItem>
      <ListItem>
        <ListItemIcon><EnergySavingsLeaf /></ListItemIcon>
        <ListItemText
          primary="Long-term Impact Assessment"
          secondary="Predicting the project's long-term environmental effects"
        />
      </ListItem>
    </List>
  </PhaseWrapper>
);