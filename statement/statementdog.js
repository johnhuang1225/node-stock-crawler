/**
 * url: 'https://statementdog.com/api/v1/fundamentals/1702/2012/1/2017/4'
 * url: 'https://statementdog.com/api/v1/fundamentals/1702/2012/1/2017/4/?queried_by_user=true&_=1504580464275'
 */
const request = require('request');
const cheerio = require('cheerio');

const stocks = require('../config/stock').stocks;

function Stock(info, pe, pb, cashYield) {
  this.info = info
  this.pe = pe;
  this.pb = pb;
  this.cashYield = cashYield;
  this.getStockData = function() {
    return `公司資料: ${info}\t 本益比: ${this.pe}\t 股價淨值比:${this.pb}\t 殖利率:${this.cashYield}`;
  }
}



stocks.forEach(stock => {
  request({
    url: `https://statementdog.com/api/v1/fundamentals/${stock}/2012/1/2017/4`,
    method: 'GET'
  }, (error, response, body) => {

    if (!error && response.statusCode === 200) {
      var json = JSON.parse(body);

      var info = json[1].data.ticker_name;
      var pe = json[9].data.PE;
      var pb = json[9].data.PB;
      var cashYield = json[9].data.CashYield;

      var stock = new Stock(info, pe, pb, cashYield);
      console.log(stock.getStockData());

      // console.log(`昨日收盤價: ${json[1].data.latest_closing_price}`);
      // console.log(`上月營收: ${json[1].data.latest_yoy_monthly_revenue}`);
      // console.log(`近四季EPS: ${json[1].data.latest_eps4q}`);
      // console.log(`近四季ROE: ${json[1].data.latest_roe4q}`);
    }

  });
});
