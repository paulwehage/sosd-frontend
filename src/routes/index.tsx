import { createBrowserRouter, Navigate } from 'react-router-dom';
import Projects from '../pages/Projects';
import ProjectPage from '../pages/Project';
import OperationsPage from '../pages/sdlcSteps/operations/Operations.tsx';
import IntegrationDeploymentPage from '../pages/sdlcSteps/cicd/Cicd.tsx';
import Layout from '../components/layout/Layout.tsx';
import InfrastructureElementPage from '../pages/sdlcSteps/operations/InfrastructureElement.tsx';
import PipelinePage from '../pages/sdlcSteps/cicd/Pipeline.tsx';
import {
  DesignPage,
  ImplementationPage,
  PlanningPage,
  TestingPage
} from '../pages/sdlcSteps/other/DevelopmentPhases.tsx';

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
            path: ':id/design',
            element: <DesignPage />
          },
          {
            path: ':id/planning',
            element: <PlanningPage />
          },
          {
            path: ':id/testing',
            element: <TestingPage />
          },
          {
            path: ':id/implementation',
            element: <ImplementationPage />
          },
          {
            path: ':id/integration-deployment',
            element: <IntegrationDeploymentPage />
          },
          {
            path: ':id/operations/:elementId',
            element: <InfrastructureElementPage />
          },
          {
            path: ':id/integration-deployment/:pipelineId',
            element: <PipelinePage />
          },
        ]
      }
    ]
  }
]);