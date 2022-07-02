
export const addBalance = (address:string, amount:number = 15) => {
    const nanoAmount = amount * 1000000000
    const url = "https://app.tonkeeper.com/transfer/"+address+"?amount=" + nanoAmount.toString()
    window.open(url, '_blank')
    return null
}
