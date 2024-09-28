import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { InfrastructureElement } from '../../services/operations/operations.interface';
import { useNavigate } from 'react-router-dom';
import useProjectContext from '../../hooks/context/useProjectContext.ts';

// Interface defining the props for `InfrastructureElementCard`
interface InfrastructureElementCardProps {
  element: InfrastructureElement; // Represents the infrastructure element to display in the card
}

// Functional component that renders a card for each infrastructure element
const InfrastructureElementCard: React.FC<InfrastructureElementCardProps> = ({ element }) => {
  const navigate = useNavigate(); // Hook to navigate between routes
  const { activeProject } = useProjectContext(); // Access context to get the active project information

  // Handle card click event to navigate to the specific element's page within the active project's operations
  const handleClick = () => {
    navigate(`/projects/${activeProject!.id}/operations/${element.id}`);
  };

  return (
    <Card
      // Card styling to make it interactive and visually responsive
      sx={{
        cursor: 'pointer', // Change cursor to indicate card is clickable
        transition: '0.3s', // Add a smooth transition effect
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)', // Light background color change on hover
        },
      }}
      onClick={handleClick} // Set the click event to handle navigation
    >
      <CardContent>
        {/* Element name */}
        <Typography variant="h6">{element.name}</Typography>

        {/* Element type */}
        <Typography variant="subtitle1">{element.type}</Typography>

        {/* Key metrics displayed in a box layout with space between */}
        <Box display="flex" justifyContent="space-between" mt={2}>
          {/* Daily CO2 consumption, formatted to 2 decimal places */}
          <Typography variant="body2">
            Daily CO2: {element.keyMetrics.dailyCo2Consumption.toFixed(2)} g
          </Typography>
          {/* Display additional key metrics */}
          <Typography variant="body2">
            {element.keyMetrics.keyMetric1.name}: {element.keyMetrics.keyMetric1.value}
          </Typography>
          <Typography variant="body2">
            {element.keyMetrics.keyMetric2.name}: {element.keyMetrics.keyMetric2.value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InfrastructureElementCard;
