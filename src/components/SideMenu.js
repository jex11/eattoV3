import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { persistor } from '../../src/configureStore';
import { CardSection } from './common';
import { logoutUser } from '../actions';
import { sharedStyles } from '../shared/GlobalStyling';

const profilePhoto = require('../images/unknown.jpg');

class SideMenu extends Component {
    // constructor(props) {
    //     super(props);
    // }    
    onButtonPress() {
        //this.props.logoutUser(persistor);
        persistor.purge();
        Actions.reset('auth');
    }

    renderAvatar() {
        if (this.props.user.profile_pic) {
            return (
                <Avatar
                    size='medium'
                    rounded
                    source={{ uri: this.props.user.profile_pic }}
                    activeOpacity={0.7}
                />
            );
        }
        return (
            <Avatar
                size='medium'
                rounded
                source={profilePhoto}
                activeOpacity={0.7}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }} >
                    {this.renderAvatar()}
                    <View style={{ flex: 1, margin: 10, justifyContent: 'center' }}>
                        <Text>Hi, {this.props.user.user_name || this.props.user.email.split('@')[0]}</Text>
                    </View>
                </View>
                <View style={{ padding: 5, flex: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>Profile</Text>
                    {/* <FlatList
                        data={list}
                        renderItem={this.renderRow}
                        keyExtractor={item => item.name}
                    /> */}
                </View>
                <View><Text style={{ margin: 5, textAlign: 'center' }}>v 1.0</Text></View>
                <View>
                    <Button buttonStyle={sharedStyles.basicButtonStyle} justifyContent='flex-end' onPress={this.onButtonPress.bind(this)} title='Logout' />
                </View>
                {/* <CardSection>
                    {this.renderAvatar()}
                </CardSection>
                <CardSection style={{ flex: 1 }}>               
                    <Text>Hi, { this.props.user.user_name || this.props.user.email.split('@')[0]}</Text>
                </CardSection>                
                <CardSection>
                    <Button justifyContent='flex-end' onPress={this.onButtonPress.bind(this)}>Logout</Button>
                </CardSection>    */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        // backgroundColor: '#D8D7E9',
        paddingTop: 10,
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 10,
    },

});

const mapStateToProps = state => {
    return {
        //username: state.auth.user.name,
        user: state.auth.user
    };
};

export default connect(mapStateToProps, { logoutUser })(SideMenu);