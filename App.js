import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Navigation } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import reducer from './reducers/index';

//Setup app redux store from reducers/index
const store = createStore(reducer);

export default class App extends Component {
  state = {
    isLoadingComplete: false,
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _loadResourcesAsync = async () => Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'cinzel': require('./assets/fonts/Cinzel-Regular.ttf'),
        'lato-bold': require('./assets/fonts/Lato-Bold.ttf'),
        'lato-light': require('./assets/fonts/Lato-Light.ttf'),
        'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
        'lato-black': require('./assets/fonts/Lato-Black.ttf'),
      }),
    ]);

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
      return (
        <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
        </Provider>
      );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
