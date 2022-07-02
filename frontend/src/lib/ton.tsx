import TonWeb from 'tonweb'

function toHexString(byteArray:any) {
    return Array.prototype.map.call(byteArray, function(byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}

const wallet =  async () => {
    const tonweb = new TonWeb()
    const nacl = tonweb.utils.nacl;
    const secret:any = localStorage.getItem("tonopoly_secret")
    
    if (secret) {
        console.log(secret)
        const hexSecret = tonweb.utils.hexToBytes(secret)
        const keyPair = nacl.sign.keyPair.fromSecretKey(hexSecret)
        const wallet = tonweb.wallet.create({publicKey: keyPair.publicKey, wc: 0})
        console.log("TONOPOLY: Wallet was loaded",wallet, keyPair)
        return {wallet, keyPair}
    } else {
        const newKeyPair = TonWeb.utils.nacl.sign.keyPair()
        const wallet = tonweb.wallet.create({publicKey: newKeyPair.publicKey, wc: 0});
        localStorage.setItem('tonopoly_seed', TonWeb.utils.bytesToHex(newKeyPair.secretKey))
        console.log("TONOPOLY: Wallet was created",wallet, newKeyPair);
        return {wallet, newKeyPair}
    }
}

export default wallet;