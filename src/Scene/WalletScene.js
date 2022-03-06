import React from 'react'
import {Button, Typography} from '@material-ui/core'
//import Caver from 'caver-js'

export default class WalletScene extends React.Component {

    constructor(props) {
        super(props)

        this.provider = undefined
        this.Caver = undefined

        this.disconnectTimer = undefined

        this.state = {
            address: null
        }
    }

    _initKlaytnProvider = () => {
        if(typeof(window.klaytn) === 'undefined') {
            return
        }

        this.provider = window['klaytn']
        if(this.provider === undefined) {
            return
        }

        this.provider.on(
            'accountsChanged', 
            (account) => {
                this._updateAddress(account)
            }
        )
        
        /*
        this.provider.on(
            'networkChanged', 
            () => {
                console.log('changed!!')
            }
        )
        */
    }

    _updateAddress = async (account) => {
        this.setState({address: account})
        if(account === null) {
            return
        }
        
        this.disconnectTimer = setInterval(async () => {
            const unlocked = await this.provider._kaikas.isUnlocked()
            if(unlocked === false) {
                this.setState({address: null})

                clearInterval(this.disconnectTimer)
                this.disconnectTimer = undefined
            }
        }, 500)
    }

    _onClickConnectWallet = async () => {
        try {
            const accounts = await this.provider.enable()
            this._updateAddress(accounts[0])
        }
        catch(e) {
            this._updateAddress(null)
            console.log(e)
        }
    }

    componentDidMount() {
        this._initKlaytnProvider()
    }

    componentWillUnmount() {
        clearInterval(this.disconnectTimer)
    }

    render() {
        return (
            <div>
                <header>
                    <p>Wallet Scene</p>
                </header>
                <div>
                    <Button variant="contained" 
                    color="primary"
                    onClick={this._onClickConnectWallet}
                    >Primary</Button>
                </div>
                <Typography color="primary">
                    {`Wallet Connection : ${this.state.address}`}
                </Typography>
            </div>
        )
    }
}