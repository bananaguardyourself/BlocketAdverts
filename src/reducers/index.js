import { combineReducers } from 'redux'
import adverts from './adverts'
import user from './user'
import filtering from './filtering'
import sorting from './sorting'
import advertdetails from './advertdetails'

export default combineReducers({
    adverts,
    user,
    filtering,
    sorting,
    advertdetails
})