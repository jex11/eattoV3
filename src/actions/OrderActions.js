import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import moment from 'moment';
import { store } from '../configureStore';
import { FOOD_MENU_FETCH, FOOD_MENU_FETCH_SUCCESS, CHANGE_FOOD_QUANTITY, PROCEEED_ORDER, MAKE_PAYMENT, 
    PAYMENT_SUCCESS, ORDER_HISTORY_FETCH, ORDER_HISTORY_FETCH_SUCCESS, ORDER_HISTORY_FETCH_FAILED } from './types';

export const foodsFetch = (selectedTruck) => {
    // console.log('Order Action obj');    
    return (dispatch) => {
        console.log('2. foodFetch', selectedTruck);    
        dispatch({ type: FOOD_MENU_FETCH });    
        
        firebase.database().ref(`/trucks/${selectedTruck.uid}/linked_suppliers`)
        .on('value', snapshot => {            
            const linkedSupplier = snapshot.val();
            console.log('3. koko crynch', linkedSupplier);
            let menu = {};
            Object.keys(linkedSupplier).forEach(key => {
                let supplierItems = linkedSupplier[key].menu_items;                
                Object.keys(supplierItems).forEach(itemKey => {
                    supplierItems[itemKey].supplier = key;
                    if (!(itemKey in menu)) {
                        menu[itemKey] = supplierItems[itemKey];
                    }
                });
                // for (let itemKey in supplierItems){
                //     if (supplierItems.hasOwnProperty(key)) {
                //       console.log(`${key} : ${obj[key]}`)
                //     }
                //  }
            });
            console.log('4. testing or wedding', menu);
            // let linkedSupplier = _.map(snapshot.val(), (val, key) => {
            //     return { ...val.menu_items, supplierID: key };
            // });

            // let menu = {};
            // for (let supplier of linkedSupplier) {
            //     _.map(allSuppliers[supplier.supplierID].supplier_items, (val2, key2) => {
            //         if (!(key2 in menu)) {
            //             menu[key2] = { ...val2, supplier: supplier.supplierID };
            //         }
            //     });
            // }            
            // let quantity = 0;
            // const obj = _.map(snapshot.val(), (val, uid) => {              
            //     return { ...val, quantity, uid };              
            // });
            let quantity = 0;
            const obj = _.map(menu, (val, uid) => {
                return { ...val, quantity, uid };
            });
            dispatch({ type: FOOD_MENU_FETCH_SUCCESS, payload: obj });
        });

        // firebase.database().ref('/suppliers')
        // .on('value', resp => {
        //     const allSuppliers = resp.val();
        //     console.log('merged response: ', resp.val());
        //     let linkedSupplier = _.map(selectedTruck.linked_suppliers, (val, key) => { 
        //         return { ...val, supplierID: key }; 
        //     });
        //     let menu = {};
        //     for (let supplier of linkedSupplier) {
        //         _.map(allSuppliers[supplier.supplierID].supplier_items, (val2, key2) => {
        //             if (!(key2 in menu)) {
        //                 menu[key2] = { ...val2, supplier: supplier.supplierID };
        //             }
        //         });
        //     }
        //     console.log('Menu lai la', menu);
        //     let quantity = 0;
        //     const obj = _.map(menu, (val, uid) => {
        //         return { ...val, quantity, uid };
        //     });            
        //     dispatch({ type: FOOD_MENU_FETCH_SUCCESS, payload: obj });                           
        // });        
    };
};

export const changeFoodQuantity = (uid, quantity) => {
    console.log('3. changeFoodQuantity');
    return {
        type: CHANGE_FOOD_QUANTITY,
        payload: quantity,
        id: uid
    };
};

export const proceedOrder = (order, user) => {    
    //Actions.pop(); 
    const { truck_list } = store.getState().truck;
    console.log('proceedOrder');
    console.log(order);
    const obj = _.filter(order, (item) => {
        return item.quantity > 0;
    });
    let orderedItems = {};
    for (let item of obj) {
        orderedItems[item.uid] = { desc: item.desc, img: item.img, name: item.name, price: item.price, quantity: item.quantity, supplier: item.supplier };
    }
    let sum = 0;
    obj.forEach((value) => {
        // console.log(sum);
        sum += value.quantity * value.price;
    });
    const today = new Date();
    const purchaseDate = today;
    
    const pickupDate = new Date();
    pickupDate.setDate(pickupDate.getDate() + 1);
    const payment = { trucker: Object.keys(truck_list)[0], customer: user.uid, items: orderedItems, total: sum, pickup_datetime: moment(pickupDate).format('YYYYMMDDhhmmss'), purchase_datetime: moment(purchaseDate).format('YYYYMMDDhhmmss'), status: 'PENDING' };
    console.log(payment);
    Actions.payment({ payment });
    return {
        type: PROCEEED_ORDER,
        payload: order
    };
};

