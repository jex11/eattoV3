import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class HomePage extends Component {
    constructor(props) {
        super(props);        
        console.log(this.props);
    }    

    render() {        
        return (
            <View>
                <Text>Home</Text>
            </View>
        );
    }
}

export default HomePage;