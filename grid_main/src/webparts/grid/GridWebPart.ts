import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

//import styles from './a.module.scss';

// require('./a.css');
var myLib = require("./gridMain.js");
import * as strings from 'GridWebPartStrings';
import './a.scss';
import 'jquery';
import 'datatables.net';


export interface IGridWebPartProps {
  description: string;
}

export default class GridWebPart extends BaseClientSideWebPart<IGridWebPartProps> {
  
  public render(): void {
    
    if(this.domElement.getElementsByClassName("portletMain").length == 1){
      this.domElement.innerHTML = "";
    }
    this.domElement.innerHTML = `
    
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css" />
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js"></script>
    <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    
      <div class="portletMain" id="p12"> 
        <table id="tableMain" class="hover" style="width:100%">
          <thead>
            <tr>
              <th>Id</th>
              <th>Opportunity Name</th>
              <th>Fund</th>
              <th>Share Class</th>
              <th>Tier</th>
              <th>Investor Name</th>
              <th>Probability</th>
              <th>High Limit</th>
              <th>Low Limit</th>
              <th>Date</th>
              <th>Investor Document</th>
              
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </div>
    `;
    // require('./d.js');
    var jsGrid = require('./gridMain.js');
    jsGrid["gridExtention"]()["init"]();

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
