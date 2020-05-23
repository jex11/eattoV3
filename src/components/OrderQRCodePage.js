import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import QRCode from 'react-native-qrcode';
import { orderQRfetch } from '../actions';
import { Spinner } from './common';

class OrderQRCodePage extends Component {
    constructor(props) {
        super(props);        
        this.props.orderQRfetch();
    }    

    render() {     
        console.log('this is props in render');
        console.log(this.props);   
        if (this.props.loading) {
            return <Spinner size='large' />;
        }
        if (this.props.orderQR === null) {
            return <Text>There is no order to redeem.</Text>;
        }
        return (            
            <View>
                <Text>{(this.props.orderQR !== null && this.props.user !== null) ? this.props.orderQR.orderID : ''}</Text>
                <View style={styles.container}>
                    <QRCode
                        value={(this.props.orderQR !== null && this.props.user !== null) ? this.props.orderQR.orderID : ''}
                        size={200}
                        bgColor='black'
                        fgColor='white'
                    />
                </View>                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 30

    },
 
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});

const mapStateToProps = state => {
    console.log('this is state');
    console.log(state.orderQR);
    const { loading, paid_order } = state.orderQR;
    // const obj = _.map(state.orderQR.paid_order, (val, orderID) => {
    //     return { ...val, orderID };
    // });   
    return { loading, orderQR: paid_order, user: state.auth.user };
};

export default connect(mapStateToProps, { orderQRfetch })(OrderQRCodePage);