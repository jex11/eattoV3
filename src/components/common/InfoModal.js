import React from 'react';
import { Text, View, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Icon } from 'react-native-elements';
import { CardSection } from './CardSection';
import { Button } from './Button';
import { Card } from './Card';

const InfoModal = ({ children, visible, details, onClose }) => {
    const { containerStyle, textStyle, cardSectionStyle } = styles;

    return (        
        <Modal isVisible={visible} backdropColor='rgba(0, 0, 0, 0.75)' onBackdropPress={onClose}>
            <View style={containerStyle}>
                <CardSection style={{}}>
                    <Text style={{ flex: 1, fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Truck Info</Text>
                    <Icon style={{ alignItems: 'center', position: 'absolute', right: 0 }} name='close' onPress={onClose} />
                    {/* <TouchableOpacity style={{ height: 30, width: 30, borderRadius: 30, alignItems: 'center', position: 'absolute', right: 0, backgroundColor: 'red' }} onPress={onClose}>
                        <Text style={{ textAlignVertical: 'center' }}>X</Text>
                    </TouchableOpacity> */}
                    
                </CardSection>
                <CardSection style={cardSectionStyle}>
                    <Text style={textStyle}>Truck Name: {details.truckname}</Text>
                </CardSection>
                <CardSection style={cardSectionStyle}>
                    <Text style={textStyle}>Location: {details.trucklocation}</Text>
                </CardSection>
                <CardSection style={cardSectionStyle}>
                    <Text style={textStyle}>Contact: {details.truckphone}</Text>
                </CardSection>
                <CardSection style={{ position: 'absolute', bottom: 0 }}>
                    <Button onPress={onClose}>Close</Button>
                </CardSection>                
            </View>
        </Modal>
        // <Modal                        
        //     visible={visible}
        //     onBackdropPress={onClose}
        //     style={containerStyle}
        // >
            // <View>
            //     <CardSection style={cardSectionStyle}>
            //         <Text style={textStyle}>{details.truckname}</Text>
            //     </CardSection>
            //     <CardSection style={cardSectionStyle}>
            //         <Text style={textStyle}>{details.trucklocation}</Text>
            //     </CardSection>
            //     <CardSection style={cardSectionStyle}>
            //         <Text style={textStyle}>{details.truckphone}</Text>
            //     </CardSection>
            //     <CardSection>
            //         <Button onPress={onClose}>Close</Button>
            //     </CardSection>
            // </View>
        // </Modal>
        // <Modal
        //     animationType="slide"
        //     onRequestClose={onClose}
        //     transparent
        //     visible={visible}            
        // >
        //     <View style={containerStyle}>
        //         <CardSection style={cardSectionStyle}>
        //             <Text style={textStyle}>{details.truckname}</Text>
        //         </CardSection>
        //         <CardSection style={cardSectionStyle}>
        //             <Text style={textStyle}>{details.trucklocation}</Text>
        //         </CardSection>
        //         <CardSection style={cardSectionStyle}>
        //             <Text style={textStyle}>{details.truckphone}</Text>
        //         </CardSection>
        //         <CardSection>
        //             <Button onPress={onClose}>Close</Button>
        //         </CardSection>
        //     </View>                                        
        // </Modal>
    );        
};

const styles = {
    cardSectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    containerStyle: {
        backgroundColor: 'white',
        position: 'relative',
        flex: 1,
        // justifyContent: 'top',
        marginTop: 10,
        marginBottom: 50,
        marginLeft: 5,
        marginRihgt: 5
    }
};

export { InfoModal };