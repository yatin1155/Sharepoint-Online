
import styles from './GridWebPart.module.scss';

var gridExtention = (function(){
    var table_elm;
    var init = function(){
        
        drawTable();
        handelEvents();
        $("#tableMain_length").remove();
        
        $("#tableMain_filter label input").attr("placeholder","Search...");
        // $(label).html('');
        // $(label).append(input_dt);
        // $(label).prepend("<i class='fa fa-search dt_searchBox' aria-hidden='true'></i>");
        
        applyStyles();
    };

    var applyStyles = () =>{
        $("#tableMain_wrapper  table").css("width",100 * 14+"px" );
        $("#tableMain_wrapper .dataTables_scrollHead th").each((k,v)=>{
            
            $(v).css({
                "width":"100px",
                "padding": "6px"
                // "background-image": "none"
            });
        });
        $("#tableMain tbody td").each((k,v)=>{
            $(v).css({
                "width":"100px",
                "padding": "6px"
            });
        });
    }
    var getData = function(){

    };
    var fromatNumbers = (nStr) =>{
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

    var formatDate = (dateStr) =>{
        let date = new Date(dateStr);
        let finalDate = date.format("dd/MM/yyyy");

        return finalDate;
    }
    var drawTable = function(){
        table_elm = $("#tableMain").DataTable({
            "scrollX": true,
            "order": [[ 9, "desc" ]],
            "autoWidth": false,
            
            "language": {
                "decimal": ".",
                "thousands": ","
            },
            "columnDefs": [
                {
                    "targets": [ 0,12,13 ],
                    "visible": false,
                    "searchable": false
                },
                {
                    "render": function ( data, type, row ) {
                        return fromatNumbers(data);
                    },
                    "targets": [ 7,8,9 ]
                },
                {
                    "render": function ( data, type, row ) {
                        
                        return formatDate(data);
                    },
                    "targets": [10],

                }
            ],
            'ajax': {
                'url': "https://ivpdemo.sharepoint.com/_api/web/lists/getbytitle('Opportunity Dashboard')/items",
                'headers': { 
                    'Accept': 'application/json;odata=nometadata',
                    'odata-version': '' 
                },
                'dataSrc': function (data) {
                    return data.value.map(function (item) {
                        return [
                            item.Id,
                            item.Title,
                            item.Transaction_x0020_Name,
                            item.Investor_x0020_Name,
                            item.Investor_x0020_Id,
                            item.Investor_x0020_Master_x0020_Id,
                            item.Investing_x0020_Entity,
                            item.Requested_x0020_Amount,
                            item.Estimated_x0020_Amount,
                            item.Final_x0020_Amount,
                            item.Pay_x0020_Date,
                            item.From_x0020_Account,
                            item.From_x0020_Account_x0020_Number,
                            item.To_x0020_Account_x0020_Number,
                            item.To_x0020_Account
                        ];
                    });
                }
            }
            
        });
    }


    var handelEvents = function(){

        $('#tableMain tbody').on('click', 'tr', function () {
            var data = table_elm.row( this ).data();
            var queryParam = 'key='+data[0];
            var baseUrl = 'https://ivpdemo.sharepoint.com/SitePages/Dummy-New.aspx?'+queryParam;
            
            // alert( 'You clicked on '+data[2]+'\'s row' );
            window.open(baseUrl,'_blank');
        } );
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
        init:init
    };

})();

$(document).ready (function () {
    gridExtention.init();
});
