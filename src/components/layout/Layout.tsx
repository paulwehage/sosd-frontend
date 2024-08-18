import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import Navbar from '../navbar/Navbar.tsx';
import {FC} from 'react';
import {useProjectContext} from '../../context/ProjectContext.tsx';

const Layout: FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const { activeProject, breadcrumbInfo } = useProjectContext();

  const getBreadcrumbName = (value: string, index: number) => {
    if (value === 'projects' && index === 0) return 'Projects';
    if (activeProject?.name && index === 1) return activeProject.name;
    if (value === 'operations' && index === 2) return 'Operations';
    if (value === 'integration-deployment' && index === 2) return 'Integration & Deployment';
    if (breadcrumbInfo.elementName && index === 3 && pathnames[2] === 'operations') return breadcrumbInfo.elementName;
    if (breadcrumbInfo.pipelineName && index === 3 && pathnames[2] === 'integration-deployment') return breadcrumbInfo.pipelineName;
    return value;
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 2 }}>
        <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link component={RouterLink} to="/">
            Home
          </Link>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const name = getBreadcrumbName(value, index);

            return last ? (
              <Typography color="text.primary" key={to}>
                {name}
              </Typography>
            ) : (
              <Link component={RouterLink} to={to} key={to}>
                {name}
              </Link>
            );
          })}
        </Breadcrumbs>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
