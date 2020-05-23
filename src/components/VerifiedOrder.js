import React, { Component } from 'react';
import { Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './common';
import RedeemOrderListItem from './RedeemOrderListItem';

class VerifiedOrder extends Component {
    constructor(props) {
        super(props);
        //this.state = { isLoaded: false };
        console.log('constructor');
        console.log(this.props);
        this.createDataSource(this.props.verifyOrder.order);
    }  

    componentWillReceiveProps(nextProps) {
        console.log('Order WillReceiveProps:');
        console.log(nextProps);
        this.createDataSource(nextProps.verifyOrder.order);        
    }    

    createDataSource({ doneOrder }) {
        console.log(doneOrder);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        
        this.dataSource = ds.cloneWithRows(doneOrder);
    }
    
    renderRow(item) {        
        return (<RedeemOrderListItem item={item} />);
    }    

    render() {
        return (
            <Card>
                <CardSection>
                    <Text>{`Order ID: ${this.props.verifyOrder.order.orderID}`}</Text>
                </CardSection>
                <CardSection>
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}                        
                    />
                </CardSection>
                <CardSection>
                    <Button>Redeem</Button>
                </CardSection>                                
            </Card>
        );
    }
}

const mapStateToProps = state => {
    console.log('state');
    console.log(state);
    return {
        verifyOrder: state.verifyOrder        
    };
};

export default connect(mapStateToProps, {})(VerifiedOrder);