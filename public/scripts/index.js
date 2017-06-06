var stockWatcher = {

}

$(document).ready(function () {

    $('#searchStockButton').prop('disabled', true);

    $('input[type="text"]').keyup(function () {
        var state = $(this).val() != '' ? false : true;
        $('input[type="submit"]').prop('disabled', state);
    });

    $('#searchStockForm').submit(function (event) {
        event.preventDefault();
        var stock = $('input[type="text"]').val();
        $.ajax({
            url: "/stock",
            type: "GET",
            data: {
                stock: stock
            }
        })
        
    })
});