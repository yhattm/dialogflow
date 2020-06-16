const fetch = require('node-fetch')

const httpGet = async (url) => {
    const res = await fetch(url)
    const resJSON = await res.json()
	return resJSON
}

module.exports = httpGet