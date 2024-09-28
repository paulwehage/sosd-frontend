import React, { useState } from 'react';
import { TextField, Box, Pagination } from '@mui/material';
import InfrastructureElementCard from './InfrastructureElementCard';
import { InfrastructureElement } from '../../services/operations/operations.interface';

// Interface defining the props for `InfrastructureElementList`
interface InfrastructureElementListProps {
  elements: InfrastructureElement[]; // Array of infrastructure elements to be displayed
}

// Functional component for rendering a list of infrastructure elements with search and pagination
const InfrastructureElementList: React.FC<InfrastructureElementListProps> = ({ elements }) => {
  // State for handling search input and current pagination page
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const elementsPerPage = 4; // Number of elements to display per page

  // Filter elements based on search term
  const filteredElements = elements.filter(element =>
    element.name.toLowerCase().includes(searchTerm.toLowerCase()) // Case-insensitive match
  );

  // Paginate the filtered elements based on the current page
  const paginatedElements = filteredElements.slice(
    (page - 1) * elementsPerPage,
    page * elementsPerPage
  );

  return (
    <Box>
      {/* Search field for filtering elements */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search elements..." // Placeholder text for the search box
        value={searchTerm} // Value tied to search state
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        sx={{ mb: 2 }} // Add bottom margin for spacing
      />

      {/* Display a card for each paginated element */}
      {paginatedElements.map(element => (
        <Box key={element.id} mb={2}> {/* Unique key for each element to ensure proper rendering */}
          <InfrastructureElementCard element={element} /> {/* Render card for the element */}
        </Box>
      ))}

      {/* Pagination control for navigating through pages of elements */}
      <Pagination
        count={Math.ceil(filteredElements.length / elementsPerPage)} // Calculate total pages
        page={page} // Current page state
        onChange={(_, value) => setPage(value)} // Update page state when the page is changed
      />
    </Box>
  );
};

export default InfrastructureElementList;
