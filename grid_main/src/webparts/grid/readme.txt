,
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
            },




            "columnDefs": [
                
                {
                    "targets": [ 11 ],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [ 12 ],
                    "visible": false,
                    "searchable": false
                }
            ],