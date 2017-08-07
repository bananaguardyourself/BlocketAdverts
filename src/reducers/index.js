import { combineReducers } from 'redux'
import adverts from './adverts'
import user from './user'
import filtering from './filtering'
import sorting from './sorting'

export default combineReducers({
    adverts,
    user,
    filtering,
    sorting
})