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
    debugger;
    console.log(myLib);
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
            <tr>
              <td>1</td>
              <td>IVP Fund Alpha</td>
              <td>IVP-Alpha-001</td>
              <td>Beta Capital</td>
              <td>25</td>
              <td>25</td>
              <td>Beta Capital LLC UK</td>
              <td>1000000.00</td>
              <td>800000.00</td>
              <td>8000000.00</td>
              <td>2019-01-01T08:00:00Z</td>
              <td>BETA UK</td>
              <td>ACN000001111</td>
              <td>ACN000002222</td>
              <td>IVP Feeder</td>
            </tr>
            <tr>
              <td>2</td>
              <td>IVP Fund Alpha</td>
              <td>IVP-Alpha-002</td>
              <td>Beta Capital</td>
              <td>25</td>
              <td>25</td>
              <td>Beta Capital LLC UK</td>
              <td>$1,000,000.00</td>
              <td>$800,000.00</td>
              <td>$8,000,000.00</td>
              <td>2019-01-01T08:00:00Z</td>
              <td>BETA UK</td>
              <td>ACN000001111</td>
              <td>ACN000002222</td>
              <td>IVP Feeder</td>
            </tr>
            <tr>
              <td>1</td>
              <td>IVP Fund Alpha</td>
              <td>IVP-Alpha-001</td>
              <td>Beta Capital</td>
              <td>25</td>
              <td>25</td>
              <td>Beta Capital LLC UK</td>
              <td>1000000.00</td>
              <td>800000.00</td>
              <td>8000000.00</td>
              <td>2019-01-01T08:00:00Z</td>
              <td>BETA UK</td>
              <td>ACN000001111</td>
              <td>ACN000002222</td>
              <td>IVP Feeder</td>
            </tr>
            <tr>
              <td>2</td>
              <td>IVP Fund Alpha</td>
              <td>IVP-Alpha-002</td>
              <td>Beta Capital</td>
              <td>25</td>
              <td>25</td>
              <td>Beta Capital LLC UK</td>
              <td>$1,000,000.00</td>
              <td>$800,000.00</td>
              <td>$8,000,000.00</td>
              <td>2019-01-01T08:00:00Z</td>
              <td>BETA UK</td>
              <td>ACN000001111</td>
              <td>ACN000002222</td>
              <td>IVP Feeder</td>
            </tr>
            <tr>
              <td>1</td>
              <td>IVP Fund Alpha</td>
              <td>IVP-Alpha-001</td>
              <td>Beta Capital</td>
              <td>25</td>
              <td>25</td>
              <td>Beta Capital LLC UK</td>
              <td>1000000.00</td>
              <td>800000.00</td>
              <td>8000000.00</td>
              <td>2019-01-01T08:00:00Z</td>
              <td>BETA UK</td>
              <td>ACN000001111</td>
              <td>ACN000002222</td>
              <td>IVP Feeder</td>
            </tr>
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
