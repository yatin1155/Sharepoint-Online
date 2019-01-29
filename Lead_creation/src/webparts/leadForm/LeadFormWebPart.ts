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
    
    
    <div class="${styles.portletMain} mdl-grid" id="p13Lead">
        <div class="${styles["portlet-title"]} mdl-cell mdl-cell--12-col mdl-cell--12-col-table">
          <h8>
            <i class="fa fa-table"></i>
            Lead Creation Form
          </h8>
        </div>
        <div class="${styles["portlet-body"]} mdl-cell mdl-cell--12-col mdl-cell--12-col-table">
        
          <form id="Lead_Form" role="form">
            <div class="grid-container">
              <div class="grid-item">
                
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input"  type="text" id="Opportunity_Name" >
                  <label class="mdl-textfield__label" for="Opportunity_Name">Opportunity Name</label>
                  <span class="mdl-textfield__error">Only alphabet and no spaces, please!</span>
                </div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="text" id="sample3">
                  <label class="mdl-textfield__label" for="sample3">Fund Interest =>DropDown</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="text" id="Fund_Share_Class">
                  <label class="mdl-textfield__label" for="Fund_Share_Class">Fund Share Class</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="text" id="Tier">
                  <label class="mdl-textfield__label" for="Tier">Tier</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="text" id="Investor_Name">
                  <label class="mdl-textfield__label" for="Investor_Name">Investor Name</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="text" id="Investing_Entity">
                  <label class="mdl-textfield__label" for="Investing_Entity">Investing Entity</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="text" id="Country_Residence_Incorporation">
                  <label class="mdl-textfield__label" for="Country_Residence_Incorporation">Country Residence Incorporation</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="text" id="Investor_Classification">
                  <label class="mdl-textfield__label" for="Investor_Classification">Investor Classification =>Dropdown</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="text" id="Tax_Exemption_Status_US">
                  <label class="mdl-textfield__label" for="Tax_Exemption_Status_US">Tax Exemption Status =>Dropdown</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="text" id="Investor_Email">
                  <label class="mdl-textfield__label" for="Investor_Email">Investor_Email</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="text" id="Low_Inv_Limit">
                  <label class="mdl-textfield__label" for="Low_Inv_Limit">Low_Inv_Limit</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="text" id="High_Inv_Limit">
                  <label class="mdl-textfield__label" for="High_Inv_Limit">High_Inv_Limit</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="text" id="Probability">
                  <label class="mdl-textfield__label" for="Probability">Probability</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input class="mdl-textfield__input" type="text" id="Date">
                  <label class="mdl-textfield__label" for="Date">Date</label>
                </div>
              </div>
            </div>
          </form>


          <div class="btnGroup"> 
           
            <div class="saveBtnGroup">
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="saveForm" data-upgraded=",MaterialButton,MaterialRipple">
                Save
              <span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></button>
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="cancelForm" data-upgraded=",MaterialButton,MaterialRipple">
                Cancel
              <span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></button>
            </div>
          </div>


          <div class="notify"><span id="notifyType" class=""></span></div>
        </div>
        <div>

        
    `;
    
    require("./lead_main.js");
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
