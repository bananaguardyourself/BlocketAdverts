/**
 * Created by Ilya on 08.01.2017.
 */
import {
    GET_ADVERTS_REQUEST,
    GET_ADVERTS_SUCCESS,
    GET_ADVERTS_FAIL,
    ADD_ADVERTS_REQUEST,
    ADD_ADVERTS_SUCCESS,
    ADD_ADVERTS_FAIL,
    DELETE_ADVERT_REQUEST,
    DELETE_ADVERT_FAIL,
    DELETE_ADVERT_SUCCESS,
    DELETE_ADVERT_RESET
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

        let tk = cookie.load('tk');

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

export function addAdvert(link, successCallback, errorCallback) {
    return (dispatch) => {

        dispatch({
            type: ADD_ADVERTS_REQUEST
        });

        let tk = cookie.load('tk');

        if (!tk) {
            dispatch({
                type: ADD_ADVERTS_FAIL,
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
                type: 'POST',
                url: 'http://35.156.176.72/adverts?link=' + link,
                dataType: 'json',
                headers: {'Authorization': tk},
                success: function () {

                    $.ajax({
                        type: 'GET',
                        url: 'http://35.156.176.72/adverts',
                        dataType: 'json',
                        headers: {'Authorization': tk},
                        success: function (response) {
                            dispatch({
                                type: ADD_ADVERTS_SUCCESS,
                                payload: response
                            });
                            successCallback();
                        },
                        error: function (result) {

                            if (result.statusCode === 401) {
                                dispatch({
                                    type: ADD_ADVERTS_FAIL,
                                    payload: 'Unauthorized'
                                });

                                dispatch({
                                    type: ROUTING,
                                    payload: {
                                        method: 'replace', //or push
                                        nextUrl: '/signin'
                                    }
                                });
                                errorCallback();
                            }
                            else {
                                dispatch({
                                    type: ADD_ADVERTS_FAIL,
                                    payload: result.responseJSON.message
                                })
                            }
                        }
                    });
                },
                error: function (result) {

                    if (result.statusCode === 401) {
                        dispatch({
                            type: ADD_ADVERTS_FAIL,
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
                            type: ADD_ADVERTS_FAIL,
                            payload: result.responseJSON.message
                        })
                    }

                    errorCallback();
                }
            });
        }
    }
}

export function deleteAdvert(id) {
    return (dispatch) => {

        dispatch({
            type: DELETE_ADVERT_REQUEST
        });

        let tk = cookie.load('tk');

        if (!tk) {
            dispatch({
                type: DELETE_ADVERT_FAIL,
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
                method: 'DELETE',
                url: 'http://35.156.176.72/adverts/' + id,
                headers: {'Authorization': tk},
                success: function () {
                    dispatch({
                        type: DELETE_ADVERT_SUCCESS,
                        payload: id
                    });
                },
                error: function (result) {

                    if (result.statusCode === 401) {
                        dispatch({
                            type: DELETE_ADVERT_FAIL,
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
                            type: DELETE_ADVERT_FAIL,
                            payload: result.statusText
                        })
                    }
                }
            });

        }
    }
}

export function resetDelete()
{
    return (dispatch) => {

        dispatch({
            type: DELETE_ADVERT_RESET
        });
    }
}