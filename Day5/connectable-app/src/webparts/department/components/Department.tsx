import * as React from 'react';
import styles from './Department.module.scss';
import type { IDepartmentProps } from './IDepartmentProps';

import { IDepartment } from './IDepartment';

import {
  //autobind,
  DetailsList,
  DetailsListLayoutMode,
  CheckboxVisibility,
  SelectionMode,
  Selection
} from 'office-ui-fabric-react';
import { SPHttpClient } from '@microsoft/sp-http';

export interface IDepartmentState {
  status: string;
  DepartmentListItems: IDepartment[];
  DepartmentListItem: IDepartment;
}

let _departmentListColumns = [
  {
    key: 'DEPTNO',
    name: 'DEPTNO',
    fieldName: 'DEPTNO',
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
  }
];

export default class Department extends React.Component<IDepartmentProps, IDepartmentState> {

  private _selection: Selection;

  constructor(props: IDepartmentProps) {
    super(props);

    this.state = {
      status: 'Ready',
      DepartmentListItems: [],
      DepartmentListItem: {
        DEPTNO: 0,
        Title: ""
      }
    };

    this._selection = new Selection({
      onSelectionChanged: this._onItemsSelectionChanged,
    });
  }

  private _onItemsSelectionChanged = () => {
    if (this.props.onDepartmentSelected) {
      this.props.onDepartmentSelected(this._selection.getSelection()[0] as IDepartment);
    }

    this.setState({
      DepartmentListItem: (this._selection.getSelection()[0] as IDepartment)
    });

  }
  public componentDidMount(): void {
    console.log("component did moucnt")
    this.bindDetailsList("All Records have been loaded Successfully");


  }
  public bindDetailsList(message: string): void {

    this._getListItems().then(listItems => {
      console.log(listItems, "listitems")
      this.setState({ DepartmentListItems: listItems });
    });
  }
  private _getListItems(): Promise<IDepartment[]> {
    //const url: string = this.props.siteUrl + "/_api/web/lists/getbytitle('DEPT')/items";

    const url: string = "https://333gm2.sharepoint.com/sites/BronTeamSite/_api/web/lists/getbytitle('DEPT')/items";
    const query = `?$select=Title,DEPTNO`;

    return this.props.context.spHttpClient.get(url + query, SPHttpClient.configurations.v1)
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json.value;
      }) as Promise<IDepartment[]>;
  }

  public render(): React.ReactElement<IDepartmentProps> {


    return (
      <div className={styles.department}>

        <DetailsList
          items={this.state.DepartmentListItems}
          columns={_departmentListColumns}
          setKey='DEPTNO'
          checkboxVisibility={CheckboxVisibility.always}
          selectionMode={SelectionMode.single}
          layoutMode={DetailsListLayoutMode.fixedColumns}
          compact={true}
          selection={this._selection}
        />

      </div>

    );
  }
}
