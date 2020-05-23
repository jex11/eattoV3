import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { CardSection, Button, ListItemIconButton, AsyncImage } from './common';

class TruckListItem extends Component {
    constructor(props) {
        super(props);        
        this.state = { showModal: this.props.openModal };
    }   

    onRowPress() {        
        Actions.order({ selectedtruck: this.props.truck });
        //Actions.employeeEdit({ employee: this.props.employee });
    }

    render() {        
        const { truckname, trucklocation, truckimage, truckdetails, uid } = this.props.truck;        
        return (        
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View style={{ borderRadius: 5, flex: 1, backgroundColor: 'white', flexDirection: 'row', margin: 10 }}>
                    <AsyncImage style={{ borderBottomLeftRadius: 30, borderTopLeftRadius: 30, height: 100, width: 100 }} source={{ uri: truckimage }} placeholderColor='red' />
                    <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', flex: 1 }}>{truckname}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon style={{ marginRight: 5 }} type='AntDesign' name='star' size={16} color='#ffae42' />
                                <Text>{truckdetails.rating}</Text>
                            </View>
                        </View>
                        <View>
                            <Text>{truckdetails.expensive}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='location-pin' type='entypo' size={16} />
                            <Text>{trucklocation}</Text>
                        </View>
                    </View>
                    {/* <CardSection style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={styles.titleStyle}>
                            {truckname}
                        </Text>
                        <Icon style={{ flex: 1 }} size={30} name='info-with-circle' type='entypo' onPress={() => this.props.triggerOpenModal(this.props.truck)} />
                    </CardSection>                     */}
                </View>                
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15,
        flex: 2
    }
};

export default TruckListItem;