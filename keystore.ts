import Wallet from 'ethereumjs-wallet'

const fs = require("fs")

const convertPrivKeyToKeystore = async () => {
    const privateKey = process.argv[2]
    const password = process.argv[3]

    const pk = Buffer.from(privateKey, 'hex')
    const account = Wallet.fromPrivateKey(pk)

    const jsonContent = JSON.stringify(await account.toV3(password))
    
    const address = account.getAddress().toString('hex')
    const fileName = `UTC--${new Date().toISOString().replace(/[:]/g, '-')}--${address}`
    fs.writeFileSync(fileName, jsonContent)
}

convertPrivKeyToKeystore()