import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'DepartmentWebPartStrings';
import Department from './components/Department';
import { IDepartmentProps } from './components/IDepartmentProps';

import {
  IDynamicDataPropertyDefinition,
  IDynamicDataCallables
} from '@microsoft/sp-dynamic-data';

import { IDepartment } from './components/IDepartment';
export interface IDepartmentWebPartProps {
  description: string;
}

export default class DepartmentWebPart extends BaseClientSideWebPart<IDepartmentWebPartProps>
 implements IDynamicDataCallables{



  private _selectedDepartment: IDepartment;

  public render(): void {
    const element: React.ReactElement<IDepartmentProps> = React.createElement(
      Department,
      {
        
        description: this.properties.description,
        context: this.context,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        onDepartmentSelected: this.handleDepartmentSelectionChange
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
   
    this.context.dynamicDataSourceManager.initializeSource(this);
    return Promise.resolve();
  }

  private handleDepartmentSelectionChange = (department: IDepartment): void => {
  
    this._selectedDepartment = department;      
    this.context.dynamicDataSourceManager.notifyPropertyChanged('DEPTNO');
    console.log("End Of Handle Event : " + department.DEPTNO + department.Title);
  } 

  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
     
      {
        id: 'DEPTNO',
        title: 'Selected Department ID'
      },
     
    ];
  }

  public getPropertyValue(propertyId: string): string | IDepartment {
    switch (propertyId) {
      
      case 'DEPTNO':
        return this._selectedDepartment.DEPTNO.toString();
    }

    throw new Error('Invalid property ID');
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
