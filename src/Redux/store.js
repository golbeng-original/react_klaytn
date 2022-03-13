import {createStore, combineReducers} from 'redux'

import * as kaikas from './Reducer/kaikas'

const rootReducer = combineReducers({
    kaikas: kaikas.reducer
})

const store  = createStore(rootReducer)

export default store