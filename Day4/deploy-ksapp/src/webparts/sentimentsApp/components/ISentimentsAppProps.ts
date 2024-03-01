import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISentimentsAppProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context:WebPartContext;
  apiKey:string;
  selectedSentiment:string
}
