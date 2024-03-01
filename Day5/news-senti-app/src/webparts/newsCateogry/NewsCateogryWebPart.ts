import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'NewsCateogryWebPartStrings';
import NewsCateogry from './components/NewsCateogry';
import { INewsCateogryProps } from './components/INewsCateogryProps';
import { IData } from '../data/IData';

import {
  IDynamicDataPropertyDefinition,
  IDynamicDataCallables
} from '@microsoft/sp-dynamic-data';

export default class NewsCateogryWebPart extends BaseClientSideWebPart<INewsCateogryProps> implements IDynamicDataCallables {


  private _currentData : IData;
  private onDataChanged=(data:IData):void=>{

     this._currentData=data;
     this.context.dynamicDataSourceManager.notifyPropertyChanged("keywords");
  }

 

  protected onInit(): Promise<void> {
    
    this.context.dynamicDataSourceManager.initializeSource(this);
    return Promise.resolve();
  }

  //interface methods start
  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [      
      { id: 'keywords', title: 'Keywords' }      
    ];
  }

  /**
   * Return the current value of the specified dynamic data set
   * @param propertyId ID of the dynamic data set to retrieve the value for
   */
  public getPropertyValue(propertyId: string) : IData {    
    if (propertyId == "keywords") {     
      let data = this._currentData  //id of the property
      return data;
    }

    throw new Error('Bad property id');

  }

  /**
   * Returns the friendly annoted values for the property. This info will be used by default SPFx dynamic data property pane fields.
   * @param propertyId the property id
   */
  // public getAnnotatedPropertyValue?(propertyId: string): IDynamicDataAnnotatedPropertyValue {
  //   switch (propertyId) {
  //     case 'keywords':
  //       return {
  //         sampleValue: {
  //             'keywords': "Sports"
  //         },
  //         metadata: {
  //             'keywords': { title: "Category to filter News"}              
  //         }
  //     };      
  //   }
  // }
  //interface methods end

  public render(): void {
    const element: React.ReactElement<INewsCateogryProps> = React.createElement(
      NewsCateogry,
      {
        description: this.properties.description,
        onDataChanged:this.onDataChanged
      }
    );

    ReactDom.render(element, this.domElement);
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
