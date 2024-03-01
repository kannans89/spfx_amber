import * as React from 'react';
import styles from './SentiNewsDisplay.module.scss';
import type { ISentiNewsDisplayProps } from './ISentiNewsDisplayProps';

import { INewsSentimentState } from './INewsSentimentState';
import { BingService } from '../Services/BingService';
import { IData } from '../../data/IData';

export default class SentiNewsDisplay extends React.Component<ISentiNewsDisplayProps, INewsSentimentState> {

  private service:BingService;

  constructor(props:ISentiNewsDisplayProps){

     super(props);
     this.service = new BingService(props.context.httpClient,props.textSentimentApiKey,props.bingKey
      );

     this.state = {
       news:[],
       currentkeywords:undefined
     };

  }

  public async componentDidMount() {        
    const data: IData|undefined = this.props.keywords.tryGetValue();
    console.log(data); 
    if(data && data.keywords != undefined)
      {
        this.LoadNews(data);
      }
  }

  public async componentDidUpdate?(prevProps: ISentiNewsDisplayProps, prevState: INewsSentimentState, snapshot: any): Promise<void> {
    
    const data: IData |undefined = this.props.keywords.tryGetValue();
    console.log(data); 
    if(data && prevState.currentkeywords != data)
    {        
      this.LoadNews(data);
    }
  }

  private LoadNews(data : IData): void {
    this.service = new BingService(this.props.context.httpClient,this.props.textSentimentApiKey,this.props.bingKey);
    this.service.getNewsFromBingAndDetermineSentiments(data)
     .then(newsAndSentiments=>{
      console.log("inside load news");
      console.log(newsAndSentiments)
      
      this.setState({currentkeywords:data,news:newsAndSentiments})
     })
   
  }
 
  public render(): React.ReactElement<ISentiNewsDisplayProps> {
    
    let validItems = this.state.news?.filter((item) => item.Sentiment == this.props.chosenSentiment);
   // let validItems=this.state.news;
    let items = validItems?.map((item) => <li>{item.name}, Sentiment : {item.Sentiment} ({item.confidence})</li>);   

    return (
      <div className={ styles.newsSentiment }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Data received from : {this.state.currentkeywords}</span>              
              <ul>
                {items}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
