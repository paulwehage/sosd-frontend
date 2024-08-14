export interface SDLCOverview {
  projectId: number;
  totalCo2: number;
  steps: Array<{
    id: number;
    name: string;
    totalCo2: number;
  }>;
  message: string;
}