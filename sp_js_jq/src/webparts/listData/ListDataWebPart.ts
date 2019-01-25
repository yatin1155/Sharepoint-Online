import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ListDataWebPart.module.scss';
import * as strings from 'ListDataWebPartStrings';

import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

import 'jquery';
import 'datatables.net';

export interface IListDataWebPartProps {
  description: string;
}

export default class ListDataWebPart extends BaseClientSideWebPart<IListDataWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css" />
    <div id="main" class="${styles.container}"></div>
    <table id="requests" class="display" cellspacing="0" width="100%">
        <thead>
            <tr>
              <th>Product Name</th>
              <th>Title</th>
              
            </tr>
        </thead>
      </table>
      
      
      `;
      require('./listScript.js');
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
