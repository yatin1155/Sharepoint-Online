var gridExtention = (function () {
  var table_elm;
  var init = function () {

    getUserRole();

  };

  var dataTable_wrapper = (roleInfo) => {

    drawTable(roleInfo);
    handelEvents();
    $("#tableMain_length").remove();

    $("#tableMain_filter label input").attr("placeholder", "Enter Name...");
    // $(label).html('');
    // $(label).append(input_dt);
    // $(label).prepend("<i class='fa fa-search dt_searchBox' aria-hidden='true'></i>");

    applyStyles();
  }
  var applyStyles = () => {
    $("#tableMain_wrapper  table").css("width", 100 * 14 + "px");
    $("#tableMain_wrapper .dataTables_scrollHead th").each((k, v) => {

      $(v).css({
        "width": "100px",
        "padding": "6px"
        // "background-image": "none"
      });
    });
    $("#tableMain tbody td").each((k, v) => {
      $(v).css({
        "width": "100px",
        "padding": "6px"
      });
    });
  }
  var getData = function () {

  };
  var fromatNumbers = (nStr) => {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return "$" + x1 + x2;

  };

  var formatDate = (dateStr) => {
    // "2019-01-01T08:00:00Z"
    var date = new Date(dateStr);
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    var finalDate = day + "/" + month + "/" + year;

    return finalDate;
  }
  var getUserRole = () => {

    var roleInfo = [];
    (function getCurrentUser() {
      $.ajax({
        url: "https://ivpdemo.sharepoint.com/_api/web/CurrentUser",
        method: "GET",
        headers: {
          "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
          console.log(data.d.Id);
          getCurrentUserGroupColl(data.d.Id);
        },
        error: function (data) {
          failure(data);
        }
      });

    })();

    function getCurrentUserGroupColl(UserID) {
      $.ajax({
        url: "https://ivpdemo.sharepoint.com/_api/web/GetUserById(" + UserID + ")/Groups",
        method: "GET",
        headers: {
          "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
          data = data["d"]["results"]
          $.each(data, function (k, v) {
            roleInfo.push(v["LoginName"]);

          });
          dataTable_wrapper(roleInfo);
        }
      });
    }

  };

  var checkRolesMapping = (roles) => {

    var mainRoles = ["Legal Group", "Treasury", "TPA Group"];
    var str;
    $.each(mainRoles, (k, v) => {
      if (roles.includes(v)) {
        str = v;
      }
    });
    return str;
  };
  var drawTable = function (roles) {

    var role = checkRolesMapping(roles);
    var URlStr;
    if (role == undefined) {
        URlStr = "https://ivpdemo.sharepoint.com/_api/web/lists/getbytitle('Investment_Opportunity')/items";
    } else {
        URlStr ="https://ivpdemo.sharepoint.com/_api/web/lists/getbytitle('Investment_Opportunity')/items?$filter=PendingStage eq '"+role+"'"
    }

    table_elm = $("#tableMain").DataTable({
      "scrollX": true,
      "order": [
        [7, "desc"]
      ],
      "autoWidth": false,
      "language": {
        "decimal": ".",
        "thousands": ","
      },

      'ajax': {
        'url': URlStr,
        'headers': {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        },
        'dataSrc': function (data) {
          return data.value.map(function (item) {
            return [
              item.Id,
              item.Opportunity_Name,
              item.Fund,
              item.Fund_Share_Class,
              item.Tier,
              item.Investor_Name,
              item.Probability,
              item.High_Inv_Limit,
              item.Low_Inv_Limit,
              item.Date,
              item.Send_Subs_Doc_Investor
            ];
          });
        }
      },
      "columnDefs": [{
          "targets": [0],
          "visible": false,
          "searchable": false
        },
        {
          "render": function (data, type, row) {
            return fromatNumbers(data);
          },
          "targets": [7, 8]
        },
        {
          "render": function (data, type, row) {

            return formatDate(data);
          },
          "targets": [9],

        },
        {
          "render": function (data, type, row) {

            return "<i class='fa fa-external-link popOut' aria-hidden='true'></i>" + data;
          },
          "targets": 1
        }
      ]

    });

    $("#tableMain_wrapper").prepend("<span class='headerName'>Opportunity Dashboard</span>")

  }


  var handelEvents = function () {

    $('#tableMain tbody').on('click', '.popOut', function () {
      var tr = $(this).closest("tr");
      var data = table_elm.row(tr).data();

      var queryParam = 'OpName=' + data[1];

      var baseUrl = 'https://ivpdemo.sharepoint.com/SitePages/Opportunity-Grid.aspx?' + encodeURIComponent(queryParam);

      // alert( 'You clicked on '+data[2]+'\'s row' );
      window.open(baseUrl, '_blank');
    });
    $('#tableMain tbody').on('mouseout', 'tr', function () {
      $(this).removeClass("activeHover");
    });

    $('#tableMain tbody').on('mouseover', 'tr', function () {
      $(this).addClass("activeHover");
    });


    // table_elm.on( 'order.dt search.dt', function () {
    //     table_elm.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
    //         debugger;
    //         cell.innerHTML = i+1;
    //     } );
    // } ).draw();

  }

  return {
    init: init
  };

})();

$(document).ready(function () {
  gridExtention.init();
});
