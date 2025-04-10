const { authAPI, header } = require("../config/config")

const signMessage = async (wallet, authTicket, nonce) => {
    try {
        const signature = await wallet.signMessage(authTicket)
        console.log(`[SIGNING WALLET]`)
        console.log(`wallet address: ${wallet.address}`)
        console.log(`signed message: ${signature}`)

        const response = await fetch(authAPI, {
            method: 'POST',
            headers: header,
            body: JSON.stringify({
                blockchainName: "ethereum",
                nonce: nonce,
                referralId: 'optionalReferral',
                signedMessage: signature
            })
        })

        const result = await response.text()

        try {
            const data = JSON.parse(result)
            return data
        } catch (error) {
            console.error(error)
        }

    } catch (error) {
        console.error(error)
    }
}

module.exports = { signMessage }