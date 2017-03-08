/**
 * Created by Ilya on 08.01.2017.
 */
import {
    GET_ADVERTS_REQUEST,
    GET_ADVERTS_SUCCESS,
    GET_ADVERTS_FAIL
} from '../constants/adverts'

import {
    ROUTING
} from '../constants/Routing'

import $ from 'jquery';
import cookie from 'react-cookie'

export function getAdverts() {

    return (dispatch) => {

        dispatch({
            type: GET_ADVERTS_REQUEST
        });

        var tk = cookie.load('tk');

        if (!tk) {
            dispatch({
                type: GET_ADVERTS_FAIL,
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
                url: 'http://35.156.176.72/adverts',
                dataType: 'json',
                headers: {'Authorization': tk},
                success: function (response) {
                    dispatch({
                        type: GET_ADVERTS_SUCCESS,
                        payload: response
                    })
                },
                error: function (result) {

                    if (result.statusCode === 401) {
                        dispatch({
                            type: GET_ADVERTS_FAIL,
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
                            type: GET_ADVERTS_FAIL,
                            payload: result.responseJSON.message
                        })
                    }
                }
            });
        }
    }
}

export function addAdvert()
{
    return (dispatch) => {

        dispatch({
            type: GET_ADVERTS_REQUEST
        });
    }
}