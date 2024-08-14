export interface Project {
  id: number;
  name: string;
  description: string;
  tags: Tag[];
  createdAt: string;
  lastUpdated: string;
}

export interface ProjectDetail extends Project {
  sdlcOverview: SdlcOverview;
}

export interface Tag {
    id: number;
    name: string;
}

export interface ProjectFormData {
  name: string;
  description: string;
  tags: string[];
}

export interface SdlcStep {
  name: string;
  totalCo2: number;
  percentage: number;
}

export interface SdlcOverview {
  totalCo2: number;
  steps: SdlcStep[];
}