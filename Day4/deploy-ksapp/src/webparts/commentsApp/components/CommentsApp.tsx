import * as React from 'react';
import styles from './CommentsApp.module.scss';
import type { ICommentsAppProps } from './ICommentsAppProps';


import {
  SPHttpClient,
  SPHttpClientResponse,

} from "@microsoft/sp-http";

interface IComment {
  id: number;
  author?: string;
  comment: string;
  createdDate?: Date;
}
interface IPageCommentResponse {

  id: number,
  author: {
    name: string
  }
  ,
  text: string
}

export interface ICommentState {

  comments: IComment[];
}
export default class CommentsApp extends React.Component<ICommentsAppProps, ICommentState> {

  private _baseUrl: string;
  private _listId: string | undefined;
  private _listItemId: string | undefined;
  private _spHttpClient: SPHttpClient;

  constructor(props: ICommentsAppProps) {
    super(props)


    let c = props.context;

    this._baseUrl = c.pageContext.web.absoluteUrl;
    this._listId =
      c.pageContext.list &&
      c.pageContext.list.id.toString();
    this._listItemId =
      c.pageContext.listItem &&
      c.pageContext.listItem.id.toString();
    this._spHttpClient = c.spHttpClient;

      console.log(c.pageContext.listItem)

    this.state = {
      comments: []
    }

  }
  public componentDidMount(): void {  
    this._getTop5PageComments().then (c=> {
          this.setState({ comments: c });
        }
      );
  }

  private async _getTop5PageComments(): Promise<IComment[]> {
    const pageCommentsEndpoint: string = `${this._baseUrl}/_api/web/lists('${this._listId}')/GetItemById(${this._listItemId})/Comments?$top=5&$inlineCount=AllPages`;
  
    const response: SPHttpClientResponse = await this._spHttpClient.get(pageCommentsEndpoint, SPHttpClient.configurations.v1);
    const responseJson: any = await response.json();
    const comments: IComment[] = responseJson.value.map((c:IPageCommentResponse) => {
      const comment: IComment = {
        id: c.id,
        author: c.author.name,
        comment: c.text
      };
      return comment;
    });
  
    return comments;
  }

  public render(): React.ReactElement<ICommentsAppProps> {
   
   

    return (
      <div className={ styles.articlePageComments }>
      <div className={ styles.container }>
        <div className={ styles.row }>
          <div className={ styles.column }>
            <span className={ styles.title }>Here are the {this.state.comments.length} comment(s) - V1.0 @KS</span>
            <ul>
              {this.state.comments.map((item) => <li>{item.comment}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
