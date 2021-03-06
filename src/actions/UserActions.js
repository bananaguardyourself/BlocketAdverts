/**
 * Created by Ilya on 15.01.2017.
 */
import {
    SIGNIN_REQUEST,
    SIGNIN_SUCCES,
    SIGNIN_FAIL,
    SIGNUP_REQUEST,
    SIGNUP_SUCCES,
    SIGNUP_FAIL,
    ERROR_SET,
    VERIFIED_SET,
    SIGNOUT_REQUEST,
    SIGNOUT_SUCCES,
    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCES,
    GET_USER_INFO_FAIL,
    GET_USER_RESTORE_REQUEST,
    GET_USER_RESTORE_SUCCES,
    GET_USER_RESTORE_FAIL,
    RESTORE_REQUEST,
    RESTORE_SUCCES,
    RESTORE_FAIL,
    CANCEL_RESTORE_REQUEST,
    CANCEL_RESTORE_SUCCES,
    CANCEL_RESTORE_FAIL,
    PASSWORD_CHANGE_REQUEST,
    PASSWORD_CHANGE_SUCCES,
    PASSWORD_CHANGE_FAIL,
    SHOW_MODAL,
    CLOSE_MODAL
} from '../constants/User'

import {
    ROUTING
} from '../constants/Routing'

import cookie from 'react-cookie'
import $ from 'jquery';

var Config = require('Config');

export function errorSet(error) {

    return function (dispatch) {
        dispatch({
            type: ERROR_SET,
            payload: error
        });
    }
}

export function verifiedSet(verified) {

    return function (dispatch) {

        if (verified) {
            $.ajax({
                type: 'POST',
                url: Config.serverUrl + '//users/verify',
                contentType: 'application/json',
                data: '"' + verified + '"',
                success: function (result) {

                    dispatch({
                        type: VERIFIED_SET,
                        payload: result.result
                    });
                },
                error: function () {

                    dispatch({
                        type: VERIFIED_SET,
                        payload: false
                    });
                }
            });
        }
        else {
            dispatch({
                type: VERIFIED_SET,
                payload: false
            });
        }

    }
}

export function handleSignin(email, password, errorCallback) {

    return function (dispatch) {

        dispatch({
            type: SIGNIN_REQUEST
        });

        $.ajax({
            type: 'POST',
            url: Config.serverUrl + '/users/signin',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({ Email: email, Password: password }),
            success: function (result) {

                var exp = new Date();
                exp.setDate(exp.getDate() + 14);

                cookie.save('tk', result.token, { path: '/', expires: exp });

                dispatch({
                    type: SIGNIN_SUCCES,
                    payload: {
                        user: result.user,
                        isAuthenticated: true
                    }
                });

                dispatch({
                    type: ROUTING,
                    payload: {
                        method: 'replace',
                        nextUrl: '/'
                    }
                })
            },
            error: function (result) {

                cookie.remove('tk', { path: '/' });

                dispatch({
                    type: SIGNIN_FAIL,
                    payload: result.responseJSON.message
                })

                errorCallback();
            }
        });
    }
}

export function handleSignup(email, password, passwordrepeat, errorCallback) {

    return function (dispatch) {

        dispatch({
            type: SIGNUP_REQUEST
        });

        if (passwordrepeat != password) {
            dispatch({
                type: SIGNUP_FAIL,
                payload: 'Password confirmation error'
            })
        }
        else {
            $.ajax({
                type: 'POST',
                url: Config.serverUrl + '/users/signup',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({ Email: email, Password: password }),
                success: function (result) {

                    var exp = new Date();
                    exp.setDate(exp.getDate() + 14);

                    cookie.save('tk', result.token, { path: '/', expires: exp });

                    dispatch({
                        type: SIGNUP_SUCCES,
                        payload: {
                            user: result.user,
                            isAuthenticated: true
                        }
                    });

                    dispatch({
                        type: ROUTING,
                        payload: {
                            method: 'replace',
                            nextUrl: '/'
                        }
                    })
                },
                error: function (result) {

                    dispatch({
                        type: SIGNUP_FAIL,
                        payload: result.responseJSON.message
                    })

                    errorCallback();
                }
            });
        }

    }

}

export function handleSignOut() {

    return function (dispatch) {

        dispatch({
            type: SIGNOUT_REQUEST
        });

        cookie.remove('tk', { path: '/' });

        dispatch({
            type: SIGNOUT_SUCCES
        });

        dispatch({
            type: ROUTING,
            payload: {
                method: 'replace',
                nextUrl: '/signin'
            }
        });
    }
}

