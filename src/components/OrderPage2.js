import React, { Component } from 'react';
import { ListView, Text, View, FlatList, Dimensions } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { Card, CardSection, Confirm, Spinner, AsyncImage } from './common';
import OrderListItem2 from './OrderListItem2';
import { foodsFetch, changeFoodQuantity, proceedOrder } from '../actions';

class OrderPage2 extends Component {                
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.order) {
            let sum = 0;
            const updatedOrder = nextProps.order.menu_items;
            if (updatedOrder && updatedOrder.length > 0) {
                updatedOrder.forEach((value) => {
                    sum += value.quantity * value.price;
                });                
            }
            return { totalAmount: sum };
        }
        // if (nextProps.order !== prevState.order) {
        //     console.log('5. getDerivedStateFromProps prevState', prevState);
        //     console.log('6. getDerivedStateFromProps nextProps', nextProps);
        //     if (nextProps.order) {
        //         if (!prevState.menu_list) {
        //             console.log('7. don come in, its gg');
        //             return { menu_list: nextProps.order.menu_items };
        //         }
        //         if (prevState.menu_list !== nextProps.menu_list) {
        //             return { menu_list: nextProps.order.menu_items, loading: nextProps.order.loading };
        //         }              
        //     }
        //     //         let firebaseRef=prevState.firebaseRef;

        //     //         firebaseRef.off("value"); //Turn off the connection to previous path.

        //     //   //       We can't do this here as we can't access `this` inside this method.
        //     //   //       firebaseRef=firebase.database().ref(nextProps.path);
        //     //   //       this.setState({firebaseRef, path :nextProps.path });
        //     //   //       this.getData(firebaseRef);

        //     //         return {path : nextProps.path};
        // } else {
        //     console.log('5. getDerivedStateFromProps prevState else', prevState);
        //     console.log('6. getDerivedStateFromProps nextProps else', nextProps);
        //     return null;
        // }
    }    

    constructor(props) {
        super(props);       
        this.state = { showModal: false, totalAmount: 0 };
        this.props.foodsFetch(this.props.selectedtruck);
    }   

    // componentDidMount() {
    //     console.log('OrderPage2 compoenentDidMount');
    // }    

    // componentDidUpdate(prevProps, prevState) {
    //     console.log('OrderPage2 componentDidUpdate prevProps', prevProps);
    //     console.log('OrderPage2 componentDidUpdate prevState', prevState);
    //     if (prevState.path !== this.state.path) {
    //         console.log('OrderPage2 componentDidUpdate', prevProps);
    //         console.log('heelo dis is prevState', prevState);
    //     }
    // }

    onProceed() {    
        this.setState({ showModal: !this.state.showModal });
    }

    onAccept() {
        this.setState({ showModal: false });
        this.props.proceedOrder(this.props.order.menu_items, this.props.user);        
    }

    onDecline() {
        this.setState({ showModal: false });
    }  

    renderRow({ item }) {                
        return (<OrderListItem2 item={item} />);
    }    

    render() {
        const dimensions = Dimensions.get('window');
        let imgHeight = (dimensions.width * 9) / 16;
        const imageHeight = Math.round(imgHeight);
        const imageWidth = dimensions.width;
        const [index, setIndex] = React.useState(0);
        const [routes] = React.useState([
            { key: 'first', title: 'First' },
            { key: 'second', title: 'Second' },
        ]);
     
        const initialLayout = { width: Dimensions.get('window').width };
        console.log('Order Page2 render', this.state);
        console.log('Order Page2 render2', this.props);
        if (this.props.order.loading) {
            return <Spinner size='large' />;
        }
        return (            
            <View style={{ flex: 1, backgroundColor: 'blue' }}>
                <AsyncImage style={{ margin: 0, padding: 0, width: 355, height: 200 }} source={{ uri: 'https://www.feinberg.northwestern.edu/sites/neurosurgery/images/360x200.gif' }} placeholderColor='red' />
                <View style={{ flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: 'white' }}>
                    <Text>Order Page 2</Text>
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.props.order.menu_items}
                        renderItem={this.renderRow}
                    />
                    <View>
                        <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold' }}>Total:</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>RM {this.state.totalAmount}</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <Button onPress={this.onProceed.bind(this)} title='Proceed' />
                    </View>
                </View>
                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to make this order?
                </Confirm>
            </View>
        );
    }
}

const mapStateToProps = state => {   
    console.log('itechies', state);
    return { order: state.order, user: state.auth.user };
};

export default connect(mapStateToProps, { 
    foodsFetch, proceedOrder
})(OrderPage2);