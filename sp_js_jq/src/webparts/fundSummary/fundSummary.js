import styles from './FundSummaryWebPart.module.scss';
var fundSumaryModule = (function(){
    
    var decodeUrl = () =>{

        let URL = window.location.href;
        let filter =  decodeURIComponent(URL.split("?")[1]).split("=");
        return filter;
    };

    var init =()=>{
        getData();
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

    var drawHtml = (data) =>{
        var htmlArr=[];
        $.each(data[0],(k,v)=>{
            if(k == "fund"){
                htmlArr.push(`
                    <div class="attr ll col-xs-10 col-sm-3 col-md-3 col-lg-3 ${styles.ll}" key="${k}" title="${v}">
                        <div class="${styles.toChangeVal}">${v}</div>
                        <div class="${styles.attriName}">Fund </div>
                    </div>
                `);  
            }else if(k =="Opportunity_Name"){
                htmlArr.push(`
                    <div class="attrGreen ${styles.ll} col-xs-10 col-sm-3 col-md-3 col-lg-3" key="${k}" title="${v}">
                        <div class="${styles.toChangeVal}">${v}</div>
                        <div class="${styles.attriName}">Opportunity</div>
                    </div>
                `);
            }else if(k == "Investor_Name"){
                htmlArr.push(`
                    <div class="attrGreen ${styles.ll} col-xs-10 col-sm-2 col-md-2 col-lg-2" key="${k}" title="${v}">
                        <div class="${styles.toChangeVal}">${v}</div>
                        <div class="${styles.attriName}">Investor</div>
                    </div>
                `);
            }else if(k == "High_Inv_Limit"){
                var newvalue = fromatNumbers(v);
                htmlArr.push(`
                    <div class="attrGreen ${styles.ll} col-xs-10 col-sm-2 col-md-2 col-lg-2 ${styles.boldSpan}" key="${k}" title="${v}">
                        <div class="${styles.toChangeVal}">${newvalue}</div>
                        <div class="${styles.attriName}">Max Commitment </div>
                    </div>
                `);

            }else if(k == "Low_Inv_Limit"){
                var newvalue = fromatNumbers(v);
                htmlArr.push(`
                    <div class="attrGreen ${styles.ll} ${styles.last} col-xs-10 col-sm-2 col-md-2 col-lg-2 ${styles.boldSpan}" key="${k}" title="${v}">
                        <div class="${styles.toChangeVal} ">${newvalue}</div>
                        <div class="${styles.attriName}">Low Commitment</div>
                    </div>
                `);
            }
        });
        $("#label0-cardNew").append(htmlArr.join(""));

    }
    var getData=()=>{
        retrieveListItems();
    };
    var retrieveListItems = ()=>{

        var listName = "Investment_Opportunity";
        var filterQuery = decodeUrl();
        
        var URL = "https://ivpdemo.sharepoint.com/_api/web/lists/getbytitle('"+ listName +"')/items?$filter=Opportunity_Name eq '"+ filterQuery[1]+"'"
        return $.ajax({       
            url: URL,   
            type: "GET",
            headers: { 
                'Accept': 'application/json;odata=nometadata',
                    'odata-version': '' 
            },
            success: function(data) { 
                var dataToReturn =  data.value.map(function (item) {
                    return {
                        "fund":item.Fund,
                        "Opportunity_Name": item.Opportunity_Name,
                        "Investor_Name": item.Investor_Name,
                        "High_Inv_Limit": item.High_Inv_Limit,
                        "Low_Inv_Limit" : item.Low_Inv_Limit
                    }
                });
                drawHtml(dataToReturn);
            }

         });
    };

    return{
        init
    }

})();

$(document).ready(function(){
    fundSumaryModule.init();
   
});