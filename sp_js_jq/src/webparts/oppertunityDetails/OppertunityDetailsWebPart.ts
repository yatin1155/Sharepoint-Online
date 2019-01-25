import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './OppertunityDetailsWebPart.module.scss';
import * as strings from 'OppertunityDetailsWebPartStrings';

import 'jquery';
import './material';
import "material";
import './main.scss';


export interface IOppertunityDetailsWebPartProps {
  description: string;
}

export default class OppertunityDetailsWebPart extends BaseClientSideWebPart<IOppertunityDetailsWebPartProps> {


  public render(): void {
    // <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
   
    this.domElement.innerHTML = `

    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
    
      <div class="${styles.portletMain} mdl-grid" id="p12">
        <div class="${styles["portlet-title"]} mdl-cell mdl-cell--12-col mdl-cell--12-col-table">
          <h8>
            <i class="fa fa-table"></i>
            Opportunity Details
          </h8>
        </div>
        <div class="${styles["portlet-body"]} mdl-cell mdl-cell--12-col mdl-cell--12-col-table">
          <form id="Opportunity_Form" role="form">
            <div class="grid-container">
              <div class="grid-item"></div>
            </div>
          </form>
          <div class="btnGroup"> 
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="editForm">
              Edit
            </button>
            <div class="saveBtnGroup">
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="saveForm">
                Save
              </button>
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="cancelForm">
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div>

      `;
      require("./material.js");
      require("./opp.js");
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
