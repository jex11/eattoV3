import firebase from 'firebase';
import _ from 'lodash';
import { ORDER_FETCH, ORDER_FETCH_SUCCESS, ORDER_FETCH_FAILED } from './types';

export const orderQRfetch = () => {
    return (dispatch, getState) => {
        dispatch({ type: ORDER_FETCH });
        const { user } = getState().auth;                                
        firebase.database().ref(`/customer/${user.uid}/order`)
        .on('value', snapshot => { 
            console.log('order QR fetch');
            const obj = _.map(snapshot.val(), (val, orderID) => {
                return { ...val, orderID };
            });
            const qrObj = _.filter(obj, (item) => {
                return item.status === 'PAID';
            });
            console.log(obj);    
            console.log(qrObj);
            if (qrObj.length === 0) { 
                dispatch({ type: ORDER_FETCH_FAILED, payload: 'There is no order to redeem.' }); 
            } else {
                dispatch({ type: ORDER_FETCH_SUCCESS, payload: qrObj[0] });
            }
        });        
    };
};
