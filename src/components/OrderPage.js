import React, { Component } from 'react';
import { ListView, Text, View } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Button, Card, CardSection, Confirm, Spinner } from './common';
import OrderListItem from './OrderListItem';
import { foodsFetch, changeFoodQuantity, proceedOrder } from '../actions';

class OrderPage extends Component {
    constructor(props) {
        super(props);
        console.log('OrderPage de constructor');
        this.state = { showModal: false, totalAmount: 0 };
        this.props.foodsFetch(this.props.selectedtruck);
        this.createDataSource(this.props);   
        console.log('phantom', this.props);
        // configure the manager
        // manager.configure(config);
    }            
    onProceed() {    
        this.setState({ showModal: !this.state.showModal });
    }

    onAccept() {
        this.setState({ showModal: false });
        this.props.proceedOrder(this.props.order, this.props.user);        
    }

    onDecline() {
        this.setState({ showModal: false });
    }  

    getDerivedStateFromProps(nextProps, prevState) {        
        console.log('Order WillReceiveProps:', prevState);
        this.createDataSource(nextProps);
        const updatedOrder = nextProps.order;
        console.log(nextProps);
        let sum = 0;
        if (updatedOrder.length > 0) {
            updatedOrder.forEach((value) => {
                sum += value.quantity * value.price;
            });
            this.setState({ totalAmount: sum });
        }
    }        

    createDataSource({ order }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(order);
    }    

    renderMenu() {
        // if (this.props.order.length <= 0) {
        //     return <Text>There is no item in this menu.</Text>;
        // }
        // return (
        //     <View>
        //         <CardSection style={{ flex: 1 }}>
        //             <ListView
        //                 enableEmptySections
        //                 dataSource={this.dataSource}
        //                 renderRow={this.renderRow}
        //             />
        //         </CardSection>
        //         <CardSection>
        //             <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold' }}>Total:</Text>
        //             <Text style={{ fontSize: 20, fontWeight: 'bold' }}>RM {this.state.totalAmount}</Text>
        //         </CardSection>
        //         <CardSection style={{ justifyContent: 'flex-end' }}>
        //             <Button onPress={this.onProceed.bind(this)}>Proceed</Button>
        //         </CardSection>
        //         <Confirm
        //             visible={this.state.showModal}
        //             onAccept={this.onAccept.bind(this)}
        //             onDecline={this.onDecline.bind(this)}
        //         >
        //             Are you sure you want to make this order?
        //         </Confirm>
        //     </View>
        // );
    }

    renderRow(item) {        
        return (<OrderListItem item={item} />);
    }

    renderResult() {
        if (this.props.order.loading) {
            return (<Spinner size='large' />);
        }     
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );   
    }

    render() {        
        return (
            <View style={{ flex: 1 }}>
                <CardSection>
                    <Text>Food Menu</Text>
                </CardSection>
                <CardSection style={{ flex: 1 }}>
                    {this.renderResult()}
                </CardSection>
                <CardSection>
                    <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold' }}>Total:</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>RM {this.state.totalAmount}</Text>
                </CardSection>
                <CardSection style={{ justifyContent: 'flex-end' }}>
                    <Button onPress={this.onProceed.bind(this)}>Proceed</Button>
                </CardSection>
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
    console.log('ini kalilah', state.order);
    return { order: state.order, user: state.auth.user };
};

export default connect(mapStateToProps, { 
    foodsFetch, proceedOrder
})(OrderPage);