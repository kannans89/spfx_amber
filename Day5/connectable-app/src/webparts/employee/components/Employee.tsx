import * as React from 'react';
import styles from './Employee.module.scss';
import type { IEmployeeProps } from './IEmployeeProps';

import { SPHttpClient } from '@microsoft/sp-http';

import {
  //autobind,
  DetailsList,
  DetailsListLayoutMode,
  CheckboxVisibility,
  SelectionMode,

} from 'office-ui-fabric-react';

let _employeeListColumns = [
  {
    key: 'EMPNO',
    name: 'EMPNO',
    fieldName: 'EMPNO',
    minWidth: 50,
    maxWidth: 100,
    isResizable: true
  },
  {
    key: 'Title',
    name: 'Title',
    fieldName: 'Title',
    minWidth: 50,
    maxWidth: 100,
    isResizable: true
  },
  {
    key: 'DeptTitleId',
    name: 'DeptTitleId',
    fieldName: 'DeptTitleId',
    minWidth: 50,
    maxWidth: 100,
    isResizable: true
  },
  {
    key: 'Designation',
    name: 'Designation',
    fieldName: 'Designation',
    minWidth: 50,
    maxWidth: 100,
    isResizable: true
  }
];
export interface IEmployee {
  EMPNO: number;
  Title: string;
  DeptTitle: string;

}

export interface IEmployeeState {
  status: string;
  EmployeeListItems: IEmployee[];
  EmployeeListItem: IEmployee;
  DeptTitleId: string;
}

export default class Employee extends React.Component<IEmployeeProps, IEmployeeState> {

  constructor(props: IEmployeeProps) {
    super(props);

    this.state = {
      status: 'Ready',
      EmployeeListItems: [],
      EmployeeListItem: {
        EMPNO: 0,
        Title: "",
        DeptTitle: "",

      },
      DeptTitleId: ""

    };
  }
  private _getListItems(): Promise<IEmployee[]> {
    const url: string = "https://333gm2.sharepoint.com/sites/BronTeamSite/_api/web/lists/getbytitle('EMP')/items?$filter=DEPTNO eq " + this.props.DeptTitleId.tryGetValue();
    // alert(url)
    return this.props.context.spHttpClient.get(url, SPHttpClient.configurations.v1)
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json.value;
      }) as Promise<IEmployee[]>;
  }

  public bindDetailsList(message: string) : void {

    this._getListItems().then(listItems => {
            
      this.setState({ EmployeeListItems: listItems,status: message,
        DeptTitleId: this.props.DeptTitleId.tryGetValue()+"" });
   
      
    });
  
  }

  public render(): React.ReactElement<IEmployeeProps> {

    if (this.state.DeptTitleId != this.props.DeptTitleId.tryGetValue()) {
      this.bindDetailsList("All Records have been loaded Successfully");
    }


    return (
      <div className={ styles.employee }>
        
        <div>
          <h1>emp count is {this.state.EmployeeListItems.length}</h1>
          <h1>dept ins state is {this.state.DeptTitleId}</h1>
          <h1>Selected Department is : {this.props.DeptTitleId.tryGetValue()}</h1>    
        </div>
          <DetailsList
                      items={ this.state.EmployeeListItems}
                      columns={ _employeeListColumns }
                      setKey='EMPNO'
                      checkboxVisibility={ CheckboxVisibility.always}
                      selectionMode={ SelectionMode.single}
                      layoutMode={ DetailsListLayoutMode.fixedColumns }
                      compact={ true }                      
                  />
    
    
      </div>
    );
  }
}