export const makePayment = (payment) => {
    console.log('wew finally can make payment...');
    const obj = { ...payment, status: 'PAID' };
    console.log(obj);    
    return (dispatch) => {    
        const orderRef = firebase.database().ref('/orders');
        const newOrderID = orderRef.push().key;
        let orderObj = {};
        orderObj[newOrderID] = obj;
        console.log('Testing newOrderID');
        console.log(newOrderID);     
        //Insert order            
        orderRef.child(newOrderID).set(obj)
            .then(() => {
                console.log('insert order SUCCESS');
                //insert customer
                firebase.database().ref(`/customer/${obj.customer}/order`).child(newOrderID).set(obj)
                    .then(() => {
                        console.log('insert customer SUCCESS');
                        //insert food truck
                        firebase.database().ref(`/trucks/${obj.trucker}/truck_order`).child(newOrderID).set(obj)
                            .then(() => {                            
                                console.log('insert truck SUCCESS');
                                //insert supplier                                
                                let suppliers = [];
                                //const suppliers = [...new Set(supplierItems.map(item => item.supplier))];
                                const supplierItems = _.map(obj.items, (val, key) => {
                                    if (!suppliers.includes(val.supplier)) {
                                        suppliers.push(val.supplier);
                                    }
                                    return { ...val, itemID: key };
                                });

                                for (let supplier of suppliers) {
                                    let result = supplierItems.filter(item => {
                                        return item.supplier === supplier;
                                      });
                                      let uploadedItem = {};
                                      for (let supplierItem of result) {
                                        uploadedItem[supplierItem.itemID] = { desc: supplierItem.desc, img: supplierItem.img, name: supplierItem.name, price: supplierItem.price, quantity: supplierItem.quantity, supplier: supplierItem.supplier };
                                      }
                                    console.log('supplier item result');
                                    console.log(result);
                                    firebase.database().ref(`/suppliers/${supplier}/supplier_order`).child(newOrderID).set({ ...obj, items: uploadedItem })
                                        .then(() => {
                                            console.log(`insert supplier ${supplier} SUCCESS`);
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                }

                                // _.map(obj.items, (val, key) => {
                                //     if (!(val.supplier in supplierItems)) {
                                //         supplierItems[val.supplier].items = {};
                                //     }
                                //     supplierItems[val.supplier].items[key] = val;
                                // });                                
                                // console.log(supplierItems);
                                // supplierItems = _.map(supplierItems, (val, key) => {
                                //     return { ...val, supplierID: key };
                                // });
                                // console.log(supplierItems);
                                
                                // for (let supplier of supplierItems) {  
                                //     let supplierObj = {};
                                //     supplierObj[newOrderID] = supplier.items;                          
                                //     firebase.database().ref(`/suppliers/${supplier.supplierID}/supplier_order`).child(newOrderID).set({ ...obj, items: supplier.items })
                                //     .then(() => {
                                //         console.log(`insert supplier ${supplier.supplierID} SUCCESS`);
                                //     })
                                //     .catch((err) => {
                                //         console.log(err);
                                //     });
                                // }                         
                                console.log('PAYMENT SUCCESS!');
                                dispatch({ type: PAYMENT_SUCCESS });
                                Actions.pop();
                                Actions.pop();                                        
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);                
            });            
        dispatch({ type: MAKE_PAYMENT });
    };
};

export const orderHistoryFetch = () => {
    return (dispatch) => {
        dispatch({ type: ORDER_HISTORY_FETCH });
        const { user } = store.getState().auth;
        console.log('orderHistory Fetch here', user);
        firebase.database().ref(`/customer/${user.uid}/order`)
        .on('value', resp => {
            const allOrderHistory = resp.val();
            console.log('wutwut', resp.val());
            dispatch({ type: ORDER_HISTORY_FETCH_SUCCESS, payload: allOrderHistory });
        });
    };
};