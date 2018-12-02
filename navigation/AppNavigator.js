import React from 'react';
import { Platform } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import ModalNavigator from './ModalNavigator';

export default createStackNavigator(
	{
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
		Main: MainTabNavigator,
		Modal: ModalNavigator,
	},
	{
		initialRouteName: 'Main',
		headerMode: 'none',
		mode: 'modal',
  }
);
