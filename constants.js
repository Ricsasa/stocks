const API_URL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22#STOCK#%22)&format=json&env=store://datatables.org/alltableswithkeys"
const REPLACE_STRING = "#STOCK#";

module.exports = {
    API_URL,
    REPLACE_STRING
}
