const stockModel = require('./models/stock');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('index', { title: 'Stocks watcher'})
    });

    app.get('/stock', (req, res) => {
        let stock = req.query.stock;
        let stockInfo = stockModel.getStockInfo(stock);
        
    });

}
