import _ from 'lodash';
import { FOOD_MENU_FETCH, FOOD_MENU_FETCH_SUCCESS, CHANGE_FOOD_QUANTITY, PROCEEED_ORDER, MAKE_PAYMENT, 
    PAYMENT_SUCCESS, ORDER_HISTORY_FETCH, ORDER_FETCH_SUCCESS, ORDER_HISTORY_FETCH_FAILED, ORDER_HISTORY_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = { loading: false, menu_items: null };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FOOD_MENU_FETCH:
        return { ...state, loading: true };
        case FOOD_MENU_FETCH_SUCCESS:        
            return { ...state, loading: false, menu_items: action.payload };
        case CHANGE_FOOD_QUANTITY: {
            console.log('6. CHANGE_FOOD_QUANTITY', state);
            // const obj = _.map(state, (val, uid) => {        
            //     return { ...val, uid };
            // });            
            const obj = state.menu_items.map((item) => (
                item.uid === action.id ? { ...item, quantity: action.payload } : item
            ));  
            return { ...state, menu_items: obj };
        }            
        case PROCEEED_ORDER:            
            return action.payload;
        case MAKE_PAYMENT: {
            return { ...state };
        }            
        case PAYMENT_SUCCESS:
            return state;
        case ORDER_HISTORY_FETCH:
            return { ...state, loading: true };
        case ORDER_HISTORY_FETCH_SUCCESS:
            return { ...state, loading: false, history: action.payload };
        case ORDER_HISTORY_FETCH_FAILED:
            return { ...state, loading: false };
        default: 
            return state;
    }
};