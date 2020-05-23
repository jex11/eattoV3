import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import OAuthManager from 'react-native-oauth';
import { AsyncStorage } from 'react-native';
import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS, 
    LOGIN_USER_FAIL, 
    LOGIN_USER 
} from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

/* #region Login */
export const loginUser = ({ email, password }, loginType) => {
    return (dispatch) => {
        console.log('so what now', loginType);
        if (loginType === 0) {
            dispatch({ type: LOGIN_USER });
            loginInternally({ email, password }, loginType, dispatch);
        } else {
            const config = {
                twitter: {
                  consumer_key: 'GsZv6fK6nu6QdiSkchLGuHPBW',
                  consumer_secret: 'HKW6syFyDhH3B0mHoLXsWYs83AGG0H3VFMiHKx9vcozFA6rQhJ'
                },
                // google: {
                //     callback_url: '	http://localhost/google',
                //     client_id: '460025825501-jb1268g9g3dk4okuj8mimc2tfmgv7ah9.apps.googleusercontent.com',
                //     client_secret: 'mirl-5mlRRfkqQzSgkaZvFLz'
                // },
                facebook: {
                  client_id: '1761291173997867',
                  client_secret: '6f241618429bba78151017f330e8003d'
                }
              };
              // Create the manager
              const manager = new OAuthManager('eattov2');
              // configure the manager
              manager.configure(config);
            if (loginType === 1) {
                loginFacebook(dispatch, manager);
            } else if (loginType === 2) {
                loginGoogle(dispatch, manager);
            } else if (loginType === 3) {
                loginTwitter(dispatch, manager);
            }
        }            
    };    
};

const loginInternally = ({ email, password }, loginType, dispatch) => {
    console.log('not sure what happen now');
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(resp => {
            console.log('log in internally');
            console.log(resp);
            loginUserSuccess(dispatch, resp.user);
        })
        .catch((error) => {
            console.log(error);

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => { loginUserSuccess(dispatch, user); })
                .catch((error2) => {
                    console.log(error2);
                    loginUserFail(dispatch);
                });
        });
};

const loginFacebook = (dispatch, manager) => {    
    //loginUserFail(dispatch, 'Login method not yet implemented.');
    manager.authorize('facebook').then(resp => { 
        console.log(resp); 
        const credential = firebase.auth.FacebookAuthProvider.credential(resp.response.credentials.accessToken);
        firebase.auth().signInWithCredential(credential)
            .then((response) => {
                console.log('firebase auth success');
                console.log(response);
                loginUserSuccess(dispatch, response);
            }).catch((error) => {
                console.log('Failed inner');
                loginUserFail(dispatch, error.message);
            });      
    }).catch(err => {
        console.log('Failed outer');
        console.log(err);
        loginUserFail(dispatch, err.message);
    });


    // LoginManager.logInWithReadPermissions(['public_profile', 'user_friends', 'email'])
    //   .then(
    //     (result) => {
    //       if (result.isCancelled) {
    //         console.log('Whoops!', 'You cancelled the sign in.');
    //       } else {
    //         AccessToken.getCurrentAccessToken()
    //           .then((data) => {
    //             console.log('getCurrentAccessToken success');
    //             console.log(data);
    //             const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    //             firebase.auth().signInWithCredential(credential)
    //               .then((resp) => { 
    //                   console.log('firebase auth success');
    //                   console.log(resp);
    //                   loginUserSuccess(dispatch, resp);
    //             }).catch((error) => {
    //                 loginUserFail(dispatch, error.message);
    //               });
    //           });
    //       }
    //     },
    //     (error) => {
    //       console.log('Sign in error', error);
    //     },
    //   );    
};

const signInGoogleExternally = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();  
      console.log(userInfo);
      return userInfo;
      //this.setState({ userInfo });
    } catch (error) {
        console.log('gg');
        console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

const loginGoogle = (dispatch, manager) => {
    //loginUserFail(dispatch, 'Login method not yet implemented.'); 
    console.log('google signing in');
    signInGoogleExternally().then(resp => {
        console.log('this is loginGoogle with success response...');
        console.log(resp);    
        if (resp) {
            const credential = firebase.auth.GoogleAuthProvider.credential(resp.idToken, resp.accessToken);
            firebase.auth().signInWithCredential(credential)
                .then((response) => {
                    console.log('firebase auth success');
                    console.log(response);
                    loginUserSuccess(dispatch, response);
                }).catch((error) => {
                    loginUserFail(dispatch, error.message);
                });        
        }        
    }).catch(err => { loginUserFail(dispatch, err.message); });

    // manager.authorize('google').then(resp => { 
    //     console.log('loginGoogle...');
    //     console.log(resp); 
    //     const credential = firebase.auth.GoogleAuthProvider.credential(resp.response.credentials.accessToken);
    //     firebase.auth().signInWithCredential(credential)
    //         .then((response) => {
    //             console.log('firebase auth success');
    //             console.log(response);
    //             loginUserSuccess(dispatch, response);
    //         }).catch((error) => {
    //             loginUserFail(dispatch, error.message);
    //         });      
    // }).catch(err => {
    //     console.log(err);
    //     loginUserFail(dispatch, err.message);
    // });  
};

const loginTwitter = (dispatch, manager) => {
    //loginUserFail(dispatch, 'Login method not yet implemented.');
    console.log('twitter signing in');
    manager.authorize('twitter').then(resp => { 
        console.log(resp); 
        const credential = firebase.auth.TwitterAuthProvider.credential(resp.response.credentials.accessToken);
        firebase.auth().signInWithCredential(credential)
            .then((response) => {
                console.log('firebase auth success');
                console.log(response);
                loginUserSuccess(dispatch, response);
            }).catch((error) => {
                loginUserFail(dispatch, error.message);
            });      
    }).catch(err => {
        console.log(err);
        loginUserFail(dispatch, err.message);
    });
};

const loginUserFail = (dispatch, err) => {
    dispatch({ type: LOGIN_USER_FAIL, payload: err });
};

const loginUserSuccess = (dispatch, resp) => {
    const user = { uid: resp.uid, email: resp.email, user_name: resp.displayName, profile_pic: resp.photoURL };
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    Actions.reset('main');    
};

/* #endregion */

const clearAsyncStorage = async() => {
    AsyncStorage.clear();
};

export const logoutUser = (persistor) => {
    return (dispatch) => {
        console.log('logout user now...');        
        //dispatch({ type: LOGOUT_USER });
        persistor.purge().then(() => {
            console.log('success purged!');
            clearAsyncStorage();
            
            //dispatch({ type: LOGOUT_USER_SUCCESS });            
        });
        Actions.reset('auth');
    };    
};