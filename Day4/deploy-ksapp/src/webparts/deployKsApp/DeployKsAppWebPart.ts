import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import styles from './DeployKsAppWebPart.module.scss'

export interface IDeployKsAppWebPartProps {
}

export default class DeployKsAppWebPart extends BaseClientSideWebPart<IDeployKsAppWebPartProps> {
  public render(): void {
    this.domElement.innerHTML = `
    <div class="${styles.myWebPartContainer}">
       <h1>This is my minimal wepart KS APP </h1>

       <h2 class="${styles.myCard}"> This is a card style applied via scss</h2>

       <div class = ${styles.box}>
        <h1>My Second Heading</h1>
        <p>It is initially designed by Hampton Catlin and developed by Natalie Weizenbaum in 2006.</p>
       </div>
    
    </div>`;
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
