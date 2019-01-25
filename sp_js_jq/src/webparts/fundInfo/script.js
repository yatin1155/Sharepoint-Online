import styles from './FundInfoWebPart.module.scss';
$(document).ready(function () {
    $('#requestss').DataTable({
        'ajax': {
            'url': "../../_api/web/lists/getbytitle('NPA Approval Status')/items?$select=ID,Created,Modified,Product Name",
            'headers': { 'Accept': 'application/json;odata=nometadata' },
            'dataSrc': function (data) {
                return data.value.map(function (item) {
                    return [
                        item.ID,
                        item.Created,
                        item.Category,
                        item.Modified,
                        new Date(item.DueDate),
                        item.ProductName
                    ];
                });
            }
        },
        columnDefs: [{
            targets: 4,
            render: $.fn.dataTable.render.moment('YYYY/MM/DD')
        }]
    });

    $('#requests').DataTable();
    $( "#main").append(`<ol class="${styles["wizard-progress"]} clearfix">
    <li class="${styles["active-step"]}">
        <span class="${styles["step-name"]}">
            Foo
        </span>
        <span class="${styles.visuallyhidden}">Step </span><span class="${styles["step-num"]}">1</span>
    </li>
    <li>
        <span class="${styles["step-name"]}">Bar</span>
        <span class="${styles.visuallyhidden}">Step </span><span class="${styles["step-num"]}">2</span>
    </li>
    <li>
        <span class="${styles["step-name"]}">Baz</span>
        <span class="${styles.visuallyhidden}">Step </span><span class="${styles["step-num"]}">3</span>
    </li>
    <li>
        <span class="${styles["step-name"]}">Quux</span>
        <span class="${styles.visuallyhidden}">Step </span><span class="${styles["step-num"]}">4</span>
    </li>
</ol>`);


});