import React, { Component } from 'react';
import { View, Text, ListView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, Card, CardSection, Confirm } from './common';
import CheckOutOrderListItem from './CheckOutOrderListItem';
import { makePayment } from '../actions';

class PaymentPage extends Component {
    constructor(props) {
        super(props);                        
        this.state = { showModal: false };
        console.log('We reach payment page');
        console.log(this.props);
        //this.createDataSource(this.props.payment);    
        // configure the manager
        // manager.configure(config);
    }

    onPay() {
        this.setState({ showModal: !this.state.showModal });
    }

    onAccept() {
        this.setState({ showModal: false });        
        this.props.makePayment(this.props.payment);        
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    // createDataSource({ items }) {
    //     console.log('We reach payment creating datasource');
    //     console.log(items);
    //     const ds = new ListView.DataSource({
    //         rowHasChanged: (r1, r2) => r1 !== r2
    //     });
    //     this.dataSource = ds.cloneWithRows(items);
    // } 

    renderRow({ item }) {        
        return (<CheckOutOrderListItem item={item} />);
    }

    render() {
        console.log('Payment Page on the go', this.props);
        const { total, items } = this.props.payment;
        const checkoutItems = _.map(items, (val, uid) => {        
            return { ...val, uid };
        });
        return (
            <View style={{ flex: 1 }}>
                <CardSection style={{ flex: 1 }}>
                    <FlatList 
                        style={{ flex: 1 }}
                        data={checkoutItems}
                        renderItem={this.renderRow}
                    />
                    {/* <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    /> */}
                </CardSection>
                <CardSection>
                    <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold' }}>Payment</Text>
                    <Text style={{ textAlign: 'right', fontSize: 20, fontWeight: 'bold' }}>{`RM ${total}`}</Text>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onPay.bind(this)}>Pay</Button>
                </CardSection>
                <Confirm 
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to pay?
                </Confirm>
            </View>
        );
    }
}

export default connect(null, { makePayment })(PaymentPage);