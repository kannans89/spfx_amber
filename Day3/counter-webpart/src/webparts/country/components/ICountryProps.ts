import { HttpClient } from "@microsoft/sp-http"; 

export interface ICountryProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  myhttpClient:HttpClient
}
