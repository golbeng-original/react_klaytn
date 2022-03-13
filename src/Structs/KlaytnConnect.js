import store from '../Redux/store'

import * as kaikasAction from '../Redux/Action/kaikas'

import MintAgent from './MintAgent'

export default class KlaytnConnect
{
    constructor() {
        this.currentAccount = null
        this.currentNetworkId = null
    
        this.disconnectTimer = undefined

        this.provider = undefined
        if(typeof(window.klaytn) !== 'undefined') {
            this.provider = window['klaytn']
        }
    }

    dispose = () => {
        clearInterval(this.disconnectTimer)
    }

    initConnectedState = async () => {
        const isUnlocked = await this.provider._kaikas.isUnlocked()
        if(isUnlocked === false) {
            this._updateAddress(null)
            return
        }

        this.currentNetworkId = this.provider.networkVersion

        // unlock 안 되어 있다면.. 다시 enable 체크
        await this._requestAccount()
    }

    initProviderEventSubcribe = () => {
        
        this.provider.on(
            'accountsChanged', 
            (accounts) => {
                // 현재 account와 바뀐 account가 다르면 null
                //console.log(`change account = ${window.klaytn.selectedAddress}`)
                if(this.currentAccount !== window.klaytn.selectedAddress) {
                    this._updateAddress(null)
                }
            }
        )

        this.provider.on(
            'networkChanged', 
            () => {
                this._updateNetwork()
            }
        )
    }

    connect = async () => {
        this._updateNetwork()
        this._requestAccount()
    }

    getMintAgent = () => {
        return new MintAgent(this.provider)
    }

    _requestAccount = async () => {
        try {
            await this.provider.enable()
            
            const account = window.klaytn.selectedAddress
            this._updateAddress(account)

            this._initUnlockedInterval()

            this.initProviderEventSubcribe()
        }
        catch{}
    }

    _updateAddress = (account) => {

        let newAccount = null
        if(account === null) {
            newAccount = null
        }
        else if(typeof(account) === 'object') {
            newAccount= account.length > 0 ? account[0] : null
        }
        else if(typeof(account) === 'string') {
            newAccount = account
        }

        console.log(`newAccount = ${newAccount}`)
        console.log(`currentAccount = ${this.currentAccount}`)

        if(this.currentAccount === newAccount){
            return
        }
        
        this.currentAccount = newAccount

        console.log(`account = ${this.currentAccount}`)
        // 추후에 리덕스 처리
        store.dispatch(kaikasAction.chnageKaikasState(this))
    }

    _updateNetwork = () => {

        if(this.currentNetworkId === this.provider.networkVersion) {
            return
        }

        this.currentNetworkId = this.provider.networkVersion
        store.dispatch(kaikasAction.chnageKaikasState(this))
    }

    _initUnlockedInterval = () => {
        this.disconnectTimer = setInterval(async () => {

            if(this.provider === undefined) {
                return
            }

            const unlocked = await this.provider._kaikas.isUnlocked()
            if(unlocked === true) {
                return
            }

            this._updateAddress(null)

            clearInterval(this.disconnectTimer)
        }, 500)
    }
}