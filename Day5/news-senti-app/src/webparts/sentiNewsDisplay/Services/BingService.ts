import { 
    HttpClient,  HttpClientResponse
  
  } from "@microsoft/sp-http";
import INews from "../components/INews";
import { IData } from "../../data/IData";

export class BingService {

    private _ApihttpClient: HttpClient;
    private _cognitiveServicesTextUrl: string = "https://ksanalysis.cognitiveservices.azure.com/text/analytics/v3.0/";
    private _bingSearchUrl?: string = "https://api.bing.microsoft.com/v7.0/news";

    private _textSentimentApiKey? :string;
    private _bingApiKey?:string;

    constructor(ApihttpClient:HttpClient,textSentimentApiKey?:string,bingApiKey?:string){
      this._ApihttpClient = ApihttpClient;
      this._textSentimentApiKey = textSentimentApiKey;
      this._bingApiKey=bingApiKey;
    }

    public async getNewsFromBingAndDetermineSentiments(data:IData):Promise<INews[]>{

         let news = await this._getNewsFromBing(data);
         console.log(news.length)
          try{
        return  await this._getSentiments(news)
          }catch(err){
            console.log(err)
          }
        //  return news;
        return Promise.resolve(news);
    }

    private async _getNewsFromBing(data : IData): Promise<INews[]> {    

        console.log(`${this._bingSearchUrl}?category=${data}`.toUpperCase())

        const response: HttpClientResponse = await this._ApihttpClient.get(
          `${this._bingSearchUrl}?category=${data}`,
          HttpClient.configurations.v1,
          {       
            headers: this._prepareHeadersForBingApi()
          }
        );
       
        const responseJson: any = await response.json();
        debugger;
        let length=10;
        if(responseJson.value.length<=10)
         length=responseJson.value.length;
        let comments: INews[]= new Array<INews>(length);
       
        
        for(var index=0;index<length;index++)
        {
          var news=responseJson.value;

          comments[index] =  {id:index,name:news[index].name,url:news[index].url ,
            description:news[index].description ,language:"en",Sentiment:"",confidence:1};

        }
        // const comments: INews[] = responseJson.value.map((c: any) => {
        //   const comment: INews = {
        //     id: i++,
        //     name: c.name,
        //     url: c.url,
        //     thumbnail:  undefined,
        //     description: c.description,
        //     language: "en-us",
        //     Sentiment: "undefined",
        //     confidence: 1
        //   };
        
        //   return comment;
        // });
        
    
        return comments;
      }
    
        
      private _prepareHeadersForBingApi(): Headers {
        const requestHeaders: Headers = new Headers();
        requestHeaders.append("Accept", "application/json");
        requestHeaders.append("Content-Type", "application/json");
        requestHeaders.append("Ocp-Apim-Subscription-Key", this._bingApiKey||"");
    
        return requestHeaders;
      }

     
      private async _getSentiments(currentnews: INews[]): Promise<INews[]> {   
        const body: any = {
          documents: currentnews.map(n => { return {id: n.id, text: n.description};})
        };   
        body.language = currentnews[0].language;   //assuming that all news are from the same language
    
        const cognitiveResponse: HttpClientResponse = await this._ApihttpClient.post(
          `${this._cognitiveServicesTextUrl}sentiment`,
          HttpClient.configurations.v1,
          {       
            body: JSON.stringify(body),
            headers: this._prepareHeadersForSentimentApi()
          }
        );
        const cognitiveResponseJSON: any = await cognitiveResponse.json();
        debugger
    
        if (cognitiveResponseJSON.documents.length == currentnews.length) {
    
          for (let i: number = 0; i < currentnews.length; i++)
          {
            const doc = cognitiveResponseJSON.documents[i];
            const sentiment = doc.sentiment;
            console.log("sentiment for id "+ currentnews[i].id+" : "+ sentiment);
            
            currentnews[i].Sentiment = sentiment;
    
            switch(sentiment)
            {
              case "positive" : { currentnews[i].confidence = doc.confidenceScores.positive; break;}
              case "neutral" : { currentnews[i].confidence = doc.confidenceScores.neutral; break;}
              case "negative" : { currentnews[i].confidence = doc.confidenceScores.negative; break;}
            }        
          }      
        }
        else
        {
          currentnews.forEach( c=> { c.Sentiment = "undefined";c.confidence = 1;});            
        }
        return currentnews;
      }

      private _prepareHeadersForSentimentApi(): Headers {
        const requestHeaders: Headers = new Headers();
        requestHeaders.append("Accept", "application/json");
        requestHeaders.append("Content-Type", "application/json");
        requestHeaders.append("Cache-Control", "no-cache");
        requestHeaders.append("Ocp-Apim-Subscription-Key", this._textSentimentApiKey||"");
    
        return requestHeaders;
      }
      
    
}