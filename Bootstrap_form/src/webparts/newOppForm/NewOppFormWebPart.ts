import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './NewOppFormWebPart.module.scss';
import * as strings from 'NewOppFormWebPartStrings';
import { SPComponentLoader } from '@microsoft/sp-loader';
import 'jquery';
require('bootstrap');
require ("./NewOppFormWebPart.scss");
export interface INewOppFormWebPartProps {
  description: string;
}


export default class NewOppFormWebPart extends BaseClientSideWebPart<INewOppFormWebPartProps> {

  public render(): void {
    let cssURL = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
    SPComponentLoader.loadCss(cssURL);

    this.domElement.innerHTML = `
      <div class="container" id="form_container">
        <div class="contact-image" >
        <div class="glyphicon-ring glyphicon-white"> <span class="glyphicon glyphicon-pencil glyphicon-bordered"></span>

        </div>
        </div>
        <div class="row">
          <form role="form">
              <div class="form-group col-xs-10 col-sm-5 col-md-5 col-lg-5">
                  <label for="exampleInputEmail1">qqq address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
              </div>
              <div class="form-group col-xs-10 col-sm-5 col-md-5 col-lg-5">
                  <label for="exampleInputEmail1">Name</label>
                  <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Enter Name">
              </div>
              <div class="clearfix"></div>
              <div class="form-group col-xs-10 col-sm-5 col-md-5 col-lg-5">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
              </div>
              <div class="form-group col-xs-10 col-sm-5 col-md-5 col-lg-5">
                  <label for="exampleInputPassword1">Confirm Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Confirm Password">
              </div>
              <div class="clearfix"></div>
              <div class="form-group col-xs-10 col-sm-10 col-md-5 col-lg-5">
                  <label for="exampleInputFile">File input</label>
                  <input type="file" id="exampleInputFile">
                  <p class="help-block">Example block-level help text here.</p>
              </div>
              <div class="col-xs-10 col-sm-10 col-md-5 col-lg-5">
                  <label>
                      <input type="radio"> Check me out<input type="radio"> Check me out<input type="radio"> Check me out
                  </label>
              </div>
              <div class="clearfix"></div>
              <div class="col-xs-10 col-sm-5 col-md-5 col-lg-5">
                  <button type="submit" class="btn btn-default">Submit</button>
              </div>
          </form>
          <div class="clearfix"></div>

          <br /><br />
        </div>
      </div>
    `;
    require("./main.js");
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
