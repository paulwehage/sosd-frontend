/**
 * Interface representing a project.
 *
 * @interface Project
 * @property {number} id - The unique identifier for the project.
 * @property {string} name - The name of the project.
 * @property {string} description - The description of the project.
 * @property {Tag[]} tags - An array of tags associated with the project.
 * @property {string} createdAt - The creation date of the project.
 * @property {string} lastUpdated - The last updated date of the project.
 */
export interface Project {
  id: number;
  name: string;
  description: string;
  tags: Tag[];
  createdAt: string;
  lastUpdated: string;
}

/**
 * Interface representing detailed information about a project.
 *
 * @interface ProjectDetail
 * @extends Project
 * @property {SdlcOverview} sdlcOverview - The SDLC overview of the project.
 */
export interface ProjectDetail extends Project {
  sdlcOverview: SdlcOverview;
}

/**
 * Interface representing a tag.
 *
 * @interface Tag
 * @property {number} id - The unique identifier for the tag.
 * @property {string} name - The name of the tag.
 */
export interface Tag {
  id: number;
  name: string;
}

/**
 * Interface representing the form data for a project.
 *
 * @interface ProjectFormData
 * @property {string} name - The name of the project.
 * @property {string} description - The description of the project.
 * @property {string[]} tags - An array of tag names associated with the project.
 */
export interface ProjectFormData {
  name: string;
  description: string;
  tags: string[];
}

/**
 * Interface representing a step in the SDLC.
 *
 * @interface SdlcStep
 * @property {string} name - The name of the SDLC step.
 * @property {number} totalCo2 - The total CO2 emissions for the SDLC step.
 * @property {number} percentage - The percentage of total CO2 emissions for the SDLC step.
 */
export interface SdlcStep {
  name: string;
  totalCo2: number;
  percentage: number;
}

/**
 * Interface representing an overview of the SDLC.
 *
 * @interface SdlcOverview
 * @property {number} totalCo2 - The total CO2 emissions for the SDLC.
 * @property {SdlcStep[]} steps - An array of steps in the SDLC.
 */
export interface SdlcOverview {
  totalCo2: number;
  steps: SdlcStep[];
}