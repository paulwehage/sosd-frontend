import { createBrowserRouter, Navigate } from 'react-router-dom';
import Projects from '../pages/Projects';
import ProjectPage from '../pages/Project';
import OperationsPage from '../pages/Operations.tsx';
import IntegrationDeploymentPage from '../pages/Integration.tsx';
import Layout from '../components/Layout.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/projects" replace={true} />
      },
      {
        path: 'projects',
        children: [
          {
            index: true,
            element: <Projects />
          },
          {
            path: ':id',
            element: <ProjectPage />
          },
          {
            path: ':id/operations',
            element: <OperationsPage />
          },
          {
            path: ':id/integration-deployment',
            element: <IntegrationDeploymentPage />
          },
          // Fügen Sie hier weitere SDLC-Schritt-Routen hinzu
        ]
      }
    ]
  }
]);