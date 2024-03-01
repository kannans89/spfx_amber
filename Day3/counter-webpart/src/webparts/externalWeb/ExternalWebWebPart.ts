import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'ExternalWebWebPartStrings';

import * as angular from 'angular'

export interface IExternalWebWebPartProps {
  description: string;
}

export default class ExternalWebWebPart extends BaseClientSideWebPart<IExternalWebWebPartProps> {



  public render(): void {
     angular.module('MyApp',[])

     this.domElement.innerHTML=`
     
       <div ng-app="MyApp">
             <h1>ExternalWEbpart</h1>
            <h1>Angular works {{22/7}}</h1>

      </div>

     `;

   angular.bootstrap(this.domElement,['MyApp'])
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
