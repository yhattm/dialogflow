const fetch = require('node-fetch')
const cheerio = require('cheerio')

const getStock = async () => {
    const res = await fetch('https://tw.screener.finance.yahoo.net/future/aa03?fumr=futurepart&opmr=optionpart&random=0.6297693371261759')
    const body = await res.text()
    const $ = cheerio.load(body)
    const selectorPrice = $('td')
    let price = {}
    let priceString = "Stock\n"
    price.FIMTX1 = parseFloat($(selectorPrice[152]).text().replace(',', ''))
    price.FIMTX2 = parseFloat($(selectorPrice[166]).text().replace(',', ''))
    price.FIMTXDiff = price.FIMTX2 - price.FIMTX1
    //console.log(JSON.stringify(price))
    priceString += JSON.stringify(price)
    //console.log(priceString)
    return priceString + "\n"
}

const getOption = async (query) => {
    let target
    let date

    if (!!query.date && !!query.target) {
        // console.log(query)
        date = query.date
        target = query.target
    } else {
        return ""
    }
    const res = await fetch('https://tw.screener.finance.yahoo.net/future/aa03?fumr=futurepart&opmr=optionpart&opym=' + date + '&random=0.6297693371261759')
    const body = await res.text()
    const $ = cheerio.load(body)
    const callPrice = $("td:contains('" + target + "')").prev().prev().prev().prev().prev()
    const putPrice = $("td:contains('" + target + "')").next().next().next()
    const result = {
        call: parseFloat($(callPrice).text()),
        put: parseFloat($(putPrice).text())
    }
    return result
}

const getExchange = async () => {
    const res = await fetch('https://ibank.firstbank.com.tw/NetBank/7/0201.html?sh=none')
    const body = await res.text()
    const $ = cheerio.load(body)

    const selectorPrice = $('td[class="ListTitleFont"]')
    let price = {}
    let action = ""
    let priceString = "$\t Own\t Buy\t Sell\n"
    price.USD = [29.53]
    price.GBP = [38.91]
    price.HKD = [3.904]
    price.AUD = [21.85]
    price.SGD = [22.009]
    price.CAD = [22.354]
    price.JPY = [0.2715]
    price.ZAR = [2.093]
    price.NZD = [20.15]
    price.EUR = [34.65]
    price.CNY = [4.492]
    price.TRY = [4.741]

    price.USD[1] = parseFloat($(selectorPrice[3]).text())
    price.GBP[1] = parseFloat($(selectorPrice[13]).text())
    price.HKD[1] = parseFloat($(selectorPrice[23]).text())
    price.AUD[1] = parseFloat($(selectorPrice[33]).text())
    price.SGD[1] = parseFloat($(selectorPrice[43]).text())
    price.CAD[1] = parseFloat($(selectorPrice[53]).text())
    price.JPY[1] = parseFloat($(selectorPrice[63]).text())
    price.ZAR[1] = parseFloat($(selectorPrice[73]).text())
    price.NZD[1] = parseFloat($(selectorPrice[88]).text())
    price.EUR[1] = parseFloat($(selectorPrice[93]).text())
    price.CNY[1] = parseFloat($(selectorPrice[103]).text())
    price.TRY[1] = parseFloat($(selectorPrice[113]).text())

    price.USD[2] = parseFloat($(selectorPrice[4]).text())
    price.GBP[2] = parseFloat($(selectorPrice[14]).text())
    price.HKD[2] = parseFloat($(selectorPrice[24]).text())
    price.AUD[2] = parseFloat($(selectorPrice[34]).text())
    price.SGD[2] = parseFloat($(selectorPrice[44]).text())
    price.CAD[2] = parseFloat($(selectorPrice[54]).text())
    price.JPY[2] = parseFloat($(selectorPrice[64]).text())
    price.ZAR[2] = parseFloat($(selectorPrice[74]).text())
    price.NZD[2] = parseFloat($(selectorPrice[89]).text())
    price.EUR[2] = parseFloat($(selectorPrice[94]).text())
    price.CNY[2] = parseFloat($(selectorPrice[104]).text())
    price.TRY[2] = parseFloat($(selectorPrice[114]).text())
    //console.log(JSON.stringify(price))

    for (var i in price) {
        let rate = 0.02
        let ownPrice = price[i][0]
        let buyingPrice = price[i][1]
        let sellingPrice = price[i][2]

        priceString += `${i}\t ${ownPrice}\t ${buyingPrice}\t ${sellingPrice}\n`
        if (ownPrice * (1 + rate) < buyingPrice) {
            action += `Sell ${i} ${buyingPrice}\n`
        } else if (ownPrice * (1 - rate) > sellingPrice) {
            action += `Buy ${i} ${sellingPrice}\n`
        }
    }
    //console.log(priceString)
    //console.log(action)
    return priceString + action
}

const getGold = async () => {
    const res = await fetch('https://ibank.firstbank.com.tw/NetBank/7/1501.html?sh=none')
    const body = await res.text()
    const $ = cheerio.load(body)
    var selectorPrice = $('td[class="ListTitleFont"]')
    //console.log($(selectorPrice[2]).text())
    //console.log($(selectorPrice[3]).text())
    var price = {}
    var action = ""
    var priceString = "$\t Own\t Buy\t Sell\n"
    price.GOLD = [1202]
    price.GOLD[1] = parseFloat($(selectorPrice[2]).text().replace(',', ''))
    price.GOLD[2] = parseFloat($(selectorPrice[3]).text().replace(',', ''))
    //console.log(JSON.stringify(price))

    for (var i in price) {
        var rate = 0.02
        var ownPrice = price[i][0]
        var buyingPrice = price[i][1]
        var sellingPrice = price[i][2]

        priceString += `${i}\t ${ownPrice}\t ${buyingPrice}\t ${sellingPrice}\n`
        if (ownPrice * (1 + rate) < buyingPrice) {
            action += `Sell ${i} ${buyingPrice}\n`
        } else if (ownPrice * (1 - rate / 4) > sellingPrice) {
            action += `Buy ${i} ${sellingPrice}\n`
        }
    }
    //console.log(priceString)
    //console.log(action)
    return priceString + action
}

module.exports = {
    getStock,
    getOption,
    getExchange,
    getGold
}
