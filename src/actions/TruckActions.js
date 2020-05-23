import firebase from 'firebase';
import _ from 'lodash';
import { TRUCK_NAME_CHANGED, TRUCK_LOCATION_CHANGED, TRUCK_PHONE_CHANGED, TRUCK_CREATE, TRUCKS_FETCH_SUCCESS, TRUCKS_FETCH } from './types';

export const truckNameChanged = (text) => {
    return {
        type: TRUCK_NAME_CHANGED,
        payload: text
    };
};

export const truckLocationChanged = (text) => {
    return {
        type: TRUCK_LOCATION_CHANGED,
        payload: text
    };
};

export const truckPhoneChanged = (text) => {
    return {
        type: TRUCK_PHONE_CHANGED,
        payload: text
    };
};

export const truckCreate = ({ truckname, trucklocation, truckphone }) => {
    return (dispatch) => {        
        console.log('Truck Create action.');
        firebase.database().ref('/trucks')
            .push({ truckname, trucklocation, truckphone })
            .then(() => {
                console.log('NEW TRUCK CREATED SUCCESSFULLY!');
                dispatch({ type: TRUCK_CREATE });
            })
            .catch((err) => {
                console.log(err);                
            });
    };
};

export const trucksFetch = () => {
    console.log('testing trucksFetch Function');
    return (dispatch) => {   
        dispatch({ type: TRUCKS_FETCH });
        firebase.database().ref('/trucks')
        .on('value', snapshot => {
            console.log('snapshot');
            console.log(snapshot.val());
            const trucks = snapshot.val();
            dispatch({ type: TRUCKS_FETCH_SUCCESS, payload: trucks });                       
        });
    };
};