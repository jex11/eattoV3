import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { CardSection, ListItemIconButton, AsyncImage } from './common';

class TruckCard extends Component {
    constructor(props) {
        super(props);        
        console.log('TruckCard');
        console.log(props);
        //this.state = { showModal: this.props.openModal };
    }   

    onRowPress() {
        console.log(this.props.truck);
        //Actions.order({ selectedtruck: this.props.truck });
        //Actions.employeeEdit({ employee: this.props.employee });
    }

    render() {  
        console.log('must sure');
        console.log(this.props);      
        const { truckname, trucklocation, truckimage, truckdetails, uid } = this.props.truck;
        return (                    
            <TouchableWithoutFeedback style={{ borderRadius: 5 }}>
                <View style={{ borderRadius: 10, marginLeft: 5, marginRight: 5 }}>
                    <AsyncImage style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, margin: 0, padding: 0, height: 100, width: 150 }} source={{ uri: truckimage }} placeholderColor='red' />
                    <View style={{ backgroundColor: 'white', padding: 5, flex: 1, flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ flex: 1, fontWeight: 'bold' }}>
                                {truckname}
                            </Text>
                            <Text style={{ }}>
                                {truckdetails.expensive}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ flex: 1 }}>{trucklocation}</Text>
                            <Icon type='AntDesign' name='star' size={18} color='#ffae42' />
                            <Text style={{ }}>{truckdetails.rating}</Text>
                        </View>                
                    </View>                    
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default TruckCard;