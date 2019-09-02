import React, { Component } from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  NavigationActions,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import store from './src/redux';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

const AppStack = createStackNavigator(
  { Home: HomeScreen },
  { initialRouteName: 'Home', defaultNavigationOptions: { header: null } }
);

const RootSwitch = createSwitchNavigator(
  {
    Login: LoginScreen,
    App: AppStack,
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      header: null,
    },
  }
);

const Navigation = createAppContainer(RootSwitch);

// additional nav things Mark may have added already
let navigator;
const setNavigator = nav => {
  navigator = nav;
};

export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation ref={navigator => setNavigator(navigator)} />
      </Provider>
    );
  }
}

export default App;
