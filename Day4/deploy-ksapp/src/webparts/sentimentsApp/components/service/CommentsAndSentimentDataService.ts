import {
  SPHttpClient,
  HttpClient,
  SPHttpClientResponse,
  IHttpClientOptions,
  HttpClientResponse
} from "@microsoft/sp-http";

import IPageComment from "../IPageComment";
interface IPageCommentResponse {

  id: number,
  author: {
    name: string
  }
  ,
  text: string
}

export class CommentsAndSentimentDataService {
  private _baseUrl: string;
  private _listId: string | undefined;
  private _listItemId: string | undefined;
  private _spHttpClient: SPHttpClient;

  private _ApihttpClient: HttpClient;

  private _cognitiveServicesTextUrl: string = "https://ksanalysis.cognitiveservices.azure.com/text/analytics/v3.0/sentiment";
  private _textSentimentApiKey?: string;

  constructor(baseUrl: string, listId: string | undefined, listItemId: string | undefined, spHttpClient: SPHttpClient, ApihttpClient: HttpClient, textSentimentApiKey: string) {
    this._baseUrl = baseUrl;
    this._listId = listId;
    this._listItemId = listItemId;
    this._spHttpClient = spHttpClient;
    this._ApihttpClient = ApihttpClient;
    this._textSentimentApiKey = textSentimentApiKey;
  }
  private async _getTop5PageComments(): Promise<IPageComment[]> {
    const pageCommentsEndpoint: string = `${this._baseUrl}/_api/web/lists('${this._listId}')/GetItemById(${this._listItemId})/Comments?$top=5&$inlineCount=AllPages`;

    const response: SPHttpClientResponse = await this._spHttpClient.get(pageCommentsEndpoint, SPHttpClient.configurations.v1);
    const responseJson: any = await response.json();
    const comments: IPageComment[] = responseJson.value.map((c: IPageCommentResponse) => {
      const comment: IPageComment = {
        id: c.id,
        author: c.author.name,
        comment: c.text,
        language: "unknown",
        Sentiment: "undefined",
        confidence: 1
      };
      return comment;
    });

    return comments;
  }

  public async getCommentsAndCalculateSentiments(): Promise<IPageComment[]> {

    let comments = await this._getTop5PageComments();

    return await this.calculateSentiments(comments);
  }

  public async calculateSentiments(comments: IPageComment[]): Promise<IPageComment[]> {
    for (let index = 0; index < comments.length; index++) {
      await this._getSentimentFromComment(comments[index]);
    }
    return comments;
  }

  private async _getSentimentFromComment(comment: IPageComment): Promise<IPageComment> {
    const detectedLanguage: string = "en";
    const httpOptions: IHttpClientOptions = this._prepareHttpOptionsForApi(comment, detectedLanguage);

    const cognitiveResponse: HttpClientResponse = await this._ApihttpClient.post(
      `${this._cognitiveServicesTextUrl}`,
      HttpClient.configurations.v1,
      httpOptions
    );
    const cognitiveResponseJSON: any = await cognitiveResponse.json();

    if (cognitiveResponseJSON.documents.length === 1) {
      const doc = cognitiveResponseJSON.documents[0];
      const sentiment = doc.sentiment;
      console.log("sentiment for id " + comment.id + " : " + sentiment);

      comment.Sentiment = sentiment;
      comment.language = detectedLanguage;

      switch (sentiment) {
        case "positive": { comment.confidence = doc.confidenceScores.positive; break; }
        case "neutral": { comment.confidence = doc.confidenceScores.neutral; break; }
        case "negative": { comment.confidence = doc.confidenceScores.negative; break; }
      }
    }
    else {
      comment.Sentiment = "undefined";
      comment.language = "unknown";
      comment.confidence = 1;
    }

    return comment;
  }


  private _prepareHttpOptionsForApi(comment: IPageComment, language: string): IHttpClientOptions {
    const body: any = {
      documents: [{
        id: comment.id,
        text: comment.comment
      }]
    };

    if (language) {
      body.language = language;
    }

    const httpOptions: IHttpClientOptions = {
      body: JSON.stringify(body),
      headers: this._prepareHeadersForTextApi()
    };

    return httpOptions;
  }

  private _prepareHeadersForTextApi(): Headers {
    const requestHeaders: Headers = new Headers();
    requestHeaders.append("Accept", "application/json");
    requestHeaders.append("Content-Type", "application/json");
    requestHeaders.append("Cache-Control", "no-cache");
    requestHeaders.append("Ocp-Apim-Subscription-Key", this._textSentimentApiKey || "");

    return requestHeaders;
  }

}