export function getUserInfo() {

    return function (dispatch) {

        dispatch({
            type: GET_USER_INFO_REQUEST
        });

        var tk = cookie.load('tk');

        if (!tk) {
            dispatch({
                type: GET_USER_INFO_FAIL,
                payload: 'Unauthorized'
            });

            dispatch({
                type: ROUTING,
                payload: {
                    method: 'replace',
                    nextUrl: '/signin'
                }
            });
        }
        else {

            $.ajax({
                type: 'GET',
                url: Config.serverUrl + '/users/userinfo',
                dataType: 'json',
                headers: { 'Authorization': tk },
                success: function (response) {
                    dispatch({
                        type: GET_USER_INFO_SUCCES,
                        payload: response
                    })
                },
                error: function (result) {

                    if (result.statusCode === 401) {
                        dispatch({
                            type: GET_USER_INFO_FAIL,
                            payload: 'Unauthorized'
                        });
                    }
                    else {
                        dispatch({
                            type: GET_USER_INFO_FAIL,
                            payload: result.responseJSON.message
                        })
                    }

                    dispatch({
                        type: ROUTING,
                        payload: {
                            method: 'replace',
                            nextUrl: '/signin'
                        }
                    });
                }
            });
        }
    }
}

export function getUserRestoreInfo(restoreCode) {

    return function (dispatch) {

        dispatch({
            type: GET_USER_RESTORE_REQUEST
        });

        $.ajax({
            type: 'GET',
            url: Config.serverUrl + '/users/userinfo/' + restoreCode,
            dataType: 'json',
            success: function (response) {
                dispatch({
                    type: GET_USER_RESTORE_SUCCES,
                    payload: response
                })
            },
            error: function (result) {

                dispatch({
                    type: GET_USER_RESTORE_FAIL,
                    payload: result.responseJSON.message
                })

            }
        });
    }
}

export function verifyAnonimity() {

    return function (dispatch) {

        dispatch({
            type: GET_USER_INFO_REQUEST
        });

        var tk = cookie.load('tk');

        if (tk) {
            $.ajax({
                type: 'GET',
                url: Config.serverUrl + '/users/userinfo/',
                dataType: 'json',
                headers: { 'Authorization': tk },
                success: function (response) {
                    dispatch({
                        type: GET_USER_INFO_SUCCES,
                        payload: response
                    })

                    dispatch({
                        type: ROUTING,
                        payload: {
                            method: 'replace',
                            nextUrl: '/'
                        }
                    });
                },
                error: function (result) {

                    if (result.statusCode === 401) {
                        dispatch({
                            type: GET_USER_INFO_FAIL,
                            payload: 'Unauthorized'
                        });
                    }
                    else {
                        dispatch({
                            type: GET_USER_INFO_FAIL,
                            payload: result.responseJSON.message
                        })
                    }
                }
            });
        }
        else {
            dispatch({
                type: GET_USER_INFO_FAIL,
                payload: 'Unauthorized'
            })
        }
    }
}

export function handleRestore(email) {

    return function (dispatch) {

        dispatch({
            type: RESTORE_REQUEST
        });

        $.ajax({
            method: 'POST',
            url: Config.serverUrl + '/users/restore?email=' + email,            
            success: function () {

                dispatch({
                    type: RESTORE_SUCCES,
                    payload: 'To restore the password follow the instructions in the email.'
                });

                dispatch({
                    type: ROUTING,
                    payload: {
                        method: 'replace',
                        nextUrl: '/signin'
                    }
                })

            },
            error: function (result) {

                dispatch({
                    type: RESTORE_FAIL,
                    payload: result.responseJSON.message
                })

            }
        });
    }
}

export function cancelRestore(code) {

    return function (dispatch) {

        dispatch({
            type: CANCEL_RESTORE_REQUEST
        });

        $.ajax({
            method: 'PUT',
            url: Config.serverUrl + '/users/restore/' + code,
            contentType: 'application/json',
            dataType: 'json',
            success: function () {

                dispatch({
                    type: CANCEL_RESTORE_SUCCES
                });

            },
            error: function (result) {

                dispatch({
                    type: CANCEL_RESTORE_FAIL,
                    payload: result.responseJSON.message
                })

            }
        });
    }
}

export function handlePasswordChange(code, password, passwordrepeat) {

    return function (dispatch) {

        dispatch({
            type: PASSWORD_CHANGE_REQUEST
        });

        if (passwordrepeat != password) {
            dispatch({
                type: PASSWORD_CHANGE_FAIL,
                payload: 'Password confirmation error'
            })
        }
        else {
            $.ajax({
                method: 'PUT',
                url: Config.serverUrl + '/users/passwordchange/' + code,
                data: JSON.stringify({ Password: password }),
                contentType: 'application/json',
                dataType: 'json',
                success: function () {

                    dispatch({
                        type: PASSWORD_CHANGE_SUCCES
                    });

                    dispatch({
                        type: ROUTING,
                        payload: {
                            method: 'replace',
                            nextUrl: '/signin'
                        }
                    })

                },
                error: function (result) {

                    dispatch({
                        type: PASSWORD_CHANGE_FAIL,
                        payload: result.responseJSON.message
                    })

                }
            });
        }
    }
}

export function showModal() {
    return (dispatch) => {

        dispatch({
            type: SHOW_MODAL
        });
    }
}

export function closeModal() {
    return (dispatch) => {

        dispatch({
            type: CLOSE_MODAL
        });
    }
}