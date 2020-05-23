import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Spinner from 'react-native-number-spinner';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Card, CardSection, ListItemIconButton } from './common';
import { foodsFetch, changeFoodQuantity } from '../actions';

class CheckOutOrderListItem extends Component {
    render() {
        console.log('Check out Order List Item');     
        console.log(this.props);     
        const item = this.props.item;    
        
        return (
            <CardSection style={{ flexDirection: 'column', flex: 1 }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={styles.titleStyle}>
                        {item.name}
                    </Text>
                    <Text style={{ textAlign: 'right' }}>Qty. {item.quantity}</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={{ flex: 1 }}>Unit Price: RM{item.price}</Text>
                    <Text style={{ fontWeight: 'bold' }}>Subtotal: RM{item.quantity * item.price}</Text>
                </View>                
            </CardSection>                                                            
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,        
        flex: 1
    }
};

export default CheckOutOrderListItem;