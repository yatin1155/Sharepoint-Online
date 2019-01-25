$(document).ready(function () {
    $('#requests').DataTable({
        'ajax': {
            'url': "https://ivpdemo.sharepoint.com/_api/web/lists/getbytitle('webpartList')/items?$select=Product_x0020_Name,Title",
            'headers': { 
                'Accept': 'application/json;odata=nometadata',
                'odata-version': '' 
            },
            'dataSrc': function (data) {
                debugger;
                return data.value.map(function (item) {
                    return [
                        item.Product_x0020_Name,
                        item.Title
                    ];
                });
            }
        }
    });
});

// 'url': "https://ivpdemo.sharepoint.com/_api/web/lists/getbytitle('webpartList')/items?$select=Product_x0020_Name,Title"
// 'url': "https://ivpdemo.sharepoint.com/_api/web/lists/getbytitle('webpartList')/items('1')"