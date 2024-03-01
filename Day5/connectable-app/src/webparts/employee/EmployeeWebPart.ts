import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDynamicFieldSet,
  PropertyPaneDynamicField,
  DynamicDataSharedDepth
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, IWebPartPropertiesMetadata } from '@microsoft/sp-webpart-base';


import * as strings from 'EmployeeWebPartStrings';
import Employee from './components/Employee';
import { IEmployeeProps } from './components/IEmployeeProps';
import { DynamicProperty } from '@microsoft/sp-component-base';

export interface IEmployeeWebPartProps {
  description: string;
  DeptTitleId: DynamicProperty<string>;
}

export default class EmployeeWebPart extends BaseClientSideWebPart<IEmployeeWebPartProps> {


  public render(): void {
    const element: React.ReactElement<IEmployeeProps> = React.createElement(
      Employee,
      {
        description: this.properties.description,
        context: this.context,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        DeptTitleId: this.properties.DeptTitleId
      }
    );

    ReactDom.render(element, this.domElement);
  }

 
  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'DeptTitleId': { dynamicPropertyType: 'string' }
    };
  }


   

 
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
                }),
                PropertyPaneDynamicFieldSet({
                  label: 'Select Department ID',
                  fields: [
                    PropertyPaneDynamicField('DeptTitleId', {
                      label: 'Department ID'
                    })
                  ],
                  sharedConfiguration: {
                    depth: DynamicDataSharedDepth.Property,
                    source: {
                      sourcesLabel: 'Connect to  webpart (DEPT):'
                    }
                   
                  }
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
