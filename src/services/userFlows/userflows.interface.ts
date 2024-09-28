/**
 * Interface representing a user flow.
 *
 * @interface UserFlow
 * @property {number} id - The unique identifier for the user flow.
 * @property {number} projectId - The unique identifier for the project associated with the user flow.
 * @property {string} name - The name of the user flow.
 * @property {number} co2Consumption - The CO2 consumption of the user flow.
 */
export interface UserFlow {
  id: number;
  projectId: number;
  name: string;
  co2Consumption: number;
}