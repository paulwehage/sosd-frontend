import { createBrowserRouter, Navigate } from 'react-router-dom';
import Projects from '../pages/Projects';
import ProjectPage from '../pages/Project';
import OperationsPage from '../pages/Operations.tsx';
import IntegrationDeploymentPage from '../pages/Integration.tsx';
import Layout from '../components/Layout.tsx';
import InfrastructureElementPage from '../pages/InfrastructureElement.tsx';

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
          {
            path: ':id/operations/:elementId',
            element: <InfrastructureElementPage />
          }
        ]
      }
    ]
  }
]);