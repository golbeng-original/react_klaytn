export const CHANGE_KAIKAS_STATE = 'change_kaikas_state'
export const CONNECTED_KAIKAS = 'connected_kaikas'
export const DISCONNECTED_KAIKAS = 'disconnectd_kaikas'


export const chnageKaikasState = (klaytnConnect) => {
    return({
        type: CHANGE_KAIKAS_STATE,
        klaytnConnect: klaytnConnect
    })
}

export const connectedKaikas = (account) => {
    return ({
        type: CONNECTED_KAIKAS,
        account
    })
}

export const disconnectedKaikas = () => {
    return ({
        type: DISCONNECTED_KAIKAS,
        account : null
    })
}
