import _ from 'lodash';
import { ORDER_FETCH, ORDER_FETCH_SUCCESS, ORDER_FETCH_FAILED } from '../actions/types';

const INITIAL_STATE = { paid_order: null, loading: false, error: '' };

export default (state = INITIAL_STATE, action) => {    
    switch (action.type) {
        case ORDER_FETCH:        
            return { ...state, loading: true, error: '' };
        case ORDER_FETCH_SUCCESS:
            return { ...state, loading: false, paid_order: action.payload };
        case ORDER_FETCH_FAILED:
            return { ...state, loading: false, error: action.payload };
        default: 
            return state;
    }
};