const fetch = require('node-fetch')
const cheerio = require('cheerio')

const getPrice = async () => {
    const res = await fetch('http://m.gas.goodlife.tw')
    const body = await res.text()
    const $ = cheerio.load(body)
    var date = $('p', '#gas-price')
    var gasPrice = $('h2', '#gas-price')
    //console.log(gasPrice.text())
    //console.log(gasPrice.html())
    //console.log(gasPrice.attr('class'))
    //console.log(gasPrice.children('em').html())
    return date.text() + gasPrice.text() + "\n"
}

module.exports = {
    getPrice
}