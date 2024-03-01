import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'HelloWorldWebPartStrings';

export interface IHelloWorldWebPartProps {
  description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {



  public render(): void {
    this.domElement.innerHTML = `
    <h1>This is counter page!!</h1>
     <button id="btnMinus">-</button>
    <button id="btnPlus">+</button>
    <h1 id="h1Display"></h1>
`;

    let h1Display = document.getElementById('h1Display');
    let btnPlus = document.getElementById('btnPlus');
    let btnMinus = document.getElementById('btnMinus');
    let counter = 0;
    if (h1Display) {
      h1Display.innerText = counter.toString();
    }
    if (btnPlus)
      btnPlus.addEventListener("click", function () {
        counter++;
        if (h1Display)
          h1Display.innerText = counter.toString();
      });
    if (btnMinus)
      btnMinus.addEventListener("click", function () {
        if (counter > 0)
          counter--;
        if (h1Display)
          h1Display.innerText = counter.toString();
      });
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
