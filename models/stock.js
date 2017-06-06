const { API_URL, REPLACE_STRING } = require('../constants');
const lib = require('https');

module.exports = {
    getStockInfo: (stock) => {
        let stockURL = parseApiUrl(stock);
        fetchStockInfo(stockURL)
            .then((rawString) => parseStockInfo(rawString))
            
    }
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
    console.log(object.query.count);
}

const saveStockInfo = (stock) => {

}

//?
const getLatestStockInfo = (stock) => {

}

const deleteStockInfo = (stock) => {

}

const parseApiUrl = (stock) => {
    return API_URL.replace(REPLACE_STRING, stock);
}