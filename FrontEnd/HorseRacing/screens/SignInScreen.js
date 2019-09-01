import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image
} from 'react-native';
import Expo from 'expo';
import { Button, Icon, Input, ThemeProvider } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class SignInScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <ThemeProvider
                theme={{
                    Input: {
                        containerStyle: {
                            width: SCREEN_WIDTH - 50
                        },
                        inputContainerStyle: {
                            borderRadius: 40,
                            borderWidth: 1,
                            borderColor: 'rgba(110, 120, 170, 1)',
                            height: 50,
                            marginVertical: 10,
                        },
                        placeholderTextColor: 'rgba(110, 120, 170, 1)',
                        inputStyle: {
                            marginLeft: 10,
                            color: 'white',
                        },
                        keyboardAppearance: 'light',
                        blurOnSubmit: false,
                    },
                }}
            >
                <View
                    style={{
                        backgroundColor: 'rgba(46, 50, 72, 1)',
                        width: SCREEN_WIDTH,
                        height: SCREEN_HEIGHT,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: 30,
                    }}
                >
                    <Image
                        style={{ width: SCREEN_WIDTH - 80, height: 300, resizeMode: "contain" }}
                        source={require('../assets/images/logo.png')}
                    />
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 30,
                            marginVertical: 10,
                            fontWeight: '300',
                            marginBottom: 30
                        }}
                    >
                        Let the Bet Begin...
              </Text>
                    <Input
                        leftIcon={
                            <Icon
                                name="email-outline"
                                type="material-community"
                                color="rgba(110, 120, 170, 1)"
                                size={25}
                            />
                        }
                        placeholder="Address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        returnKeyType="next"
                    />
                    <Input
                        leftIcon={
                            <Icon
                                name="lock"
                                type="simple-line-icon"
                                color="rgba(110, 120, 170, 1)"
                                size={25}
                            />
                        }
                        placeholder="Password"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType="next"
                    />
                    <Button style={styles.signInButtonStyle} title="Sign in!" onPress={this._signInAsync} />
                    <Button style={styles.loginButtonStyle} title="Login via HKJC" onPress={this._signInAsync} />
                    <Button style={styles.signUpButtonStyle} title="Sign up!" onPress={this._signInAsync} />
                </View>
            </ThemeProvider>
        );
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        await AsyncStorage.setItem('wallet', '0x6F09CFA86942138875c11f0C865145F6e31a898f');
        await AsyncStorage.setItem('key', '2FA3C6CB575CD1D06D03040ED3FF0DB452DCDAC1460DFFDFB8B7C016D803B50C');
        this.props.navigation.navigate('App');
    };

    /*
    https://medium.com/coinmonks/minimum-viable-ethereum-mobile-wallet-part-3-account-private-key-1f8fa3d20f3
    
  _handleSubmit = async (values, bag) => {
    var x = global.web3.eth.accounts.create(web3.utils.randomHex(32));
    await Expo.SecureStore.setItemAsync('key', x.privateKey.substring(2));
    await Expo.SecureStore.setItemAsync('wallet', x.address);
    this.setState({address: x.address});
    this.setState({key: x.privateKey.substring(2)});
    console.log("myaddress:" + x.address);
    console.log("mykey:" + x.privateKey.substring(2));
  };

    */
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signInButtonStyle: {
        marginTop: 20,
        width: SCREEN_WIDTH - 70,
        marginBottom: 20
    },
    signUpButtonStyle: {
        width: SCREEN_WIDTH - 70
    },
    loginButtonStyle: {
        width: SCREEN_WIDTH - 70,
        marginBottom: 20
    }
});

export default SignInScreen;