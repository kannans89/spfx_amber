import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import styles from './KsMailAppWebPart.module.scss';
import * as strings from 'KsMailAppWebPartStrings';

import { MSGraphClientV3 } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

export interface IKsMailAppWebPartProps {
  description: string;
}

export default class KsMailAppWebPart extends BaseClientSideWebPart<IKsMailAppWebPartProps> {


  public render(): void {
    this.context.msGraphClientFactory
      .getClient('3')
      .then((client: MSGraphClientV3): void => {
        // get information about the current user from the Microsoft Graph
        client
          .api('/me/messages')
          .top(5)
          .orderby("receivedDateTime desc")
          .get((error, messages: any, rawResponse?: any) => {

            this.domElement.innerHTML = `
    <div class="${styles.ksMailApp}">
      <div>
          <h3>Welcome to SharePoint Framework!</h3>
          <p>
              The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It's the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
          </p>
      </div>
      <div id="spListContainer" />
    </div>`;

            // List the latest emails based on what we got from the Graph
            this._renderEmailList(messages.value);
          });
      });

  }

  private _renderEmailList(messages: MicrosoftGraph.Message[]): void {
    let html: string = '';
      
    for (let index = 0; index < messages.length; index++) {
      const decodedSubject = decodeURIComponent(messages[index].subject || "");
      html += `<p class="${styles.welcome}">Email ${index + 1} - ${decodedSubject}</p>`;
    }
  
    // Add the emails to the placeholder
    let listContainer:any = this.domElement.querySelector('#spListContainer');
    listContainer.innerHTML = html;
  }
  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      //this._environmentMessage = message;
    });
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

 
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
