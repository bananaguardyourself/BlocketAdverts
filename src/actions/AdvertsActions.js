/**
 * Created by Ilya on 08.01.2017.
 */
import {
    GET_ADVERTS_REQUEST,
    GET_ADVERTS_SUCCESS,
    GET_ADVERTS_FAIL,
    ADD_ADVERT_REQUEST,
    ADD_ADVERT_SUCCESS,
    ADD_ADVERT_FAIL,
    DELETE_ADVERT_REQUEST,
    DELETE_ADVERT_FAIL,
    DELETE_ADVERT_SUCCESS,
    DELETE_ADVERT_RESET,
    UPDATE_ADVERT_REQUEST,
    UPDATE_ADVERT_FAIL,
    UPDATE_ADVERT_SUCCESS,
    SHOW_DELETE_CONFIRMATION,
    CLOSE_DELETE_CONFIRMATION
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
                url: 'http://18.195.13.194/adverts',
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
            type: ADD_ADVERT_REQUEST
        });

        let tk = cookie.load('tk');

        if (!tk) {
            dispatch({
                type: ADD_ADVERT_FAIL,
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
                url: 'http://18.195.13.194/adverts?link=' + link,
                dataType: 'json',
                headers: {'Authorization': tk},
                success: function () {

                    $.ajax({
                        type: 'GET',
                        url: 'http://18.195.13.194/adverts',
                        dataType: 'json',
                        headers: {'Authorization': tk},
                        success: function (response) {
                            dispatch({
                                type: ADD_ADVERT_SUCCESS,
                                payload: response
                            });
                            successCallback();
                        },
                        error: function (result) {

                            if (result.statusCode === 401) {
                                dispatch({
                                    type: ADD_ADVERT_FAIL,
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
                                    type: ADD_ADVERT_FAIL,
                                    payload: result.responseJSON.message
                                })
                            }
                        }
                    });
                },
                error: function (result) {

                    if (result.statusCode === 401) {
                        dispatch({
                            type: ADD_ADVERT_FAIL,
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
                            type: ADD_ADVERT_FAIL,
                            payload: result.responseJSON.message
                        })
                    }

                    errorCallback();
                }
            });
        }
    }
}

export function deleteAdvert(id, errorCallback) {
    return (dispatch) => {

        dispatch({
            type: DELETE_ADVERT_REQUEST,
            payload: id
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
                url: 'http://18.195.13.194/adverts/' + id,
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

                    errorCallback();
                }
            });

        }
    }
}

export function resetDelete() {
    return (dispatch) => {

        dispatch({
            type: DELETE_ADVERT_RESET
        });
    }
}

export function updateAdvert(id, successCallback, errorCallback) {
    return (dispatch) => {

        dispatch({
            type: UPDATE_ADVERT_REQUEST
        });

        let tk = cookie.load('tk');

        if (!tk) {
            dispatch({
                type: UPDATE_ADVERT_FAIL,
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
                method: 'PUT',
                url: 'http://18.195.13.194/adverts/' + id,
                headers: {'Authorization': tk},
                success: function (result) {

                    dispatch({
                        type: UPDATE_ADVERT_SUCCESS,
                        id: id,
                        payload: result
                    });

                    successCallback();
                },
                error: function (result) {

                    if (result.statusCode === 401) {
                        dispatch({
                            type: UPDATE_ADVERT_FAIL,
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
                            type: UPDATE_ADVERT_FAIL,
                            payload: result.statusText
                        })
                    }

                    errorCallback();
                }
            });

        }
    }
}

export function showDeleteConfirmation(id) {
    return (dispatch) => {

        dispatch({
            type: SHOW_DELETE_CONFIRMATION,
            payload: id
        });
    }
}

export function closeDeleteConfirmation() {
    return (dispatch) => {

        dispatch({
            type: CLOSE_DELETE_CONFIRMATION
        });
    }
}

