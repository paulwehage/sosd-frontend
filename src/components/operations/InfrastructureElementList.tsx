import React, { useState } from 'react';
import { TextField, Box, Pagination } from '@mui/material';
import InfrastructureElementCard from './InfrastructureElementCard';
import { InfrastructureElement } from '../../services/operations/operations.interface';

interface InfrastructureElementListProps {
  elements: InfrastructureElement[];
}

const InfrastructureElementList: React.FC<InfrastructureElementListProps> = ({ elements }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const elementsPerPage = 4;

  const filteredElements = elements.filter(element =>
    element.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedElements = filteredElements.slice(
    (page - 1) * elementsPerPage,
    page * elementsPerPage
  );

  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search elements..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
      {paginatedElements.map(element => (
        <Box key={element.id} mb={2}>
          <InfrastructureElementCard element={element} />
        </Box>
      ))}
      <Pagination
        count={Math.ceil(filteredElements.length / elementsPerPage)}
        page={page}
        onChange={(_, value) => setPage(value)}
      />
    </Box>
  );
};

export default InfrastructureElementList;