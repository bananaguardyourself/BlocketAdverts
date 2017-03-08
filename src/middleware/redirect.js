/**
 * Created by Ilya on 16.01.2017.
 */
import { browserHistory } from 'react-router'

import {
    ROUTING
} from '../constants/Routing'

export const redirect = store => next => action => { //eslint-disable-line no-unused-vars
    if (action.type === ROUTING) {
        browserHistory[action.payload.method](action.payload.nextUrl)
    }

    return next(action)
};