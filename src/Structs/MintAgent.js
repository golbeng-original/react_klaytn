import * as Caver from 'caver-js'

const whiteMintAddress = '0xbDCF854706D9f3Ba84c97BD920dDdC9407814129'

export default class MintAgent
{
    signature = {
        isWhitelisted: '0x3af32abf'
    }

    constructor(provider) {
        this.caver = new Caver(provider)
    }

    isWhitelisted = async (address) => {
        if(this.caver.utils.isAddress(address) === false) {
            console.log('not address')
            return
        }

        console.log('confirm address')

        const functionCall = this.caver.abi.encodeFunctionCall({
            constant: true,
            type: "function",
            name: "isWhitelisted",
            payable: false,
            stateMutability: "view",
            inputs: [
                {
                    name: "account",
                    type: "address"
                }
            ],
            outputs: [
                {
                    name: "",
                    type: "bool"
                }
            ],
    
        }, [address, ])

        console.log(`function call = ${functionCall}`)

        const result = await this.caver.klay.call({
            to: whiteMintAddress,
            data: functionCall
        })

        console.log(result)
    }

}