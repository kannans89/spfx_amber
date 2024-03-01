
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';



import {
  PlaceholderContent,
 PlaceholderName
} from '@microsoft/sp-application-base';



/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHeaderFooterApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  Top: string,
  Bottom: string
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HeaderFooterApplicationCustomizer
  extends BaseApplicationCustomizer<IHeaderFooterApplicationCustomizerProperties> {

    private _topPlaceholder: PlaceholderContent | undefined;
    private _bottomPlaceholder: PlaceholderContent | undefined;


  public onInit(): Promise<void> {
   
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

  
    return Promise.resolve();
  }


  private _renderPlaceHolders(): void {
    console.log('Available placeholders: ',
      this.context.placeholderProvider.placeholderNames.map(
        name => PlaceholderName[name]).join(', '));
 
        if (!this._topPlaceholder) {
          this._topPlaceholder =
            this.context.placeholderProvider.tryCreateContent(
              PlaceholderName.Top,
              { onDispose: this._onDispose });
    
          // The extension should not assume that the expected placeholder is available.
          if (!this._topPlaceholder) {
            console.error('The expected placeholder (Top) was not found.');
            return;
          }
    
          if (this.properties) {
            let topString: string = this.properties.Top;
            if (!topString) {
              topString = '(Top property was not defined.)';
            }
    
            if (this._topPlaceholder.domElement) {
              this._topPlaceholder.domElement.innerHTML = `
                  <div >
                    <div class="ms-bgColor-themeDark ms-fontColor-white">
                      <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${decodeURIComponent(topString)}
                    </div>
                  </div>`;
            }
          }
        }
    
        if (!this._bottomPlaceholder) {
          this._bottomPlaceholder =
            this.context.placeholderProvider.tryCreateContent(
              PlaceholderName.Bottom,
              { onDispose: this._onDispose });
    
          // The extension should not assume that the expected placeholder is available.
          if (!this._bottomPlaceholder) {
            console.error('The expected placeholder (Bottom) was not found.');
            return;
          }
    
          if (this.properties) {
            let bottomString: string = this.properties.Bottom;
            if (!bottomString) {
              bottomString = '(Bottom property was not defined.)';
            }
    
            if (this._bottomPlaceholder.domElement) {
              this._bottomPlaceholder.domElement.innerHTML = `
                  <div">
                    <div class="ms-bgColor-themeDark ms-fontColor-white ">
                      <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${decodeURIComponent(bottomString+" Amber")}
                    </div>
                  </div>`;
            }
          }
        }            
  }

  private _onDispose() : void {
    console.log('Dispose was called');
  }

}
