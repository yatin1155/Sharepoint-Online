import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './OppGridWebPart.module.scss';
import * as strings from 'OppGridWebPartStrings';

export interface IOppGridWebPartProps {
  description: string;
}

import "./OppGridWebpart.scss";
import 'jquery';
import 'datatables.net';

export default class OppGridWebPart extends BaseClientSideWebPart<IOppGridWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    
      <div class="portletMain" id="p12Grid"> 
        <table id="tableMain" class="hover" style="width:100%">
          <thead>
            <tr>
              <th>Id</th>
              <th>Opportunity Name</th>
              <th>Status</th>
              <th>Fund</th>
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
      <div class="filterBox"></div>
    `;

    var a = require('./oppGrid.js');
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
