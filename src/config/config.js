const header = {
    "Content-Type": "application/json",
    "Origin": "https://testnet.gokite.ai",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://testnet.gokite.ai"
}

const authTicketAPI = 'https://api-kiteai.bonusblock.io/api/auth/get-auth-ticket'
const authAPI = 'https://api-kiteai.bonusblock.io/api/auth/eth'

module.exports = { header, authAPI, authTicketAPI }