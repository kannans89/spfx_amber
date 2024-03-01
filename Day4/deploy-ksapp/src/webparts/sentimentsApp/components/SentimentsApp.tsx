import * as React from 'react';
import styles from './SentimentsApp.module.scss';
import type { ISentimentsAppProps } from './ISentimentsAppProps';
import IPageComment from './IPageComment'
import { CommentsAndSentimentDataService } from './service/CommentsAndSentimentDataService';

export interface ISentimentsAppState {  
  comments: IPageComment[];  
} 

export default class SentimentsApp extends React.Component<ISentimentsAppProps, ISentimentsAppState> {


  private service:CommentsAndSentimentDataService;

  constructor(props: ISentimentsAppProps) {
    super(props);
    
    let c = props.context;
 
  //Service instanciation
    this.service = new CommentsAndSentimentDataService(
      c.pageContext.web.absoluteUrl,
      c.pageContext.list && c.pageContext.list.id.toString(),
      c.pageContext.listItem && c.pageContext.listItem.id.toString(),
      c.spHttpClient,
      c.httpClient, this.props.apiKey
    );
 
    this.state = {
      comments: []
    };
  }

  public componentDidMount(): void {  
    this.service.getCommentsAndCalculateSentiments().then (c=> {
      this.setState({ comments: c });                    
     }
   );
  }


  public render(): React.ReactElement<ISentimentsAppProps> {
   
    let validItems = this.state.comments
                     .filter((item) => item.Sentiment == this.props.selectedSentiment);

    return (
      <div className={ styles.articlePageComments }>
      <div className={ styles.container }>
        <div className={ styles.row }>
          <div className={ styles.column }>
            <span className={ styles.title }>Here are the {validItems.length} comment(s)  that are {this.props.selectedSentiment} v1.0(KS)</span>
            <ul>
              {
            validItems
               .map((item) => <li>{item.comment}, ({item.language}) Sentiment : {item.Sentiment} ({item.confidence})</li>) 
              }  
            </ul>
          </div>
        </div>
      </div>
    </div>
     
    );
  }
}
