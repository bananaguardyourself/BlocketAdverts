/**
 * Created by Ilya on 08.01.2017.
 */
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Masterpage from './src/containers/masterpage'
import App from './src/containers/app'
import UserSignin from './src/containers/userSignin'
import UserSignup from './src/containers/userSignup'
import requireAuthentication from './src/components/authenticatedcomponent'
import requireAnonymity from './src/components/anonymitycomponent'
import AdvertDetails from './src/containers/advertContainer'

export const routes = (
    <div>
        <Route path='/' component={Masterpage}>
            <IndexRoute component={requireAuthentication(App)} />
            <Route path='/adverts/:id' component={requireAuthentication(AdvertDetails)}/>
            <Route path='/signin' component={requireAnonymity(UserSignin)}/>
            <Route path='/signup' component={requireAnonymity(UserSignup)}/>
        </Route>
    </div>
);