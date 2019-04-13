import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';
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
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 30,
                            marginVertical: 10,
                            fontWeight: '300',
                        }}
                    >
                        Login
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
                        placeholder="Email"
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
                    <Button title="Sign in!" onPress={this._signInAsync} />
                </View>
            </ThemeProvider>
        );
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SignInScreen;