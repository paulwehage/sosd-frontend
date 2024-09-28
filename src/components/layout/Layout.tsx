import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import Navbar from '../navbar/Navbar.tsx';
import { FC } from 'react';
import { useProjectContext } from '../../context/ProjectContext.tsx';

// Functional component for layout with breadcrumbs navigation
const Layout: FC = () => {
  const location = useLocation(); // Get current location from React Router
  const pathnames = location.pathname.split('/').filter((x) => x); // Split path into segments for breadcrumbs
  const { activeProject, breadcrumbInfo } = useProjectContext(); // Get project context data for dynamic breadcrumb naming

  // Function to get the display name for each breadcrumb item based on path and context
  const getBreadcrumbName = (value: string, index: number) => {
    // Map each segment of the path to a meaningful name
    if (value === 'projects' && index === 0) return 'Projects';
    if (activeProject?.name && index === 1) return activeProject.name; // Use active project name if available
    if (value === 'operations' && index === 2) return 'Operations';
    if (value === 'integration-deployment' && index === 2) return 'Integration & Deployment';
    // Use context data for specific breadcrumb names in operations or integration-deployment paths
    if (breadcrumbInfo.elementName && index === 3 && pathnames[2] === 'operations') return breadcrumbInfo.elementName;
    if (breadcrumbInfo.pipelineName && index === 3 && pathnames[2] === 'integration-deployment') return breadcrumbInfo.pipelineName;
    return value; // Default to the path segment if no special name is provided
  };

  return (
    <>
      {/* Navbar at the top of the layout */}
      <Navbar />
      {/* Box containing breadcrumbs and the outlet for nested routes */}
      <Box sx={{ p: 2 }}>
        {/* Breadcrumbs navigation based on current path */}
        <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ mb: 2 }}>
          {/* Home link, always present */}
          <Link component={RouterLink} to="/">
            Home
          </Link>
          {/* Generate breadcrumb links dynamically from path segments */}
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1; // Check if this is the last breadcrumb
            const to = `/${pathnames.slice(0, index + 1).join('/')}`; // Build the path for each breadcrumb
            const name = getBreadcrumbName(value, index); // Get display name for the breadcrumb

            return last ? (
              // Display the current page name as plain text (not a link)
              <Typography color="text.primary" key={to}>
                {name}
              </Typography>
            ) : (
              // Display link for all breadcrumbs except the last one
              <Link component={RouterLink} to={to} key={to}>
                {name}
              </Link>
            );
          })}
        </Breadcrumbs>
        {/* Render nested routes within the layout */}
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
