var leadFormModule = (function () {

  var __REQUESTDIGEST;
  var itemProp = {};
  var gHeaders = [{
      "jsonName": "Title",
      "type": "textField",
      "dataType": "string",
      "displayName": "Opportunity Name"
    },
    {
      "jsonName": "Fund_x0020_Interest",
      "type": "dropDown",
      "dataType": "string",
      "displayName": "Fund Interest",
      "optionArr": ["Fund IVP Alpha", "Fund IVP Beta", "Fund IVP Gamma"],
      "multiSelect": true,
      "addClass":"is-upgraded is-dirty"
    },
    {
      "jsonName": "Investor_x0020_Name",
      "type": "textField",
      "dataType": "string",
      "displayName": "Investor Name"
    },
    {
      "jsonName": "Investing_Entity",
      "type": "textField",
      "dataType": "string",
      "displayName": "Investor Entity"
    },
    {
      "jsonName": "Country_Residence_Incorporation",
      "type": "textField",
      "dataType": "string",
      "displayName": "Country Residence Incorporation"
    },
    {
      "jsonName": "Lead_x0020_Owner",
      "type": "textField",
      "dataType": "string",
      "displayName": "Lead Owner"
    }, {
      "jsonName": "Classification",
      "type": "dropDown",
      "dataType": "string",
      "displayName": "Investor Classification",
      "optionArr": ["HNI Individual Adult",
        "HNI Individuals Minor",
        "Corporation",
        "Limited Liability Company",
        "IRA",
        "Endowment",
        "Public Foundation",
        "Private Foundation",
        "Investment Partnership",
        "Investment Trust or Business Trust",
        "Other Employee Benefit Plan/Trust"
      ]
    },
    {
      "jsonName": "Tax_Exemption_Status_US",
      "type": "dropDown",
      "dataType": "string",
      "displayName": "Tax Exemption Status",
      "optionArr": ["Exempt", "Taxable", "Not Applicable"]
    },
    {
      "jsonName": "Investor_Email",
      "type": "textField",
      "dataType": "email",
      "displayName": "Investor Email",
      "errortext": "Please enter a valid e-mail."
    },
    {
      "jsonName": "Low",
      "type": "textField",
      "dataType": "number",
      "displayName": "Low Inv Limit",
      "errortext": "Please enter a valid Number."
    },
    {
      "jsonName": "High_Inv_Limit",
      "type": "textField",
      "dataType": "number",
      "displayName": "High Inv Limit",
      "errortext": "Please enter a valid Number."
    },
    {
      "jsonName": "Probability",
      "type": "textField",
      "dataType": "number",
      "displayName": "Probability",
      "errortext": "Please enter a valid Number."
    },
    {
      "jsonName": "Date",
      "type": "textField",
      "dataType": "date",
      "displayName": "Date",
      "errortext": "Please enter a valid Date."
    }
  ];
  var init = () => {

    getAllData(); //Temp for checking the jsonName of all the data elements

    drawTemplate();
    postLoadFeature();
    eventListeners();
  };
  var postLoadFeature=()=>{

    
  }
  var drawTemplate = () => {

    var domArr = [];
    $.each(gHeaders, function (k, v) {
      if (v.type === "textField") {
        if (v.dataType === "string") {

          let sDom = `
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input"  type="text" id="${v.jsonName}" >
                <label class="mdl-textfield__label" for="${v.jsonName}">${v.displayName}</label>
                <span class="mdl-textfield__error">${v.errortext}</span>
            </div>
            `;
          domArr.push(sDom);
        } else if (v.dataType === "number") {
          let sDom = `
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="number" pattern="-?[0-9]*(\.[0-9]+)?" id="${v.jsonName}">
            <label class="mdl-textfield__label" for="${v.jsonName}">${v.displayName}</label>
            <span class="mdl-textfield__error">${v.errortext}</span>
          </div>
          `;
          domArr.push(sDom);
        } else if (v.dataType === "email") {
          let sDom = `
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input"  type="email" id="${v.jsonName}" >
              <label class="mdl-textfield__label" for="${v.jsonName}">${v.displayName}</label>
              <span class="mdl-textfield__error">${v.errortext}</span>
          </div>
          `;
          domArr.push(sDom);

        } else if (v.dataType === "date") {
          let sDom = `
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" jName='${v.jsonName}'>
              <input class="mdl-textfield__input"  type="date" id="${v.jsonName}" >
              <label class="mdl-textfield__label" for="${v.jsonName}">${v.displayName}</label>
              <span class="mdl-textfield__error">${v.errortext}</span>
          </div>
          `;
          domArr.push(sDom);
        }

      } else if (v.type == "dropDown") {
        var getOptions = (arr) => {
          let tempArr = [];
          if(!v.multiSelect)
            tempArr.push("<option value=''></option>");
          $.each(arr, (k, v) => {
            tempArr.push("<option value='" + v + "'>" + v + "</option>");
          });

          return tempArr.join("");
        };
        var str = `<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${v.addClass}" styles="${v.styles}"> 
                        <select class="mdl-textfield__input" id="${v.jsonName}" name="${v.jsonName}" ${v.multiSelect == true ? 'multiple=true':''} >
                        ${getOptions(v.optionArr)}
                        </select>
                        <label class="mdl-textfield__label" for="${v.jsonName}">${v.displayName}</label>
                    </div>`
        domArr.push(str);
      }

    });

    $("#p13Lead .grid-item").append(domArr.join(""));
  };
  var getAllData = () => {
    var listName = "Lead_Details";
    var URL = "https://ivpdemo.sharepoint.com/_api/web/lists/getbytitle('" + listName + "')/items";
    return $.ajax({
      url: URL,
      type: "GET",
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'odata-version': ''
      },
      success: function (data) {
        console.log(data);
      }
    });
  }

  var getFormValues = () => {
    gHeaders.map((obj) => {
      var elmValue = $("#" + obj.jsonName).val();
      if (obj.dataType == "date" && elmValue !== "") {
        let date = new Date(elmValue);
        elmValue = date.toISOString();
      } else if (obj.multiSelect) {
        debugger;
        elmValue = {"results": elmValue};
       
      } else if (obj.dataType == "number") {
        elmValue = +elmValue;
      }

      obj["value"] = elmValue;
      itemProp[obj.jsonName] = elmValue;
      return obj;
    });
    console.log(itemProp);
  };

  var updateList = () => {

    var getToken = () => {
      $.ajax({
        url: "https://ivpdemo.sharepoint.com/_api/contextinfo",
        method: "POST",
        headers: {
          "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
          __REQUESTDIGEST = data.d.GetContextWebInformation.FormDigestValue;
          makeRequest();
        },
        error: function (data, errorCode, errorMessage) {
          alert(errorMessage)
        }
      });
    };

    var makeRequest = () => {

      function createListItem(siteUrl, listName, itemProperties, success, failure) {

        var itemType = getItemTypeForListName(listName);
        itemProperties["__metadata"] = {
          "type": itemType
        };
        var URL = siteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items";
        $.ajax({
          url: URL,
          type: "POST",
          contentType: "application/json;odata=verbose",
          data: JSON.stringify(itemProperties),
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": __REQUESTDIGEST,
            // "Accept": "application/json; odata=verbose",
            // "content-type": "application/json; odata=verbose",
            // "X-RequestDigest": __REQUESTDIGEST,
            // "content-length": itemProperties.length,
            // "X-HTTP-Method": "MERGE",
            // "IF-MATCH": "*"
          },
          success: function (data) {
            // alert("success")
            success(data.d);
          },
          error: function (data) {
            // alert("failure")
            failure(data);
          }
        });
      }


      // Get List Item Type metadata
      function getItemTypeForListName(name) {
        return "SP.Data.Lead_x005f_DetailsListItem";
        // return "SP.Data.DisplayListListItem";
        // return "SP.Data." + name.charAt(0).toUpperCase() + name.split("_").join("_x005F_").slice(1) + "ListItem";
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

          resetForm();
        }, 3000);
      }
      createListItem("https://ivpdemo.sharepoint.com", "Lead_Details", itemProp, printInfo, logError);
      // itemProp = {"What_x0020_is_x0020_your_x0020_n":"hello world"}
      // createListItem("https://ivpdemo.sharepoint.com", "DisplayList", itemProp,printInfo, logError);
    };

    getToken();
  };
  var resetForm =()=>{
    gHeaders.map((obj) => {
      if (obj.multiSelect) {
        $("#" + obj.jsonName).select2("val"," ")
      }else{
        $("#" + obj.jsonName).val("");
      }
       

    });
  };

  var eventListeners = () => {

    $("#saveForm").off("click");
    $("#saveForm").on("click", () => {
      getFormValues();
      updateList();
    });

    $("#cancelForm").off("click");
    $("#cancelForm").on("click", () => {
      resetForm();
    });

    
  }



  return {
    init
  }
})();


$(document).ready(function () {
  leadFormModule.init();
});
$(window).load(function () {
 
  $("#Fund_x0020_Interest").select2({"placeholder":"Select Fund Name.."});
  $("#Fund_x0020_Interest").closest(".mdl-textfield").find(".select2-selection--multiple").addClass("randomShit");
  $("#Fund_x0020_Interest").closest(".mdl-textfield").addClass("is-upgraded is-dirty");
  
});