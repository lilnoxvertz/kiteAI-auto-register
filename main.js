const { ethers } = require("ethers")
const { LoadWallet } = require("./src/helpers/loadWallet")
const { getAuthTicket } = require("./src/util/getAuthTicket")
const { signMessage } = require("./src/util/signMessage")
const loadWallet = new LoadWallet()

let isRunning = true

const stats = {
    success: 0,
    failed: 0,
    successWallet: [],
    failedWallet: []
}

const delay = (min, max) => {
    const ms = Math.floor(Math.random() * (max - min + 1)) + min;
    const sec = ms / 1000
    console.log(`\nwaiting ${sec} seconds before registering again.`)

    return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateState(status, address) {
    if (status) {
        stats.success++
        stats.successWallet.push(address)
    } else {
        stats.failed++
        stats.failedWallet.push(address)
    }
}

async function startRegisteringWallet(wallet) {
    try {
        const authTicket = await getAuthTicket()
        const register = await signMessage(wallet, authTicket.payload, authTicket.nonce)

        const status = register?.success

        if (status) {
            console.log(`[STATUS]: success`)
            await updateState(status, wallet.address)
        } else {
            console.log(`[STATUS]: failed`)
            await updateState(status, wallet.address)
        }

        await delay(5000, 15000)
    } catch (error) {
        console.error(error)
    }
}

async function processWallet(wallets) {
    for (const wallet of wallets) {
        if (!isRunning) {
            return
        }

        console.clear()
        console.log(`[kiteAI auto register | github.com/lilnoxvertz]`)
        console.log(`success: ${stats.success}`)
        console.log(`failed : ${stats.failed}`)

        const etherWallet = new ethers.Wallet(wallet)
        await startRegisteringWallet(etherWallet)
    }

    isRunning = false

    console.log('[SUCCESS WALLET]\n', stats.successWallet)
    console.log('\n[FAILED WALLET]\n', stats.failedWallet)
}

async function main() {
    try {
        const wallets = loadWallet.load()

        if (wallets.length === 0) {
            console.log('no private key at privateKey.txt!')
            process.exit(1)
        }

        await processWallet(wallets)
    } catch (error) {
        console.error(error)
    }
}

main()
