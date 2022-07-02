import TonWeb from 'tonweb'

const wallet =  async () => {
    const tonweb = new TonWeb()
    // const nacl = tonweb.utils.nacl;
    // const sPublicKey:any = localStorage.getItem('tonopoly_public_key') 
    // const sSecretKey:any = localStorage.getItem('tonopoly_secret_key') 
    
    // if (sPublicKey && sSecretKey) {
    //     const publicKey = tonweb.utils.hexToBytes(sPublicKey)
    //     const secretKey = tonweb.utils.hexToBytes(sSecretKey)
    //     const keyPair = nacl.sign.keyPair.fromSeed(secretKey)
    //     const wallet = tonweb.wallet.create({publicKey: publicKey, wc: 0})
    //     console.log("TONOPOLY: Wallet was loaded",wallet, keyPair);
    //     return {wallet, keyPair}
    // } else {
    //     const keyPair = nacl.sign.keyPair();
    //     const wallet = tonweb.wallet.create({publicKey: keyPair.publicKey, wc: 0});
    //     const wallet_address  = await wallet.getAddress();
    //     localStorage.setItem('tonypoly_wallet_address', wallet_address.toString())
    //     localStorage.setItem('tonopoly_secret_key', keyPair.secretKey.toString())
    //     localStorage.setItem('tonopoly_public_key', keyPair.publicKey.toString())
    //     console.log("TONOPOLY: Wallet was created",wallet, keyPair);
    //     return {wallet, keyPair}
    // }
    return null
}

export default wallet;