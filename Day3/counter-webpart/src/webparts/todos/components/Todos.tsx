import * as React from 'react';
import type { ITodosProps } from './ITodosProps';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';


interface ITodoItem {
  Title: string
}
interface ITodoState {
  todos: ITodoItem[]
}

export default class Todos extends React.Component<ITodosProps, ITodoState> {

  constructor(props: ITodosProps) {
    super(props)
    this.state = {
      todos: []
    };

  }
  async loadTodos() {
    console.log("btn click fired")
    console.log(this.props.url)
    try {
      const response: SPHttpClientResponse = await this.props.mysphttp.get(`${this.props.url}/_api/web/lists/getByTitle('kstodos')/items`,
        SPHttpClient.configurations.v1);
      // console.log(response.json())

      const data: { value: ITodoItem[] } = await response.json();
      console.log(data.value)

      this.setState({ todos: data.value })

    }
    catch (err) {
      console.log("couldnt fetch list items ", console.error);

    }

  }
  public render(): React.ReactElement<ITodosProps> {

    return (
      <div>
        <button onClick={this.loadTodos.bind(this)}>View Todos</button>
        <div>Found Todos : {this.state.todos.length} </div>
        {/* <ul>
          {this.state.todos.map((item, index) => (
            <li key={index}>{item.Title}</li>
          ))}
        </ul> */}
        <ul>
              {this.state.todos.map((item,index)=>(

                 <li key={index}>{item.Title}</li>
              ))}
                
             </ul>
      </div>
    );
  }
}
