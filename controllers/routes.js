const stockModel = require('../models/stock');
const { API_URL, REPLACE_STRING } = require('../constants');
const lib = require('https');


module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('index', { title: 'Stocks watcher' })
    });

    app.get('/stock', (req, res) => {
        let stock = req.query.stock;
        getStockInfo(stock).then((stockInfo) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(stockInfo));
        })
    });

    app.get('/stocks', (req, res) => {
        let stocks = req.query.stocks;
        if(stocks) {
            getAllStocks(stocks).then((stocksInfo) => {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(stocksInfo));
            });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify([]));
        }
    });
}

const getAllStocks = (stocks) => {
    let promisesArray = stocks.map((stock) => {
        return getStockInfo(stock).then((stockInfo) => {
            return stockInfo;            
        });
    });
    return Promise.all(promisesArray);
}

const getStockInfo = (stock) => {
    let stockURL = parseApiUrl(stock);
    return new Promise((resolve, reject) => {
        fetchStockInfo(stockURL)
            .then((rawString) => parseStockInfo(rawString))
            .then((stockObject) => {
                saveStockInfo(stockObject);
                resolve(stockObject);
            })
    });
}

const fetchStockInfo = (url) => {
    return new Promise((resolve, reject) => {
        const request = lib.get(url, (response) => {
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error('Failed to load resource, status code: ' + response.statusCode));
            }
            const body = [];
            response.on('data', (chunk) => body.push(chunk));
            response.on('end', () => resolve(body.join('')))
        });

        request.on('error', (err) => reject(err));
    });
}

const parseStockInfo = (rawString) => {
    let object = JSON.parse(rawString);
    return new Promise((resolve, reject) => {
        resolve({
            symbol: object.query.results.quote.Symbol,
            created: object.query.created,
            price: object.query.results.quote.LastTradePriceOnly
        })
    })
}

const saveStockInfo = (stockObject) => {
    new stockModel(stockObject).save();
}

const parseApiUrl = (stock) => {
    return API_URL.replace(REPLACE_STRING, stock.toUpperCase());
}