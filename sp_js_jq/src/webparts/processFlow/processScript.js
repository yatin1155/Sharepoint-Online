import styles from "./ProcessFlowWebPart.module.scss";

var processModule = (function () {

  var processListName = "Status_List";
  var decodeUrl = () => {

    let URL = window.location.href;
    let filter = decodeURIComponent(URL.split("?")[1]).split("=");
    return filter;
  };
  var processArr = [
    {
        "headerName": "New Opportunity",
        "jsonName": "Opportunity_Created",
        "Tooltip": null,
        "fontIcon": "fa-usd",
        "status": null
    },
    {
        "headerName": "Documents Status",
        "jsonName": "Subs_Documents_Recd",
        "Tooltip": null,
        "fontIcon": "fa-file",
        "status": null
    },
    {
        "headerName": "Legal Review",
        "jsonName": "Legal_Review",
        "Tooltip": null,
        "fontIcon": "fa-gavel",
        "status": null
    },
    {
        "headerName": "External Review",
        "jsonName": "TPA_Review",
        "Tooltip": null,
        "fontIcon": "fa-book",
        "status": null
    },
    {
        "headerName": "Final Status",
        "jsonName": "FinalStatus",
        "Tooltip": null,
        "fontIcon": "fa-thumbs-up",
        "status": null
    }
];
  var getJsonName = (headers) => {
    var jsonArr = headers.map((obj) => {
      return obj.jsonName;
    });
    return jsonArr;
  };

  var modifyProcessArr = (itemObj) => {
    processArr = processArr.map((obj) => {
      obj["status"] = itemObj[obj["jsonName"]];
      obj["Tooltip"] =( itemObj[obj["jsonName"]] == "Remaining")? "To be Initiated": obj["status"];
      return obj;
    });

    drawHtml();

  }
  var drawHtml = () => {
    
    let domArr = [];

    $.each(processArr,(key,value)=>{
        var str = `
            <div class="${styles.li} ${value.status ==="Remaining" ? styles.disabled :""} ${value.status ==="Rejected" ? styles.rejected :""} ${value.status === "InProgress" || value.status ==="Rejected"? "activeTooltip":""}" tooltip="${value.Tooltip}" id="${value.jsonName}_Process">
            <div Class="${styles.dispText}">
                <i class="fa ${value.fontIcon} fa-3x" aria-hidden="true" style="text-align: center;"></i>
            </div>
            <div class="${styles.alt}" href="#1"></div>
            <span class="${styles.counter}"></span>
            <span class="${styles.IconTxt}">${value.headerName}</span>
            </div>`;
            domArr.push(str);
    });

    $(".portletProcess .scrollBody").append(domArr.join(""));

  }
  var getProcessData = () => {
    var filterQuery = decodeUrl();

    var URL = "https://ivpdemo.sharepoint.com/_api/web/lists/getbytitle('" + processListName + "')/items?$filter=Opportunity_Name eq '" + filterQuery[1] + "'"
    return $.ajax({
      url: URL,
      type: "GET",
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'odata-version': ''
      },
      success: function (data) {
        var JnName = getJsonName(processArr);
        var finalArr = {};
        var dataToReturn = data.value.map(function (item) {
          $.each(JnName, (key, value) => {
            finalArr[value] = item[value]
          });
          return finalArr;
        });

        modifyProcessArr(finalArr);
      }

    });
  }
  var init = () => {
    getProcessData();
  }
  return {
    init
  }
})();

$(document).ready(function () {

  processModule.init();

  var btnPrev = $(`.${styles.scroll_arrow_prev}`)
  var btnNext = $(`.${styles.scroll_arrow_next}`)
  var processDiv = $(`.${styles.ul}`);

  $(".scrollBody").children().last().addClass(`${styles.disabled}`)
  // $(btnPrev).off("click");
  // $(btnPrev).on("click",()=>{
  //     let parentDiv = $(processDiv).offsetWidth;
  //     let childElm_width = ($(processDiv).children().length) * ($(processDiv).children()[0].offsetWidth)


  //    $(processDiv).scrollLeft(childElm_width/4);
  // });
  // $(btnNext).off("click");
  // $(btnNext).on("click",()=>{


  //     $(processDiv).scrollLeft();
  // });

});
