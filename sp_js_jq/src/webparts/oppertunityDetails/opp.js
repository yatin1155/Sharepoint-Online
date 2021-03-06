import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';

var oppModule = (function () {
  var updatedHeaders;
  var formDirty = false;  var __REQUESTDIGEST;
  var gHeaders = [{            // config
      "jsonName": "Opportunity_Name",
      "type": "textField",
      "dataType": "string",
      "displayName": "Opportunity Name",
      "addClass": "forcedDisabled"
    },
    {
      "jsonName": "Fund",
      "type": "textField",
      "dataType": "string",
      "displayName": "Fund Name",
      "addClass": "forcedDisabled"
    }, {
      "jsonName": "Investor_Name",
      "type": "textField",
      "dataType": "string",
      "displayName": "Investor Name",
      "addClass": "forcedDisabled"
    },
    {
      "jsonName": "Fund_Share_Class",
      "type": "textField",
      "dataType": "string",
      "displayName": "Fund Share Class",
      "addClass": ""
    },
    {
      "jsonName": "Tier",
      "type": "textField",
      "dataType": "string",
      "displayName": "Tier",
      "addClass": ""
    },


    {
      "jsonName": "Probability",
      "type": "textField",
      "dataType": "percentage",
      "displayName": "Probability"
    },
    {
      "jsonName": "Low_Inv_Limit",
      "type": "textField",
      "dataType": "number",
      "displayName": "Low ($)",
      "precision": 2
    },
    {
      "jsonName": "High_Inv_Limit",
      "type": "textField",
      "dataType": "number",
      "displayName": "High ($)",
      "precision": 2
    },
    {
      "jsonName": "Final_x0020_Commitment",
      "type": "textField",
      "dataType": "number",
      "displayName": "Final Commitment ($)",
      "precision": 2
    },
    {
      "jsonName": "Percentage_Fund_Allocation",
      "type": "textField",
      "dataType": "percentage",
      "displayName": "Percentage Allocation(%)",
      "calcLogic": {
        "dataIn": "Multiply by 100",
        "dataOut": "Divide by 100"
      }
    },
    {
      "jsonName": "Fund_Investment",
      "type": "textField",
      "dataType": "number",
      "displayName": "Fund Investment ($)",
      "precision": 2,
      "property": "readonly",
      "addClass": "forcedDisabled"
    },
    {
      "jsonName": "Date",
      "type": "textField",
      "dataType": "date",
      "displayName": "Date"
    },
    {
      "jsonName": "Send_Subs_Doc_Investor",
      "type": "dropDown",
      "dataType": "string",
      "displayName": "Document Status",
      "optionArr": ["None", "Documents Sent-Awaiting Response", "To be Sent", "Send Documents", "Response under Legal Review", "Response under TPA Review", "Send Revised Document", "Response Received"]
    },
    {
      "jsonName": "Comments",
      "type": "textArea",
      "dataType": "string",
      "displayName": "Comments",
      "addClass": "forcedDisabled",
      "property": "readonly",
      "addAttr": 'placeholder="No Comments present..."',
      "styles": "grid-column: 1 / span 2;width: 95%;"
    },
    {
      "jsonName": "Add_Comment",
      "type": "textArea",
      "dataType": "string",
      "displayName": "Add Comments",
      "addClass": ""
    }
  ];
  var webUrl = "https://ivpdemo.sharepoint.com";
  var listTitle = 'Investment_Opportunity';
  var filterQuery;
  var getJsonName = function (headers) {
    var jsonArr = headers.map((obj) => {
      return obj.jsonName;
    });
    return jsonArr;
  };
  var decodeUrl = () => {

    let URL = window.location.href;
    let filter = decodeURIComponent(URL.split("?")[1]).split("=");
    return filter;
  };
  var init = () => {  //Entry Point
    getdata();
  }
  var retrieveListItems = () => {

    var listName = "Investment_Opportunity";

    filterQuery = decodeUrl();

    var URL = "https://ivpdemo.sharepoint.com/_api/web/lists/getbytitle('" + listName + "')/items?$filter=Opportunity_Name eq '" + filterQuery[1] + "'"
    return $.ajax({
      url: URL,
      type: "GET",
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'odata-version': ''
      },
      success: function (data) {

        var JnName = getJsonName(gHeaders);
        var finalArr = {};
        var dataToReturn = data.value.map(function (item) {
          $("#Opportunity_Form").attr("QueryID", item["ID"]);
          $.each(JnName, (key, value) => {
            finalArr[value] = item[value]
          });
          return finalArr;
        });

        updatedHeaders = gHeaders.map((obj) => {
          let itemValue = finalArr[obj.jsonName];
          if (obj.dataType === "number") {
            if (itemValue == null) {
              itemValue = 0;
            }
            itemValue = fromatNumbers(itemValue + "", obj.precision);

          } else if (obj.dataType === "percentage" && obj.calcLogic) {

            if (obj.calcLogic.dataIn === "Multiply by 100") {
              itemValue = itemValue * 100;
            }

          }

          obj["value"] = itemValue;
          return obj;
        })
        drawHtml(updatedHeaders);
      }
    });
  };
  var updateListData = (restrictedArray) => {


    $.ajax({
      url: "https://ivpdemo.sharepoint.com/_api/contextinfo",
      method: "POST",
      headers: {
        "Accept": "application/json; odata=verbose"
      },
      success: function (data) {
        __REQUESTDIGEST = data.d.GetContextWebInformation.FormDigestValue;
        temp(restrictedArray);
      },
      error: function (data, errorCode, errorMessage) {
        alert(errorMessage)
      }
    });
  };
  var temp = (restrictedArray) => {
    var getattrArr = ["Tier", "Fund_Share_Class", "Probability", "Low_Inv_Limit", "High_Inv_Limit", "Final_x0020_Commitment", "Percentage_Fund_Allocation", "Fund_Investment", "Send_Subs_Doc_Investor", "Add_Comment"]
    // var itemArr = updatedHeaders.filter((obj)=>{
    //   if(getattrArr.includes(obj.jsonName)){
    //     return true;
    //   }else{
    //     return false;
    //   }
    // });
    var itemProperties = {};

    // $.each(itemArr,(obj)=>{
    //   itemProperties[obj.jsonName] = 
    // });

    // {
    //   'Investor_Name': 'Yatin Kapur'
    // };
    $.each(getattrArr, (key, value) => {
      var data = $("#" + value).val();

      //for percent logic
      if ($("#" + value).attr("calclogic") !== "undefined" && $("#" + value).attr("calclogic") !== undefined) {
        let calcLogic = JSON.parse($("#" + value).attr("calclogic"));
        if(calcLogic.dataOut === "Divide by 100"){
          data = data/100;
        }
      }

      //imporovement to be done later

      itemProperties[value] = data;
    })

    if (restrictedArray && restrictedArray.length !== 0) {
      $.each(restrictedArray, (key, value) => {
        delete itemProperties[value];
      });
    }
    console.log(itemProperties);

    //////Get data from the form
    updateListItem(webUrl, itemProperties, printInfo, logError, listTitle);

    function updateJson(endpointUri, payload, success, error) {
      $.ajax({
        url: endpointUri,
        type: "POST",
        data: JSON.stringify(payload),
        contentType: "application/json;odata=verbose",
        headers: {
          "Accept": "application/json;odata=verbose",
          "X-RequestDigest": __REQUESTDIGEST,
          "X-HTTP-Method": "MERGE",
          "If-Match": "*"
        },
        success: success,
        error: error
      });
    }

    function getItemTypeForListName(name) {
      //   return "SP.Data." + name.charAt(0).toUpperCase() + name.slice(1) + "ListItem";
      return "SP.Data.Investment_x005f_OpportunityListItem";

    }

    function updateListItem(webUrl, itemProperties, success, failure, listTitle) {

      var queryID = $("#Opportunity_Form").attr("queryid");
      var listItemUri = webUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/items('" + queryID + "')";
      var itemPayload = {
        '__metadata': {
          'type': getItemTypeForListName(listTitle)
        }
      };
      for (var prop in itemProperties) {
        itemPayload[prop] = itemProperties[prop];
      }
      
      updateJson(listItemUri, itemPayload, success, failure);
    }


    function printInfo() {
      $(".notify").toggleClass("active");
      $("#notifyType").toggleClass("success");

      setTimeout(function () {
        $(".notify").removeClass("active");
        $("#notifyType").removeClass("success");
      }, 3000);
    }

    function logError(error) {
      $(".notify").addClass("active");
      $("#notifyType").addClass("failure");

      setTimeout(function () {
        $(".notify").removeClass("active");
        $("#notifyType").removeClass("failure");
      }, 3000);
    }
  }
  var getdata = () => {
    retrieveListItems();
  }
  var drawHtml = (dataObj) => {       //Draw the template

    drawTemplate(dataObj);
    parseData(dataObj);
    eventListeners();

    $(".saveBtnGroup").css("display", "none");


  }
  var fromatNumbers = (nStr, precision = 0) => {
    nStr = parseFloat(nStr).toFixed(precision);
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  };
  var drawTemplate = (dataObj) => {
    var domArr = [];
    $.each(dataObj, function (k, v) {
      if (v.type === "textField") {

        if (v.dataType === "string") {
          var str = `<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty ${v.addClass}">
                                    <input class="mdl-textfield__input" type="text" id="${v.jsonName}" ${v.property} ${v.addAttr}>
                                    <label class="mdl-textfield__label" for="${v.jsonName}">${v.displayName}</label>
                                </div>`;
          domArr.push(str);
        } else if (v.dataType === "number") {


          var str = `<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${v.addClass}">
                                    <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)*(\,[0-9]+)?" id="${v.jsonName}" ${v.property} ${v.addAttr}>
                                    <label class="mdl-textfield__label" for="${v.jsonName}">${v.displayName}</label>
                                    <span class="mdl-textfield__error">Input is not a number.</span>
                                </div>`;
          domArr.push(str);

        } else if (v.dataType === "percentage") {

          var str = `<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${v.addClass}">
                                    <input class="mdl-textfield__input" type="text" calcLogic='${JSON.stringify(v.calcLogic)}' pattern="-?[0-9]*(\.[0-9]+)?" id="${v.jsonName}" ${v.property} ${v.addAttr}>
                                    <label class="mdl-textfield__label" for="${v.jsonName}">${v.displayName}</label>
                                    <span class="mdl-textfield__error">Input is not a number.</span>
                                </div>`;
          domArr.push(str);
        } else if (v.dataType === "date") {


        }

      } else if (v.type == "dropDown") {

        var getOptions = (arr) => {
          let tempArr = [];

          $.each(arr, (k, v) => {
            tempArr.push("<option value='" + v + "'>" + v + "</option>");
          });

          return tempArr.join("");
        };

        var str = `<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${v.addClass}" styles="${v.styles}"> 
                                <select class="mdl-textfield__input" id="${v.jsonName}" name="${v.jsonName}">
                                ${getOptions(v.optionArr)}
                                </select>
                                ${v.value =="Response Received"? '<i class="fa fa-folder-open docPopout"></i>':''}
                                <label class="mdl-textfield__label" for="${v.jsonName}">${v.displayName}</label>
                            </div>`
        domArr.push(str);
      } else if (v.type == "textArea") {
        var str = `
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty ${v.addClass} " style="${v.styles}">
          <textarea class="mdl-textfield__input ${v.addClass}" type="text" rows= "3" id="${v.jsonName}"  ${v.property} ${v.addAttr}></textarea>
          <label class="mdl-textfield__label" for="${v.jsonName}">${v.displayName}</label>
        </div>
        `;

        domArr.push(str);
      }
    });
    $("#Opportunity_Form .grid-item").append(domArr.join(""));
  }
  var eventListeners = () => {       // register the events of the template

    $(".mdl-textfield .docPopout").off("click");
    $(".mdl-textfield .docPopout").on("click", () => {
      $(event.target).attr("class");
      window.open("https://ivpdemo.sharepoint.com/Subscription%20Documentation/Forms/AllItems.aspx", '_blank');
    })
    $("#editForm").off("click");
    $("#editForm").on("click", function () {
      $("#editForm").css("display", "none"); //Hide edit btn

      $(".saveBtnGroup").css("display", "block");
      $("#p12").addClass("makeGlow"); //make div glow

      $("#Opportunity_Form").removeClass("disabled"); //make div editable
    });
    $("#saveForm").off("click");
    $("#saveForm").on("click", function () {
      updateListData();


      $(".saveBtnGroup").css("display", "none");
      $("#editForm").css("display", "block");
      $("#p12").removeClass("makeGlow");
      $("#Opportunity_Form").addClass("disabled");

      setTimeout(function () {
        location.reload();
      }, 3000);
    });

    $("#cancelForm").off("click");
    $("#cancelForm").on("click", () => {
      $(".saveBtnGroup").css("display", "none");
      $("#editForm").css("display", "block");
      $("#p12").removeClass("makeGlow");
      $("#Opportunity_Form").addClass("disabled");
    });

    $("#Send_Subs_Doc_Investor").off("change");
    $("#Send_Subs_Doc_Investor").off("change", (event) => {

      if (event.target.value == "Send Revised Document") {

        if (formDirty) {
          $.confirm({
            theme: 'supervan',
            content: "There are unsaved changes in the form.<br> Do you want to save them ?",
            autoClose: 'cancelAction|10000',
            escapeKey: 'cancelAction',
            buttons: {
              confirm: {
                text: 'Save',
                action: function () {
                  updateListData(["Send_Subs_Doc_Investor"]);
                  $.alert('The changes were saved.');
                  setTimeout(function () {
                    location.reload();
                  }, 3000);
                }
              },
              cancelAction: {
                btnClass: 'btn-red',
                text: 'Cancel',
                action: function () {

                  //For removing the edit mode
                  $(".saveBtnGroup").css("display", "none");
                  $("#editForm").css("display", "block");
                  $("#p12").removeClass("makeGlow");
                  $("#Opportunity_Form").addClass("disabled");


                  $.alert('The changes were reverted.');
                  setTimeout(function () {
                    location.reload();
                  }, 3000);
                }
              }
            }
          });
        } else {
          $.confirm({
            title: 'For Investor Revised document',
            type: "dark",
            content: `
            <div class="form-group">
              <label for="comment">Message:</label>
              <textarea class="form-control" rows="3" id="comment"></textarea>
            </div>
            `,
            buttons: {
              SendMsg: {
                text: 'Send',
                btnClass: 'btn-blue',
                action: function () {
                  var input = this.$content.find('#comment');
                  var errorText = this.$content.find('.text-danger');
                  if (!input.val().trim()) {
                    $.alert({
                      content: "Please don't keep the name field empty.",
                      type: 'red'
                    });
                    return false;
                  } else {

                    $("#Add_Comment").val(input.val());
                    updateListData();
                    $.alert("Message sent. Thanks.");
                    setTimeout(function () {
                      location.reload();
                    }, 3000);
                  }
                }
              },
              cancel: function () {
                // do Refresh.
                location.reload();
              }
            }
          });
        }
      }

    });

    $("#p12 .mdl-textfield__input").not("#Send_Subs_Doc_Investor").on("change", () => {
      formDirty = true;
    });
  }
  var parseData = (dataObj) => {      //Parse the data to the form
    let $AddCommentBox = $("#Add_Comment");
    $.each(dataObj, function (k, v) {
      $("#" + v.jsonName).val(v.value);
      $("#" + v.jsonName).parents(".mdl-textfield").addClass("is-dirty");
    });


    $AddCommentBox.attr("placeholder", $AddCommentBox.val());
    $AddCommentBox.val("");
    $("#Opportunity_Form").addClass("disabled");
  };

  return {
    init
  }
})();
$(document).ready(function () {
  oppModule.init();
});
