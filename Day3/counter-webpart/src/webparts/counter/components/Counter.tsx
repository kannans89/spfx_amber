import * as React from 'react';

import type { ICounterProps } from './ICounterProps';

export interface ICounterState{
  count:number;
}

export default class Counter extends React.Component<ICounterProps, ICounterState> {
 
  constructor(props:ICounterProps) {
    super(props);
  
    this.state = {
    //  counter: parseInt( props.initialValue.toString(), 10) || 0
      count:  props.initialCounter||0
    };
  }
 
  incrementCounter = () => {
  
    this.setState((prevState) => ({
      count: prevState.count + 1
    }));
  };

  decrementCounter = () => {
    if (this.state.count > 0) {
      this.setState((prevState) => ({
        count: prevState.count - 1
      }));
    }
  };

  componentDidUpdate(prevProps: ICounterProps) {
    // Check if the initialValue prop has changed
    if (this.props.initialCounter !== prevProps.initialCounter) {
      // Update the counter state with the new value
      this.setState({ count: this.props.initialCounter || 0 });
    }
  }
 
  public render(): React.ReactElement<ICounterProps> {
    return (

      <div>

          <h1>{this.props.heading}</h1>
          <button onClick={this.incrementCounter} id="btnPlus">+</button>
          <button id="btnMinus" onClick={this.decrementCounter}>-</button>
          <h1 id="h1Display">{this.state.count}</h1>
          <h1 id="h1Display">{this.props.initialCounter}</h1>
      </div>
  );
  }
}
