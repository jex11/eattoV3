import { TRUCK_NAME_CHANGED, TRUCK_LOCATION_CHANGED, TRUCK_PHONE_CHANGED, TRUCK_CREATE, TRUCKS_FETCH, TRUCKS_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = { truckname: '', trucklocation: '', truckphone: '', loading: false };

export default (state = INITIAL_STATE, action) => {    
    switch (action.type) {
        case TRUCK_NAME_CHANGED:             
            return { ...state, truckname: action.payload };
        case TRUCK_LOCATION_CHANGED:             
            return { ...state, trucklocation: action.payload };
        case TRUCK_PHONE_CHANGED:
            return { ...state, truckphone: action.payload };
        case TRUCK_CREATE:
            return { INITIAL_STATE };
        case TRUCKS_FETCH:
            return { ...state, loading: true };
        case TRUCKS_FETCH_SUCCESS:
            return { truck_list: action.payload, loading: false };
        // case LOGIN_USER_SUCCESS: 
        //     return { ...state, ...INITIAL_STATE, user: action.payload };
        // case LOGIN_USER_FAIL: 
        //     return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};