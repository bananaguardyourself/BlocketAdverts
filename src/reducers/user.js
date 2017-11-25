/**
 * Created by Ilya on 07.01.2017.
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

const initialState = {
    email: '',
    id: 0,
    error: '',
    verified: false,
    isAuthenticated: false,
    modalShow: false
};

export default function user(state = initialState, action) {

    switch (action.type) {
        case SIGNIN_REQUEST:
            return { ...state };

        case SIGNIN_SUCCES:
            return {
                ...state,
                email: action.payload.user.email,
                id: action.payload.user.id,
                error: '',
                isAuthenticated: true
            };

        case SIGNIN_FAIL:
            return { ...state, error: action.payload, isAuthenticated: false };

        case SIGNUP_REQUEST:
            return { ...state };

        case SIGNUP_SUCCES:
            return {
                ...state,
                email: action.payload.user.email,
                id: action.payload.user.id,
                error: '',
                isAuthenticated: true
            };

        case SIGNUP_FAIL:
            return { ...state, error: action.payload, isAuthenticated: false };

        case ERROR_SET:
            return { ...state, error: action.payload };

        case VERIFIED_SET:
            return { ...state, verified: action.payload };

        case SIGNOUT_REQUEST:
            return { ...state };

        case SIGNOUT_SUCCES:
            return {
                ...state, email: '',
                id: 0,
                error: '',
                verified: false,
                isAuthenticated: false
            };

        case GET_USER_INFO_REQUEST:
            return { ...state };

        case GET_USER_INFO_SUCCES:
            return {
                ...state,
                email: action.payload.user.email,
                id: action.payload.user.id,
                error: '',
                isAuthenticated: true
            };

        case GET_USER_INFO_FAIL:
            return { ...state, error: action.payload, isAuthenticated: false };

        case RESTORE_REQUEST:
            return { ...state };

        case RESTORE_SUCCES:
            return { ...state, error: action.payload, modalShow: true };

        case RESTORE_FAIL:
            return { ...state, error: action.payload, modalShow: true };

        case CANCEL_RESTORE_REQUEST:
            return { ...state }

        case CANCEL_RESTORE_SUCCES:
            return { ...state, error: '' };

        case CANCEL_RESTORE_FAIL:
            return { ...state, error: action.payload };

        case PASSWORD_CHANGE_REQUEST:
            return { ...state }

        case PASSWORD_CHANGE_SUCCES:
            return { ...state, error: '' };

        case PASSWORD_CHANGE_FAIL:
            return { ...state, error: action.payload };

        case SHOW_MODAL:
            return { ...state, modalShow: true };

        case CLOSE_MODAL:
            return { ...state, modalShow: false };

        default:
            return state;
    }

}