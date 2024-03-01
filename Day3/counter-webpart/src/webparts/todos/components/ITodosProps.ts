import {SPHttpClient} from '@microsoft/sp-http'

export interface ITodosProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  mysphttp:SPHttpClient;
  url:string
}
