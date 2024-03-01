import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IDepartment } from "./IDepartment";

export type DepartmentSelectedCallback = (department: IDepartment) => void;

export interface IDepartmentProps {
  description: string;
  context: WebPartContext;
  siteUrl: string;
  onDepartmentSelected?: DepartmentSelectedCallback;
}
