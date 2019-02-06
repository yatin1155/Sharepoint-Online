import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './LeadFormWebPart.module.scss';
import * as strings from 'LeadFormWebPartStrings';
import  "material-design-lite";
import 'jquery';
import "select2";
// import './material';
// import "material";
import './main.scss';
// import './loc/materialTest'


export interface ILeadFormWebPartProps {
  description: string;
}

export default class LeadFormWebPart extends BaseClientSideWebPart<ILeadFormWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
    <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
    
    <div class="${styles.portletMain} mdl-grid" id="p13Lead">
        <div class="${styles["portlet-title"]} mdl-cell mdl-cell--12-col mdl-cell--12-col-table">
          <h8>
            
            Lead Creation Form
          </h8>
        </div>
        <div class="${styles["portlet-body"]} mdl-cell mdl-cell--12-col mdl-cell--12-col-table">
        
          <form id="Lead_Form" role="form">
            <div class="grid-container">
              <div class="grid-item">
              </div>
            </div>
          </form>
        

          <div class="btnGroup"> 
           
            <div class="saveBtnGroup">
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="saveForm" data-upgraded=",MaterialButton,MaterialRipple">
                Submit
              <span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></button>
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="cancelForm" data-upgraded=",MaterialButton,MaterialRipple">
                Reset
              <span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></button>
            </div>
          </div>


          <div class="notify"><span id="notifyType" class=""></span></div>
        </div>
        <div>
    `;
    
    var jsMain = require("./lead_main.js");
    jsMain["leadFormModule"]()["init"]();
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
