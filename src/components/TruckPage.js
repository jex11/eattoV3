import React, { Component } from 'react';
import { FlatList, ListView, View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { SearchBar } from 'react-native-elements';
import { trucksFetch } from '../actions';
import TruckListItem from './TruckListItem';
import { CardSection, InfoModal, Confirm, Card, Button, Spinner } from './common';
import { sharedStyles } from '../GlobalVariables';
import TruckCard from './TruckCard';

class TruckPage extends Component {
    constructor(props) {
        super(props);        
        this.state = { showModal: false, truckDetail: {} };
        //this.openInfoModal = this.openInfoModal.bind(this);
        this.props.trucksFetch();
        //this.createDataSource(this.props);
        
        // configure the manager
        // manager.configure(config);
    }        

    // componentWillReceiveProps(nextProps) {
    //     console.log('WillReceiveProps:');
    //     this.createDataSource(nextProps);        
    // }
    
    onClose() {
        this.setState({ showModal: false });
    }

    onAccept() {
        this.setState({ showModal: false });        
        //this.props.makePayment(this.props.payment);        
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    openInfoModal = (x) => {
        this.setState({ showModal: true, truckDetail: x });  
    }    

    // createDataSource({ trucks }) {
    //     const ds = new ListView.DataSource({
    //         rowHasChanged: (r1, r2) => r1 !== r2
    //     });
    //     this.dataSource = ds.cloneWithRows(trucks);
    // }   

    renderTrucks() {        
        if (this.props.loading) {
            return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Spinner size='large' /></View>;
        }
        return (
            <View style={{ flex: 1 }}>                
                
                <FlatList 
                    style={{ flex: 1 }}
                    data={this.props.trucks}
                    renderItem={this.renderRow}
                />
                {/* <FlatList
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                /> */}
                <InfoModal
                    visible={this.state.showModal}
                    details={this.state.truckDetail}
                    onClose={this.onClose.bind(this)}
                >
                    Truck Info
            </InfoModal>
            </View>
        );
    }

    renderPopularTrucks(popularTruck) {
        if (this.props.loading) {
            return <View style={{ justifyContent: 'center', alignItems: 'center' }}><Spinner size='large' /></View>;
        }
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ flex: 1, marginTop: 5 }}
                    data={this.props.trucks}
                    renderItem={this.renderPopularTruckRow}           
                    horizontal      
                    showsHorizontalScrollIndicator={false}   
                />
                {/* <FlatList
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                /> */}
                {/* <InfoModal
                    visible={this.state.showModal}
                    details={this.state.truckDetail}
                    onClose={this.onClose.bind(this)}
                >
                    Truck Info
            </InfoModal> */}
            </View>
        );        
    }

    renderPopularTruckRow = ({ item }) => {
        return (<TruckCard truck={item} />);
    }

    renderRow = ({ item }) => {
        return (<TruckListItem truck={item} openModal={this.state.showModal} triggerOpenModal={this.openInfoModal.bind(this)} />);
    }    

    render() {     
        const popularTruck = [
            { name: 'Happy Truck', image: 'https://media-cdn.tripadvisor.com/media/photo-s/0b/c9/be/d7/highest-diner-atop-the.jpg', description: 'halal', rating: 4.1 }, 
            { name: 'Sad Truck', image: 'https://media-cdn.tripadvisor.com/media/photo-s/0c/0e/61/91/cafe-amore.jpg', description: 'non-halal', rating: 5.0 },
            { name: 'Sunny Truck', image: 'https://www.visionkl.com/wp-content/uploads/2019/02/Pokok-KL_POKOK-Interior-1.jpg', description: 'halal', rating: 2.8 },
        ];     
        return (
            <View style={{ flex: 1 }}>
                {/* <View>
                    <SearchBar                    
                    placeholder="Type Here..."
                    lightTheme
                    round
                    platform='android'
                    //onChangeText={text => this.searchFilterFunction(text)}
                    autoCorrect={false}
                />
                </View> */}
                {/* <View style={{ flex: 1 }}>
                    <Text style={[sharedStyles.basicTitleStyle, { margin: 5 }]}>Popular Truck</Text>
                    {this.renderPopularTrucks(popularTruck)}
                </View> */}
                <View style={{ flex: 1 }}>
                    <Text style={[sharedStyles.basicTitleStyle, { margin: 5 }]}>New Truck</Text>
                    {this.renderTrucks()}
                </View>
            </View>                     
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

const mapStateToProps = state => {
    const trucks = _.map(state.truck.truck_list, (val, uid) => {
        return { ...val, uid };
    });
    return { trucks, loading: state.truck.loading };
};

export default connect(mapStateToProps, { trucksFetch })(TruckPage);