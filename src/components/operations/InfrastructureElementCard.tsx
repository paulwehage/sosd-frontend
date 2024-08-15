import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { InfrastructureElement } from '../../services/operations/operations.interface';

interface InfrastructureElementCardProps {
  element: InfrastructureElement;
}

const InfrastructureElementCard: React.FC<InfrastructureElementCardProps> = ({ element }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{element.name}</Typography>
        <Typography variant="subtitle1">{element.type}</Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="body2">Daily CO2: {element.keyMetrics.dailyCo2Consumption.toFixed(2)} g</Typography>
          <Typography variant="body2">{element.keyMetrics.keyMetric1.name}: {element.keyMetrics.keyMetric1.value}</Typography>
          <Typography variant="body2">{element.keyMetrics.keyMetric2.name}: {element.keyMetrics.keyMetric2.value}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InfrastructureElementCard;