import {
  Version
} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import {
  escape
} from '@microsoft/sp-lodash-subset';

import 'jquery';
import styles from './ProcessFlowWebPart.module.scss';
import * as strings from 'ProcessFlowWebPartStrings';
import  './portletProcess.scss';
export interface IProcessFlowWebPartProps {
  description: string;
}

export default class ProcessFlowWebPart extends BaseClientSideWebPart < IProcessFlowWebPartProps > {

  public render(): void {
    this.domElement.innerHTML = `
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
    
    <div id="${styles.crumbs}" class="portletProcess">
      <div class="${styles.ul} scrollBody"></div>
    </div>  
      `;
      require('./processScript');
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [{
        header: {
          description: strings.PropertyPaneDescription
        },
        groups: [{
          groupName: strings.BasicGroupName,
          groupFields: [
            PropertyPaneTextField('description', {
              label: strings.DescriptionFieldLabel
            })
          ]
        }]
      }]
    };
  }
}
