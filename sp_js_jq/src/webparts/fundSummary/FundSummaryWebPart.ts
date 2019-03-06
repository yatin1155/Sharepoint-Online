import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import { SPComponentLoader } from '@microsoft/sp-loader';
import styles from './FundSummaryWebPart.module.scss';
import * as strings from 'FundSummaryWebPartStrings';

export interface IFundSummaryWebPartProps {
  description: string;
}
import {
  SPHttpClient,
  SPHttpClientResponse   
 } from '@microsoft/sp-http';

import "jquery";
import './numAnimation';

export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}

import {
  Environment,
  EnvironmentType
 } from '@microsoft/sp-core-library';


export default class FundSummaryWebPart extends BaseClientSideWebPart<IFundSummaryWebPartProps> {

 
  public render(): void {
    let cssURL = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
    SPComponentLoader.loadCss(cssURL);
    this.domElement.innerHTML = `
    
    <div class="${styles.componentParent} row-fluid ${styles.largestLong} dc-chart drawn ${styles.cardNew}" id="cardNew" objecttype="label">
      <div id="label0-cardNew" class="span12 mZero ellipses  ${styles["largest-longest"]}">
      </div>
    </div>
    `;
    require("./fundSummary.js");
    
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
