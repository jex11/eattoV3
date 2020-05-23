import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { Input, Button, SocialIcon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Spinner } from './common';
import { sharedStyles } from '../GlobalVariables';

class LoginForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress(loginType) {   
        console.log('ggwp login');
        const { email, password } = this.props;
        if (loginType === 2) {
            console.log('google signin...');
            GoogleSignin.configure();
            this.props.loginUser({ email, password }, loginType);
        } else {
            this.props.loginUser({ email, password }, loginType);
        }                        
    }

    renderError() {
        if (this.props.error) {
            return (
                <View>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );            
        }
    }

    renderExternalLoginButton() {
        if (this.props.loading) {
            return <Spinner size='large' />;
        }

        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <SocialIcon style={{ width: 50, height: 50, borderRadius: 50 }} iconSize={30} type='facebook' onPress={() => this.onButtonPress(1)} />
                <SocialIcon style={{ backgroundColor: 'red', width: 50, height: 50, borderRadius: 50 }} iconSize={30} type='google' onPress={() => this.onButtonPress(2)} />
                <SocialIcon type='twitter' onPress={() => this.onButtonPress(3)} />
            </View>
        );
    }

    renderButton() {
        console.log(this.props);
        if (this.props.loading) {
            return <CardSection><Spinner size='large' /></CardSection>;
        }

        return (
            <View>
                <CardSection>                    
                    <Button title='Login' type='outline' containerStyle={{ flex: 1 }} onPress={() => this.onButtonPress(0)} />
                </CardSection>
                <CardSection>                    
                    {/* <Button title='Facebook' containerStyle={{ flex: 1 }} onPress={this.onButtonPress.bind(this)} /> */}
                    <Icon.Button name="facebook" backgroundColor="#3b5998" containerStyle={{ flex: 1 }} onPress={() => this.onButtonPress(1)}>
                        <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white' }}>Login with Facebook</Text>
                    </Icon.Button>
                </CardSection>
                <CardSection>
                    <GoogleSigninButton
                        style={{ width: 192, height: 48 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Light}
                        onPress={() => this.onButtonPress(2)}
                        //disabled={this.state.isSigninInProgress} 
                    />
                    {/* <Button title='Google' containerStyle={{ flex: 1 }} onPress={this.onButtonPress.bind(this)} /> */}
                    {/* <Icon.Button name="google" backgroundColor='#db4a39' containerStyle={{ flex: 1 }} onPress={() => this.onButtonPress(2)}>
                        <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white' }}>Login with Google</Text>
                    </Icon.Button> */}
                </CardSection>
                <CardSection>                    
                    {/* <Button title='Google' containerStyle={{ flex: 1 }} onPress={this.onButtonPress.bind(this)} /> */}
                    <Icon.Button name="twitter" backgroundColor='#1DA1F2' containerStyle={{ flex: 1 }} onPress={() => this.onButtonPress(3)}>
                        <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white' }}>Login with Twitter</Text>
                    </Icon.Button>
                </CardSection>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#dedede', flexDirection: 'column' }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ marginTop: 40, marginLeft: 15, fontFamily: sharedStyles.primaryFontFamily, fontSize: 28 }}>Log in to your account</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Input containerStyle={{ }} inputStyle={{ fontFamily: sharedStyles.primaryFontFamily }} inputContainerStyle={{ borderBottomWidth: 0, backgroundColor: 'white', borderRadius: 50 }} leftIcon={{ type: 'feather', name: 'mail', marginRight: 10 }} placeholder='Email' onChangeText={this.onEmailChange.bind(this)} value={this.props.email} />
                    <Input inputStyle={{ fontFamily: sharedStyles.primaryFontFamily }} containerStyle={{ marginTop: 10 }} inputContainerStyle={{ borderBottomWidth: 0, backgroundColor: 'white', borderRadius: 50 }} leftIcon={{ type: 'feather', name: 'lock', size: 20, marginRight: 10 }} secureTextEntry placeholder='Password' onChangeText={this.onPasswordChange.bind(this)} value={this.props.password} />                    
                    <Button loading={this.props.loading} titleStyle={{ fontFamily: sharedStyles.primaryFontFamily }} buttonStyle={[sharedStyles.basicButtonStyle, { marginLeft: 10, marginRight: 10, marginTop: 20, borderRadius: 50 }]} onPress={() => this.onButtonPress(0)} title='Login' />
                    {this.renderError()}
                </View>               
                <View style={{ flex: 1 }}>
                    {/* <Icon.Button containerStyle={{ borderRadius: 50 }} name="facebook" backgroundColor="#3b5998" onPress={() => this.onButtonPress(1)} />                    
                    <Icon.Button name="twitter" backgroundColor='#1DA1F2' containerStyle={{ flex: 1 }} onPress={() => this.onButtonPress(3)} />                     */}
                    {this.renderExternalLoginButton()}
                </View>                 
            </View>
            // <Card>
            //     <CardSection>
            //         <Input leftIcon={{ type: 'font-awesome', name: 'envelope', marginRight: 10 }} placeholder='Email' onChangeText={this.onEmailChange.bind(this)} value={this.props.email} />
            //     </CardSection>

            //     <CardSection>
            //         <Input leftIcon={{ type: 'entypo', name: 'key', marginRight: 10 }} secureTextEntry placeholder='Password' onChangeText={this.onPasswordChange.bind(this)} value={this.props.password} />
            //     </CardSection>
            //     {this.renderError()}
            //     {this.renderButton()}
            // </Card>
        );
    }    
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error, 
        loading: state.auth.loading
    };
};

export default connect(mapStateToProps, { 
    emailChanged, passwordChanged, loginUser 
})(LoginForm);