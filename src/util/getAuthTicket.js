const { authTicketAPI, header } = require("../config/config")

const getAuthTicket = async () => {
    try {
        console.log('[GETTIN AUTH TICKET]')
        const nonce = `timestamp_${Date.now()}`

        const url = authTicketAPI
        const headers = header

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ nonce })
        })

        const result = await response.text()


        try {
            const data = JSON.parse(result)
            return {
                payload: data.payload,
                nonce: nonce
            }
        } catch (error) {
            console.error(error)
        }

    } catch (error) {
        console.error(error)
    }
}

module.exports = { getAuthTicket }