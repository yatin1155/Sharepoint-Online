import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

//import styles from './a.module.scss';

require('./a.css');
var myLib = require("./gridMain.js");
import * as strings from 'GridWebPartStrings';

import 'jquery';
import 'datatables';


export interface IGridWebPartProps {
  description: string;
}

export default class GridWebPart extends BaseClientSideWebPart<IGridWebPartProps> {
  
  public render(): void {
    
    if(this.domElement.getElementsByClassName("portletMain").length == 1){
      this.domElement.innerHTML = "";
    }
    this.domElement.innerHTML = `
    
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    
      <div class="portletMain" id="p12"> 
        <table id="tableMain" class="hover" style="width:100%">
          <thead>
            <tr>
              <th>Id</th>
              <th>Fund Name</th>
              <th>Transaction Name</th>
              <th>Investor Name</th>
              <th>Feeder ID</th>
              <th>Master Id</th>
              <th>Investor Entity</th>
              <th>Requested Amount</th>
              <th>Estimated Amount</th>
              <th>Final Amount</th>
              <th>Pay Date</th>
              <th>From Account</th>
              <th>From Account Number</th>
              <th>To Account Number</th>
              <th>To Account</th>
              
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </div>
    `;

    // require('./gridMain.js');


  }

  protected get dataVersion(): Version {
    return Version.parse('1.1');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
