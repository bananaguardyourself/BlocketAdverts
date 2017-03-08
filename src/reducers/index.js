import { combineReducers } from 'redux'
import adverts from './adverts'
import user from './user'

export default combineReducers({
    adverts,
    user
})