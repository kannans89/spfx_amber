import { WebPartContext } from "@microsoft/sp-webpart-base";

import { DynamicProperty } from '@microsoft/sp-component-base';


export interface IEmployeeProps {
  description: string;
  context: WebPartContext;
  siteUrl: string;
  DeptTitleId: DynamicProperty<string>;
}
