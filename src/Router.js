import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import { store } from '../src/configureStore';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import TruckPage from './components/TruckPage';
import HistoryPage from './components/HistoryPage';
import OrderQRCodePage from './components/OrderQRCodePage';
import OrderPage from './components/OrderPage';
import OrderPage2 from './components/OrderPage2';
import PaymentPage from './components/PaymentPage';
import SideMenu from './components/SideMenu';
import TabIcon from './components/TabIcon';
import { sharedStyles } from './GlobalVariables';

const RouterComponent = () => {
    const { user } = store.getState().auth;
    return (
        <Router backAndroidHandler={onBackPress}>
            <Scene key="root">
                <Scene key="auth" hideNavBar>
                    <Scene key="login" component={LoginForm} title="Please Login" />                    
                </Scene>                
                {/* <Scene
                    drawer drawerIcon={<Icon name='list' color={sharedStyles.secondaryColor} />} drawerWidth={250} hideNavBar
                    drawerPosition='left' contentComponent={SideMenu}
                    key="main" titleStyle={styles.headerTitleStyle}
                    navigationBarStyle={styles.navBarStyle} initial={user}
                >
                    <Scene
                        key='dashboard'
                        rightButtonTextStyle={styles.headerTitleStyle}
                        tabs showLabel={false}
                        tabBarStyle={styles.tabBarStyle}
                        rightTitle="Redeem" onRight={() => Actions.qrcode()}
                    >
                        <Scene key="home" component={HomePage} title="Home" iconName='home' icon={TabIcon} />
                        <Scene key="truck" component={TruckPage} title="Truck" iconName='truck' iconType='font-awesome' icon={TabIcon} />                        
                        <Scene key="history" component={HistoryPage} title="History" iconName='history' icon={TabIcon} />
                    </Scene>
                </Scene> */}
                <Scene
                    drawer drawerIcon={<Icon name='list' color={sharedStyles.secondaryColor} />} drawerWidth={250} hideNavBar
                    drawerPosition='left' contentComponent={SideMenu}
                    key="main" titleStyle={sharedStyles.pageTitleStyle}
                    navigationBarStyle={styles.navBarStyle} initial={user}
                >
                    <Scene
                        key='dashboard'
                        rightButtonTextStyle={sharedStyles.pageTitleStyle}
                        tabs showLabel={false}
                        tabBarStyle={styles.tabBarStyle}                                                
                        rightTitle="Redeem" onRight={() => Actions.qrcode()}
                        activeBackgroundColor={sharedStyles.secondaryColor}
                    >
                        <Scene key="home" component={HomePage} title="Home" iconName='home' icon={TabIcon} activeBackgroundColor='red' />
                        <Scene key="truck" component={TruckPage} title="Truck" iconName='truck' iconType='font-awesome' icon={TabIcon} initial />                        
                        <Scene key="history" component={HistoryPage} title="History" iconName='history' icon={TabIcon} />
                    </Scene>
                </Scene>
                <Scene key="order" hideNavBar component={OrderPage2} title='Order' />
                <Scene key="payment" component={PaymentPage} title="Payment" />                
                <Scene key="qrcode" component={OrderQRCodePage} title="Order QR Code" />
            </Scene>
        </Router>
    );
};

const onBackPress = () => {    
    if (Actions.state.index === 0) {
        return false;
    }
    Actions.pop();
    return true;
};

const styles = {    
    navBarStyle: {
        backgroundColor: sharedStyles.primaryColor                
    },
    tabBarStyle: {
        backgroundColor: sharedStyles.primaryColor,
        color: 'red'
    },
    headerTitleStyle: {
        color: 'black'    
    }
};

export default RouterComponent;