import React from 'react'
import {Button, Typography} from '@material-ui/core'
//import Caver from 'caver-js'

import { connect } from 'react-redux'

//import KlaytnConnect from '../Structs/KlaytnConnect'

class WalletScene extends React.Component {

    constructor(props) {
        super(props)

        this.provider = undefined
        this.Caver = undefined

        this.disconnectTimer = undefined

        this.state = {
            address: null
        }
    }

    _onClickConnectWallet = async () => {

        const klaytnConnect = this.props.kaikas.klaytnConnect
        klaytnConnect?.connect()
    }

    _onClickMintAgentFunc = async () => {
        const klaytnConnect = this.props.kaikas.klaytnConnect

        const mintAgent = klaytnConnect.getMintAgent()

        mintAgent.isWhitelisted('0xf753379A4cca29b6b4f6B5c615a2fa1E2481daF9')
    }

    componentDidMount() {
        const klaytnConnect = this.props.kaikas.klaytnConnect
        klaytnConnect?.initConnectedState()
    }

    componentWillUnmount() {
        const klaytnConnect = this.props.kaikas.klaytnConnect
        klaytnConnect?.dispose()
    }

    render() {

        const klaytnConnect = this.props.kaikas.klaytnConnect

        const currentAccount = klaytnConnect ? klaytnConnect.currentAccount : null
        const currentNetworkId = klaytnConnect ? klaytnConnect.currentNetworkId : null

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
                    {`Wallet Connection : ${currentAccount}`}
                </Typography>
                <Typography color="primary">
                    {`Network Id : ${currentNetworkId}`}
                </Typography>
                <div>
                    <Button variant="contained" 
                    color="primary"
                    onClick={this._onClickMintAgentFunc}
                    >Primary</Button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        kaikas: state.kaikas
    }
}

function mapDispatchToProps(dispathc) {

}

export default connect(mapStateToProps)(WalletScene)