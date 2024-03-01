import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneDynamicField,
  PropertyPaneDynamicFieldSet
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'SentiNewsDisplayWebPartStrings';
import SentiNewsDisplay from './components/SentiNewsDisplay';
import { ISentiNewsDisplayProps } from './components/ISentiNewsDisplayProps';

import {   
  IWebPartPropertiesMetadata
} from '@microsoft/sp-webpart-base';



export interface ISentiNewsDisplayWebPartProps {
  description: string;
}

export default class SentiNewsDisplayWebPart extends BaseClientSideWebPart<ISentiNewsDisplayProps> {

  

  public render(): void {
    const element: React.ReactElement<ISentiNewsDisplayProps> = React.createElement(
      SentiNewsDisplay,
      {
        description: this.properties.description,
        keywords:this.properties.keywords,//receive data from provider webpart/publisher webpart
        context:this.context,
        bingKey:this.properties.bingKey,
        textSentimentApiKey:this.properties.textSentimentApiKey,
        chosenSentiment:this.properties.chosenSentiment
        
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

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'keywords': { dynamicPropertyType:"object"}
    };
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
                PropertyPaneDynamicFieldSet({
                  label: 'Select event source',
                  fields: [
                    PropertyPaneDynamicField('keywords', {
                      label: 'Get keywords from'
                    })
                  ]
                }),
                PropertyPaneTextField('textSentimentApiKey', {
                  label: "Sentiment Api Key"
                }),
                PropertyPaneTextField('bingKey', {
                  label: "Bing Api Key"
                }),
                PropertyPaneDropdown('chosenSentiment', {
                  label: "Chosen sentiment",
                  options: [
                    { key: 'positive', text: 'Positive'},
                    { key: 'neutral', text: 'Neutral' },
                    { key: 'negative', text: 'Negative' }                    
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }




  // protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  //   return {
  //     pages: [
  //       {
  //         header: {
  //           description: strings.PropertyPaneDescription
  //         },
  //         groups: [
  //           {
  //             groupName: strings.BasicGroupName,
  //             groupFields: [
                
  //               PropertyPaneDynamicFieldSet({
  //                 label: 'Select dynamic field',
  //                 fields: [
  //                   PropertyPaneDynamicField('keywords', {
  //                     label: 'keywords'
  //                   })
  //                 ],
  //                 sharedConfiguration: {
  //                   depth: DynamicDataSharedDepth.Property,
  //                   source: {
  //                     sourcesLabel: 'Select the web part containing news category'
  //                   }
                   
  //                 }
  //               }),

  //               PropertyPaneTextField('textSentimentApiKey', {
  //                 label: "sentiment api key"
  //               }),
  //               PropertyPaneTextField('bingKey', {
  //                 label: "Bing key"
  //               }),
  //               PropertyPaneDropdown('chosenSentiment', {
  //                 label: "Choosen sentiment",
  //                 options:[{
  //                   key:'positive',text:'Positive',
  //                 },{
  //                   key:'negative',text:'Negative',
  //                 },{
  //                   key:'neutral',text:'Neutral',
  //                 }]
  //               })
  //             ]
              
  //           }
  //         ]
  //       }
  //     ]
  //   };
  // }
}
