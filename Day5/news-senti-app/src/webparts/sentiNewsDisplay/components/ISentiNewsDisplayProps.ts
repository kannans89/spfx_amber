import { DynamicProperty } from "@microsoft/sp-component-base";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IData } from "../../data/IData";

export interface ISentiNewsDisplayProps {
  description: string;

  keywords:DynamicProperty<IData>;//receive data from provider webpart/publisher webpart
  context:WebPartContext;
  bingKey?:string;

  textSentimentApiKey?:string;
  chosenSentiment?:string

}
