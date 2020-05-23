import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Footer extends Component {
    render() {
        return (
            <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>{this.props.headerText}</Text>
            </View>          
          
        );
      }
}

const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },        
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'        
    },
   textStyle: {
       fontSize: 20,
       color: 'white'
   }
});
