import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import Spinner from 'react-native-number-spinner';
import { connect } from 'react-redux';
import _ from 'lodash';
import firebase from 'firebase';
import { CardSection, ListItemIconButton, AsyncImage } from './common';
import { foodsFetch, changeFoodQuantity } from '../actions';

class OrderListItem extends Component {
    constructor(props) {
        super(props);
        this.state = { x: false };                
    }

    onQuantityChange = (uid, num) => {                
        this.props.changeFoodQuantity(uid, num);        
    }

    render() {
        console.log('Order List Item');     
        console.log(this.props);     
        const item = this.props.item;                        
        return (                  
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <AsyncImage style={{ height: 100, width: 100 }} source={{ uri: item.img }} placeholderColor='red' />                
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <Text style={styles.titleStyle}>
                        {item.name}
                    </Text>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={styles.priceTextStyle}>
                            {`RM ${item.price}`}
                        </Text>
                        <View>
                            <Spinner color='#ffa500' value={item.quantity} onNumChange={(num) => { this.onQuantityChange(item.uid, num); }} />
                        </View>
                    </View>
                </View>                               
            </View>        
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18, 
        flex: 1,
        margin: 5,
        fontWeight: 'bold'
    },
    priceTextStyle: {
        fontSize: 18,
        flex: 1,
        margin: 5
    }
};

const mapStateToProps = state => {    
    const order = _.map(state.order.menu_items, (val, uid) => {        
        return { ...val, uid };
    });

    return { order };
};

export default connect(mapStateToProps, { 
    changeFoodQuantity 
})(OrderListItem);