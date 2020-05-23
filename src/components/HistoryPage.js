import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { orderHistoryFetch } from '../actions';
import { Spinner } from './common';

class HistoryPage extends Component {
    constructor(props) {
        super(props);                
        this.props.orderHistoryFetch();       
    }
    
    renderRow = ({ item }) => {
        console.log('Render History Row');        
        console.log(item);
        return (<Text>{item.orderID}</Text>);
    }  

    renderHistoryList() {
        console.log('renderHistoryList', this.props);
        if (this.props.loading) {
            console.log('loading 99');
            return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Spinner size='large' /></View>;
        } else if (this.props.orderHistory || this.props.orderHistory.length > 0) {
            console.log('Gt record now');
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.props.orderHistory}
                        renderItem={this.renderRow}
                    />
                </View>              
            );
        } 
        console.log('cannot find history la');
        return (
            <View style={{ flex: 1 }}>
                <Text>No order history found.</Text>
            </View>
        );
    }

    render() {
        console.log('huh wat?', this.props.orderHistory);
        return (
            <View style={{ flex: 1 }}>
                {this.renderHistoryList()}                           
            </View>
        );
    }
}

const mapStateToProps = state => {   
    console.log('check check 1st', state);
    return { orderHistory: _.map(state.order.history, (val, key) => {        
        return { ...val, orderID: key };
    }), 
    loading: state.order.loading,
    user: state.auth.user };
};

export default connect(mapStateToProps, { 
    orderHistoryFetch
})(HistoryPage);