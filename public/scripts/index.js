var stockWatcher = {
    createOrReplaceCard: function (data) {
        var parsedDate = data.created.replace('T', ' ').replace('Z', '');
        var element = $(".card:contains('" + data.symbol + "')");
        if (element.length == 0) {
            var element = $('#card-template').html();
            var replaced = element.replace('{{symbol}}', data.symbol)
                .replace('{{price}}', data.price)
                .replace('{{date}}', parsedDate);
            $('#card-container').append($(replaced));
        } else {
            element.find('.stock-title').html(data.symbol);
            element.find('.price').html(data.price);
            element.find('.date').html(parsedDate);
        }
    },

    refreshAll: function(){        
        $.ajax({
            url: "/stocks",
            type: "GET",
            data: {
                stocks: stockWatcher.getStocks()
            },
            beforeSend: function () {
                stockWatcher.toggleLoader();
            },
            complete: function () {
                stockWatcher.toggleLoader();
            }
        })
        .done(function(data) {
            $(data).each( function(i,e){
                stockWatcher.createOrReplaceCard(e);
            });
        });
    },

    toggleLoader: function() {
        $('#loader').toggle();
    },

    getStocks: function(){
        var stocks = [];
        $('.stock-title').each( function(i,e) {
            stocks.push( $(e).text() );
        });
        return stocks;
    }

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
            },
            beforeSend: function () {
                stockWatcher.toggleLoader();
            },
            complete: function () {
                stockWatcher.toggleLoader();
            }
        })
        .done(function (data) {
            stockWatcher.createOrReplaceCard(data);
            $('input[type="text"]').val('');
        });

    })

    $('#refreshAll').click(stockWatcher.refreshAll);

    setInterval(stockWatcher.refreshAll, 5*60000)
    
});
