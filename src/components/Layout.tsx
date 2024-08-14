import React from 'react';
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import Navbar from './navbar/Navbar.tsx';

const Layout: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

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

          return last ? (
            <Typography color="text.primary" key={to}>
              {value}
            </Typography>
          ) : (
            <Link component={RouterLink} to={to} key={to}>
              {value}
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