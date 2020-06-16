const httpGet = require('./httpGet')

const toCompany = async () => {
    let [
        bus57,
        bus214d,
        bus214,
        bus241,
        bus275,
        bus311,
        bus793,
        bus796,
        bus908,
        bus921,
        bus950
    ] = [
        await httpGet("http://routes.ntpc.com.tw/ntpcebus/Js/RouteInfo?rid=16468&sec=1"),
        await httpGet("http://www.e-bus.taipei.gov.tw/newmap/Js/RouteInfo?rid=15562&sec=1"),
        await httpGet("http://www.e-bus.taipei.gov.tw/newmap/Js/RouteInfo?rid=15561&sec=1"),
        await httpGet("http://routes.ntpc.com.tw/ntpcebus/Js/RouteInfo?rid=10173&sec=1"),
        await httpGet("http://routes.ntpc.com.tw/ntpcebus/Js/RouteInfo?rid=16581&sec=1"),
        await httpGet("http://www.e-bus.taipei.gov.tw/newmap/Js/RouteInfo?rid=15563&sec=1"),
        await httpGet("http://routes.5284.com.tw/ntpcebus/Js/RouteInfo?rid=16689&sec=1"),
        await httpGet("http://routes.ntpc.com.tw/ntpcebus/Js/RouteInfo?rid=16691&sec=0"),
        await httpGet("http://routes.ntpc.com.tw/ntpcebus/Js/RouteInfo?rid=16585&sec=1"),
        await httpGet("http://routes.ntpc.com.tw/ntpcebus/Js/RouteInfo?rid=16664&sec=1"),
        await httpGet("http://www.e-bus.taipei.gov.tw/newmap/Js/RouteInfo?rid=17390&sec=1")
    ]
    let to = {
        bus57: bus57.Etas[16],
        bus214d: bus214d.Etas[24],
        bus214: bus214.Etas[57],
        bus241: bus241.Etas[45],
        bus275: bus275.Etas[37],
        bus311: bus311.Etas[34],
        bus793: bus793.Etas[36],
        bus796: bus796.Etas[38],
        bus908: bus908.Etas[0],
        bus921: bus921.Etas[0],
        bus950: bus950.Etas[18]
    }
    let bus = {
        to: to
    }
    let busStr = `永安市場：
	57: ${bus.to.bus57.eta}
	214d: ${bus.to.bus214d.eta}
	950: ${bus.to.bus950.eta}
雙和里：
	214: ${bus.to.bus214.eta}
	241: ${bus.to.bus241.eta}
	311: ${bus.to.bus311.eta}
	793: ${bus.to.bus793.eta}
	796: ${bus.to.bus796.eta}
景安：
	275: ${bus.to.bus275.eta}
	908: ${bus.to.bus908.eta}
	921: ${bus.to.bus921.eta}
	`
    return busStr
}

const fromCompany = async () => {
    let [
        bus57,
        bus214d,
        bus214,
        bus241,
        bus275,
        bus311,
        bus793,
        bus796,
        bus908,
        bus921,
        bus950
    ] = [
        await httpGet("http://routes.ntpc.com.tw/ntpcebus/Js/RouteInfo?rid=16468&sec=0"),
        await httpGet("http://www.e-bus.taipei.gov.tw/newmap/Js/RouteInfo?rid=15562&sec=0"),
        await httpGet("http://www.e-bus.taipei.gov.tw/newmap/Js/RouteInfo?rid=15561&sec=0"),
        await httpGet("http://routes.ntpc.com.tw/ntpcebus/Js/RouteInfo?rid=10173&sec=0"),
        await httpGet("http://routes.ntpc.com.tw/ntpcebus/Js/RouteInfo?rid=16581&sec=0"),
        await httpGet("http://www.e-bus.taipei.gov.tw/newmap/Js/RouteInfo?rid=15563&sec=0"),
        await httpGet("http://routes.5284.com.tw/ntpcebus/Js/RouteInfo?rid=16689&sec=0"),
        await httpGet("http://routes.ntpc.com.tw/ntpcebus/Js/RouteInfo?rid=16691&sec=1"),
        await httpGet("http://routes.ntpc.com.tw/ntpcebus/Js/RouteInfo?rid=16585&sec=0"),
        await httpGet("http://routes.ntpc.com.tw/ntpcebus/Js/RouteInfo?rid=16664&sec=0"),
        await httpGet("http://www.e-bus.taipei.gov.tw/newmap/Js/RouteInfo?rid=17390&sec=0")
    ]

    let from = {
        bus57: bus57.Etas[21],
        bus214d: bus214d.Etas[4],
        bus214: bus214.Etas[4],
        bus241: bus241.Etas[3],
        bus275: bus275.Etas[16],
        bus311: bus311.Etas[4],
        bus793: bus793.Etas[36],
        bus796: bus796.Etas[20],
        bus908: bus908.Etas[11],
        bus921: bus921.Etas[21],
        bus950: bus950.Etas[5]
    }
    let bus = {
        from: from
    }
    let busStr = `
台貿一村:
	57: ${bus.from.bus57.eta}
	214d: ${bus.from.bus214d.eta}
	214: ${bus.from.bus214.eta}
	275: ${bus.from.bus275.eta}
	241: ${bus.from.bus241.eta}
	311: ${bus.from.bus311.eta}
	793: ${bus.from.bus793.eta}
	796: ${bus.from.bus796.eta}
	908: ${bus.from.bus908.eta}
	921: ${bus.from.bus921.eta}
	950: ${bus.from.bus950.eta}
	`
    return busStr
}

module.exports = {
    toCompany,
    fromCompany
}