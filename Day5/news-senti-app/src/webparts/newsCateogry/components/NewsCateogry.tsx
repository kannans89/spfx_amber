import * as React from 'react';
import styles from './NewsCateogry.module.scss';
import type { INewsCateogryProps } from './INewsCateogryProps';
import { IFilterNewsState } from './IFilterNewsState';
import { IData } from '../../data/IData';

const LANGUAGE:string="en-US"
export default class NewsCateogry extends React.Component<INewsCateogryProps,IFilterNewsState> {

  
  constructor(props:INewsCateogryProps){
     super(props);

     this.state={
      proposedData:[],
      currentData:""
     };


  }

  public componentDidMount(): void {
    
    this.setState({

       proposedData:[{
       keywords:'Sports',language:LANGUAGE
       },
       {
        keywords:'Business',language:LANGUAGE
        },
        {
          keywords:'Politics',language:LANGUAGE
          },
         

            {
              keywords:'Entertainment',language:LANGUAGE
              }
      
      ],currentData:'Sports'

    });

    this.props.onDataChanged({keywords:'Sports',language:LANGUAGE});
  }
  public render(): React.ReactElement<INewsCateogryProps> {
   
 
     let items = this.state.proposedData.map((item)=>{
      return(
        <option>
          {item.keywords}
        </option>
      )

     })
     let webpart = this;
    console.log("render method called")
     return(
      <div className={styles.newsCateogry}>
        <div>
               <select value={this.state.currentData} onChange={(e)=>{
                const val:string=e.target.value;
                console.log('current selectin is:'+val)
                webpart.setState({currentData:val});
                const data:IData={keywords:val,language:LANGUAGE}
                webpart.props.onDataChanged(data);

               }}>

                {items}
               </select>
        </div>

      </div>
     );
  }
}
