
import {CHANGE_KAIKAS_STATE, CONNECTED_KAIKAS, DISCONNECTED_KAIKAS} from '../Action/kaikas'
import {connectedKaikas, disconnectedKaikas} from '../Action/kaikas'

import KlaytnConnect from '../../Structs/KlaytnConnect'

const klytnConnect = new KlaytnConnect()

const initalizeState = {
    klaytnConnect: klytnConnect,
    account: null
} 

export function reducer(state = initalizeState, action) {
    switch(action.type)
    {
        case CHANGE_KAIKAS_STATE:
            return {
                ...state,
                klaytnConnect: action.klaytnConnect
            }

        case CONNECTED_KAIKAS:
            return {
                ...state,
                account: action.account
            }
        case DISCONNECTED_KAIKAS:
            return {
                ...state,
                account: action.account
            }
        default:
            return state
    }
}