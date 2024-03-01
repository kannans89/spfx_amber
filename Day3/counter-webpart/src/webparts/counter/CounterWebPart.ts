import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'CounterWebPartStrings';
import Counter from './components/Counter';
import { ICounterProps } from './components/ICounterProps';

export interface ICounterWebPartProps {
  description: string;
  heading:string;
  initialCounter:number
}

export default class CounterWebPart extends BaseClientSideWebPart<ICounterWebPartProps> {


 
  public render(): void {


    console.log(this.properties);
    
    const element: React.ReactElement<ICounterProps> = React.createElement(
      Counter,
      {
        description: this.properties.description,
        heading:this.properties.heading,
        initialCounter:this.properties.initialCounter
      
      }
    );

    ReactDom.render(element, this.domElement);
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
                PropertyPaneTextField('heading', {
                  label: strings.CounterHeadingLabel
                }),
                PropertyPaneSlider('initialCounter', {
                  label: strings.CounterIntialValueLabel,
                  min: 0,
                  max: 100,
                  step: 1 // Adjust step size as needed
                })

              ]
            }
          ]
        }
      ]
    };
  }
}
