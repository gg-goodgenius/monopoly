
const gameProfile =  async () => {
    const TonWeb = require('tonweb')
    const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', {apiKey: '75ce0190fa40d05f24ca4641a45b686cfe50715a1e3c859bc698157c03b36eac'}));
    const nacl = tonweb.utils.nacl;
    const secret:any = localStorage.getItem("tonopoly_secret")
    
    if (secret) {
        const hexSecret = tonweb.utils.hexToBytes(secret)
        const keyPair = nacl.sign.keyPair.fromSecretKey(hexSecret)
        const wallet = tonweb.wallet.create({publicKey: keyPair.publicKey, wc: 0})
        const address = (await wallet.getAddress()).toString()
        const shortAddress = address.slice(0, 8) + "..." + address.slice(-5)
        const balance = tonweb.utils.fromNano(await tonweb.getBalance(address))
        const hexPublicKey = tonweb.utils.bytesToHex(keyPair.publicKey)
        console.log("TONOPOLY: Wallet was loaded",wallet, keyPair, address, balance, shortAddress)
        return {wallet, keys: keyPair, address, balance, shortAddress, tonweb, hexPublicKey}
    } else {
        const newKeyPair = TonWeb.utils.nacl.sign.keyPair()
        const wallet = tonweb.wallet.create({publicKey: newKeyPair.publicKey, wc: 0});
        localStorage.setItem('tonopoly_secret', TonWeb.utils.bytesToHex(newKeyPair.secretKey))
        const address = (await wallet.getAddress()).toString()
        const shortAddress = address.slice(0, 8) + "..." + address.slice(-5)
        const balance = tonweb.utils.fromNano(await tonweb.getBalance(address))
        const hexPublicKey = tonweb.utils.bytesToHex(newKeyPair.publicKey)
        console.log("TONOPOLY: Wallet was created",wallet, newKeyPair, address, balance, shortAddress)
        return {wallet, keys: newKeyPair, address, balance, shortAddress, tonweb, hexPublicKey}
    }
}


export default gameProfile;