import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TruckReducer from './TruckReducer';
import OrderReducer from './OrderReducer';
import OrderQRReducer from './OrderQRReducer';

export default combineReducers({
    auth: AuthReducer,
    truck: TruckReducer,
    order: OrderReducer,
    orderQR: OrderQRReducer
});

