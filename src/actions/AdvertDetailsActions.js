/**
 * Created by Ilya on 21.08.2017.
 */
import {
    GET_ADVERT_DETAILS_REQUEST,
    GET_ADVERT_DETAILS_SUCCESS,
    GET_ADVERT_DETAILS_FAIL
} from '../constants/adverts'

import {
    ROUTING
} from '../constants/Routing'

import $ from 'jquery';
import cookie from 'react-cookie'

var Config = require('Config')

export function getAdvert(id) {

    return (dispatch) => {

        dispatch({
            type: GET_ADVERT_DETAILS_REQUEST
        });

        let tk = cookie.load('tk');

        if (!tk) {
            dispatch({
                type: GET_ADVERT_DETAILS_FAIL,
                payload: 'Unauthorized'
            });

            dispatch({
                type: ROUTING,
                payload: {
                    method: 'replace', //or push
                    nextUrl: '/signin'
                }
            })
        }
        else {

            $.ajax({
                type: 'GET',
                url: Config.serverUrl + '/adverts/' + id,
                dataType: 'json',
                headers: {'Authorization': tk},
                success: function (response) {
                    dispatch({
                        type: GET_ADVERT_DETAILS_SUCCESS,
                        payload: response
                    })
                },
                error: function (result) {

                    if (result.statusCode === 401) {
                        dispatch({
                            type: GET_ADVERT_DETAILS_FAIL,
                            payload: 'Unauthorized'
                        });

                        dispatch({
                            type: ROUTING,
                            payload: {
                                method: 'replace', //or push
                                nextUrl: '/signin'
                            }
                        })
                    }
                    else {
                        dispatch({
                            type: GET_ADVERT_DETAILS_FAIL,
                            payload: result.responseJSON.message
                        })
                    }
                }
            });
        }
    }
}